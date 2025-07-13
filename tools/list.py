import os
import argparse
import json
import sys

#
#    [ TD2 SCENERIES JSON LIST GENERATOR ]
#    by masuo
#    v1.0
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

def main():
    args = parse_args()

    # Prompt for version if not provided
    version = args.save_version or input("Enter version: ")
    version_date = args.save_version_date or input("Enter version date (YYYY-MM-DD): ")

    directory = args.directory
    if not os.path.isdir(directory):
        print(f"Error: '{directory}' is not a valid directory.")
        sys.exit(1)

    collected = []

    for fname in sorted(os.listdir(directory)):
        full_path = os.path.join(directory, fname)
        if not os.path.isfile(full_path):
            print(f"Warning: Skipping '{fname}' (not a file)")
            continue

        if not fname.endswith('.sc'):
            print(f"Warning: Skipping '{fname}' (does not end with .sc)")
            continue

        if not fname.endswith('.lite.sc'):
            print(f"Warning: '{fname}' ends with .sc but not .lite.sc, skipping")
            continue

        collected.append(fname)

    output = {
        "info": {
            "version": version,
            "versionDate": version_date
        },
        "list": collected
    }

    try:
        with open(args.output_file, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=4)
        print(f"Successfully wrote {len(collected)} entries to '{args.output_file}'")
    except Exception as e:
        print(f"Error writing to output file: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
