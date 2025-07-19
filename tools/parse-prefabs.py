#!/usr/bin/env -S uv run --script
#
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "pyyaml",
#     "scipy",
# ]
# ///

import json
import os
import re
import sys
import traceback
from scipy.spatial.transform import Rotation
from pathlib import Path

import yaml
#
#    [ TD2 TRACK STRUCTURE PREFAB PARSER ]
#    by dkgl
#    v1.0
#
#   The assets are exported using https://github.com/AssetRipper/AssetRipper in the "Export Unity Project" mode.
#   Pass the path to the "(...)/ExportedProject/Assets/Resources/track structures" directory as a command line argument to this script.
#
#   This script uses stdout for the output and stderr for log and error messages.
#

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


prefab_header_pattern = re.compile(r"^--- !u!(\d+) &(\d+)$")


def parse_prefab(file):
    component_list = []
    component_map = {}
    current_yaml = ""
    component_type = None
    component_id = None

    for line in file:
        match = prefab_header_pattern.match(line)
        if match:
            if component_type is not None:
                component = parse_prefab_component(current_yaml, component_type, component_id)
                if component is not None:
                    component_list.append(component)
                    component_map[component_id] = component
            current_yaml = ""
            component_type = match.group(1)
            component_id = match.group(2)
        else:
            current_yaml += line

    if component_type is not None:
        component = parse_prefab_component(current_yaml, component_type, component_id)
        if component is not None:
            component_list.append(component)
            component_map[component_id] = component

    for component in component_list:
        if not isinstance(component, dict):
            continue
        for value in component.values():
            if "m_GameObject" not in value:
                continue
            component_map[str(value["m_GameObject"]["fileID"])]["__children"].append(component)

    visited_ids = set()
    for component in component_list:
        resolve_references(component, component_map, visited_ids)

    return component_list[0]


def try_parse_switch_component(prefab):
    if "component" not in prefab:
        return None
    component = prefab["component"]
    if "MonoBehaviour" not in component:
        return None
    mono = component["MonoBehaviour"]
    if "tracks" not in mono or "namedSwitch" not in mono:
        return None
    return mono


def try_parse_track_shape(component):
    if "MonoBehaviour" not in component:
        return None
    mono = component["MonoBehaviour"]
    if "slope1" not in mono:
        return None
    return {
        "radius": mono["radius"],
        "length": mono["length"],
        "rz1": mono["rz1"],
        "rz2": mono["rz2"],
        "slope1": mono["slope1"],
        "slope2": mono["slope2"],
    }


def mirror_rotation_x(rotation):
    rot_vet = rotation.as_rotvec()
    # Flip the x-axis to apply the mirroring and then negate the whole vector to change the rotation direction
    return Rotation.from_rotvec([rot_vet[0], -rot_vet[1], -rot_vet[2]])


def try_parse_track_transform(component):
    if "Transform" not in component:
        return None
    transform = component["Transform"]
    if "Transform" in transform["m_Father"]:
        parent = try_parse_track_transform(transform["m_Father"])
    else:
        parent = {
            "position": [0, 0, 0],
            "rotation": Rotation.identity(),
            "mirror_x": False,
            "negate_radius": False,
        }

    if transform["m_LocalScale"]["x"] not in {-1, 1} or transform["m_LocalScale"]["y"] != 1 or transform["m_LocalScale"]["z"] != 1:
        eprint("Unexpected scale in track transform")

    position = [transform["m_LocalPosition"][key] for key in ["x", "y", "z"]]
    rotation = Rotation.from_quat([transform["m_LocalRotation"][key] for key in ["x", "y", "z", "w"]])
    mirror_x = transform["m_LocalScale"]["x"] == -1
    negate_radius = mirror_x

    # Apply own scaleX transform to rotation, then the parent's
    if mirror_x ^ parent["mirror_x"]:
        rotation = mirror_rotation_x(rotation)

    # Apply remaining parent transforms
    if parent["mirror_x"]:
        position[0] = -position[0]
    position = parent["position"] + parent["rotation"].apply(position)
    rotation = parent["rotation"] * rotation
    if parent["negate_radius"]:
        negate_radius = not negate_radius

    return {
        "position": position,
        "rotation": rotation,
        "mirror_x": mirror_x,
        "negate_radius": negate_radius,
    }


def parse_track(track, data_index):
    track_id = track["__component_id"]
    track_shape = None
    track_transform = None

    game_object = track["MonoBehaviour"]["m_GameObject"]["GameObject"]

    for child in game_object["m_Component"]:
        if "component" not in child:
            continue
        child = child["component"]
        maybe_track_shape = try_parse_track_shape(child)
        if maybe_track_shape is not None:
            track_shape = maybe_track_shape
        maybe_track_transform = try_parse_track_transform(child)
        if maybe_track_transform is not None:
            track_transform = maybe_track_transform

    connections = []

    def append_connection(end, field):
        if "__component_id" in track["MonoBehaviour"][field]:
            other_id = track["MonoBehaviour"][field]["__component_id"]
            if other_id == track_id:
                # Ignore connections to self, TD2 has them in Rkp switches
                return
            connections.append({
                "type": "<INTERNAL>",
                "end": end,
                "internalId": other_id
            })
        else:
            connections.append({
                "type": "<EXTERNAL>",
                "end": end,
            })

    append_connection("<START>", "prevTrack")
    append_connection("<END>", "nextTrack")

    if track_transform["negate_radius"]:
        track_shape["radius"] = -track_shape["radius"]

    return (track_id, {
        "dataIndex": data_index,
        **track_shape,
        "pos": f"<new Vector3({", ".join([str(x) for x in track_transform["position"].tolist()])})>",
        "rot": f"<new Quaternion({", ".join([str(x) for x in track_transform["rotation"].as_quat().tolist()])})>",
        "connections": connections,
    })


