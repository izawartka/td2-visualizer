import os
import argparse
import json
import sys
import locale

#
#    [ TD2 SCENERIES JSON LIST GENERATOR ]
#    by masuo
#    v1.1
#

def parse_args():
    parser = argparse.ArgumentParser(description="List and save .lite.sc files from a directory")
    parser.add_argument(
        "directory",
        help="Path to the directory to scan for .sc files"
    )
    parser.add_argument(
        "--output-file", "-o",
        required=True,
        help="Path to save the resulting JSON file"
    )
    parser.add_argument(
        "--save-version", "-v",
        help="Version string to include in the JSON info"
    )
    parser.add_argument(
        "--save-version-date", "-d",
        help="Version date to include in the JSON info"
    )
    return parser.parse_args()

def list_lite_sc_files(directory):
    locale.setlocale(locale.LC_COLLATE, '')
    try:
        entries = [f for f in os.listdir(directory) if f.endswith('.lite.sc')]
    except OSError as e:
        print(f"Error reading directory: {e}")
        sys.exit(1)
    return sorted(entries, key=locale.strxfrm)

def write_output(path, data):
    try:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Successfully wrote {len(data['list'])} entries to '{path}'")
    except Exception as e:
        print(f"Error writing to output file: {e}")
        sys.exit(1)

def main():
    args = parse_args()
    version = args.save_version or input("Enter version: ")
    version_date = args.save_version_date or input("Enter version date (YYYY-MM-DD): ")
    directory = args.directory
    if not os.path.isdir(directory):
        print(f"Error: '{directory}' is not a valid directory.")
        sys.exit(1)

    files = list_lite_sc_files(directory)
    for fname in list_lite_sc_files(directory):
        full_path = os.path.join(directory, fname)
        if not os.path.isfile(full_path):
            print(f"Warning: Skipping '{fname}' (not a file)")
            continue
    output = {
        "info": {
            "version": version,
            "versionDate": version_date
        },
        "list": files
    }
    write_output(args.output_file, output)

if __name__ == '__main__':
    main()
