import json
import os
import re
import sys
from pathlib import Path

import yaml
#
#    [ TD2 TRACK STRUCTURE PREFAB PARSER ]
#    by dkgl
#    v1.0
#

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

    visited_ids = set()
    resolve_references(component_list[0], component_map, visited_ids)

    return component_list[0]


def find_tracks(prefab):
    # print(prefab)
    pass


def parse_prefab_component(component_yaml, component_type, component_id):
    loaded = yaml.load(component_yaml, yaml.SafeLoader)
    loaded["__component_id"] = component_id
    loaded["__component_type"] = component_type
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
                # Prevent circular references
                if id(component) not in visited_ids:
                    value[key] = component_map[file_id]

        resolve_references(value[key], component_map, visited_ids)


def process_file(file_path):
    if file_path.endswith(".prefab.meta"):
        return

    if not file_path.endswith(".prefab"):
        print(f"Skipping non-.prefab file: {file_path}")
        return

    file_path = Path(file_path)
    output_path = file_path.with_suffix(".json")


    print(f"Processing file: {file_path} -> {output_path}")

    try:
        with open(file_path, encoding="utf8") as infile, open(output_path, 'w', encoding="utf8") as outfile:
            prefab = parse_prefab(infile)
            # print(find_tracks(prefab))
            json.dump(prefab, outfile, indent=4, ensure_ascii=False)
    except Exception as e:
        print(f"Error processing {file_path}: {e}")


def process_directory(directory: str):
    print(f"Processing directory: {directory}")
    for entry in os.listdir(directory):
        full_path = os.path.join(directory, entry)
        if os.path.isfile(full_path):
            process_file(full_path)


def main():
    if len(sys.argv) < 2:
        print("Usage: python prase-prefabs.py <file_or_directory> [<file_or_directory> ...]")
        return

    for path in sys.argv[1:]:
        if os.path.isdir(path):
            process_directory(path)
        elif os.path.isfile(path):
            process_file(path)
        else:
            print(f"Invalid path: {path}")

    print("Done!")


if __name__ == "__main__":
    main()