def find_tracks(prefab):
    tracks = []
    for component in prefab["GameObject"]["m_Component"]:
        switch = try_parse_switch_component(component)
        if switch is None:
            continue
        for data_index, track in enumerate(switch["tracks"]):
            tracks.append(parse_track(track, data_index))
    add_missing_connections(tracks)
    tracks = change_ids(tracks)
    return tracks

def add_missing_connections(tracks):
    track_map = dict(tracks)
    for (track_id, track) in tracks:
        for connection in track["connections"]:
            if connection["type"] == "<EXTERNAL>":
                continue
            other_track = track_map.get(connection["internalId"], None)
            if other_track is None:
                eprint(f"Warning: Track {track_id} has a connection to an unknown track {connection['internalId']}")
                continue
            reverse_connections = [conn for conn in other_track["connections"] if conn["type"] == "<INTERNAL>" and conn["internalId"] == track_id]
            if len(reverse_connections) > 1:
                eprint(f"Warning: Track {other_track['id']} has multiple connections to {track_id}")
            if len(reverse_connections) == 0:
                other_track["connections"].append({
                    "type": "<INTERNAL>",
                    "end": "<START>" if connection["end"] == "<END>" else "<END>", # Heuristic
                    "internalId": track_id
                })
    return tracks

def change_ids(tracks):
    new_id_map = dict()
    new_tracks = []
    for (track_id, track) in tracks:
        new_id = f"I{track["dataIndex"]}"
        new_id_map[track_id] = new_id
        new_tracks.append((new_id, track))
    for (new_id, track) in new_tracks:
        for connection in track["connections"]:
            if connection["type"] == "<INTERNAL>":
                connection["internalId"] = new_id_map[connection["internalId"]]
    return new_tracks

def parse_prefab_component(component_yaml, component_type, component_id):
    loaded = yaml.load(component_yaml, yaml.SafeLoader)
    loaded["__component_id"] = component_id
    loaded["__component_type"] = component_type
    loaded["__children"] = []
    return loaded


def resolve_references(value, component_map, visited_ids):
    if id(value) in visited_ids:
        return
    visited_ids.add(id(value))
    if isinstance(value, dict):
        keys = value.keys()
    elif isinstance(value, list):
        keys = range(len(value))
    else:
        return
    for key in keys:
        if isinstance(value[key], dict) and "fileID" in value[key]:
            file_id = str(value[key]["fileID"])
            if file_id in component_map:
                component = component_map[file_id]
                value[key] = component

        resolve_references(value[key], component_map, visited_ids)

def format_prefab(prefab_name, tracks):
    print(f"'{prefab_name}': {{")
    print('    tracks: {')
    for (track_id, track) in tracks:
        track_object = json.dumps(track)
        # Replace "<FOO>" with FOO
        track_object = re.sub(r'(?<!\\)"<([^<>"]+)>"', r'\1', track_object)
        # Remove quotes around keys
        track_object = re.sub(r'(?<!\\)"([a-zA-Z][a-zA-Z0-9]*)":', r'\1:', track_object)
        print(f"        '{track_id}': {track_object},")
    print("    },")
    print("},")


def process_file(file_path):
    if file_path.endswith(".prefab.meta"):
        return

    if not file_path.endswith(".prefab"):
        eprint(f"Skipping non-.prefab file: {file_path}", file=sys.stderr)
        return

    eprint(f"Processing file: {file_path}")
    try:
        with open(file_path, encoding="utf8") as infile:
            prefab = parse_prefab(infile)
            tracks = find_tracks(prefab)
            format_prefab(Path(file_path).stem, tracks)
    except Exception:
        eprint(f"Error processing {file_path}:", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)


def process_directory(directory: str):
    eprint(f"Processing directory: {directory}")
    for entry in sorted(os.listdir(directory)):
        full_path = os.path.join(directory, entry)
        if os.path.isfile(full_path):
            process_file(full_path)


def main():
    if len(sys.argv) < 2:
        eprint("Usage: python prase-prefabs.py <file_or_directory> [<file_or_directory> ...]")
        return

    for path in sys.argv[1:]:
        if os.path.isdir(path):
            process_directory(path)
        elif os.path.isfile(path):
            process_file(path)
        else:
            eprint(f"Invalid path: {path}")

    eprint("Done!")


if __name__ == "__main__":
    main()
