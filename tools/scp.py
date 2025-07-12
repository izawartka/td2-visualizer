import os
import sys

#
#    [ TD2 SCENERY PROCESSOR ]
#    by masuo
#    v1.4
#

BAD_WORDS = ['EndMiscGroup', 'Fence', 'TerrainPoint', 'Wires']

def should_exclude(line: str) -> bool:
    for word in BAD_WORDS:
        if line.startswith(word):
            return True

    if line.startswith("Misc"):
        values = line.split(';')
        return not values[2].startswith("SignalBox")

    return False

def process_file(file_path: str):
    if not file_path.endswith(".sc"):
        print(f"Skipping non-.sc file: {file_path}")
        return

    if file_path.endswith(".lite.sc"):
        print(f"Skipping already processed file: {file_path}")
        return

    output_path = file_path[:-3] + ".lite.sc"
    print(f"Processing file: {file_path} -> {output_path}")

    try:
        with open(file_path, encoding="utf8") as infile, open(output_path, 'w', encoding="utf8") as outfile:
            for line in infile:
                if not should_exclude(line):
                    outfile.write(line)
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
        print("Usage: python scp.py <file_or_directory> [<file_or_directory> ...]")
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
