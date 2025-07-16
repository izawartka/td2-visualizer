import json
import os
import re
import sys
import traceback
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


def try_parse_track_transform(component):
    if "Transform" not in component:
        return None
    transform = component["Transform"]
    return {
        "position": transform["m_LocalPosition"],
        "rotation": transform["m_LocalRotation"],
    }


def parse_track(track):
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

    prev_id = None
    next_id = None
    if "__component_id" in track["MonoBehaviour"]["prevTrack"]:
        prev_id = track["MonoBehaviour"]["prevTrack"]["__component_id"]
    if "__component_id" in track["MonoBehaviour"]["nextTrack"]:
        next_id = track["MonoBehaviour"]["nextTrack"]["__component_id"]

    return {
        "id": track["__component_id"],
        "prev_id": prev_id,
        "next_id": next_id,
        "shape": track_shape,
        "transform": track_transform,
    }


def find_tracks(prefab):
    tracks = []
    for component in prefab["GameObject"]["m_Component"]:
        switch = try_parse_switch_component(component)
        if switch is None:
            continue
        for track in switch["tracks"]:
            tracks.append(parse_track(track))
    return tracks


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


def format_tracks(prefab_name, tracks):
    print(f"{prefab_name}: [")
    for track in tracks:
        print(f"    {json.dumps(track)},")
    print("],")


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
            format_tracks(Path(file_path).stem, tracks)
    except Exception:
        eprint(f"Error processing {file_path}:", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)


def process_directory(directory: str):
    eprint(f"Processing directory: {directory}")
    for entry in os.listdir(directory):
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
