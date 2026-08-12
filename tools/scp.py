import os
import re
import sys
import argparse

#
#    [ TD2 SCENERY PROCESSOR ]
#    by masuo
#    v1.9
#

BAD_WORDS = ['Fence', 'TerrainPoint', 'Wires']
MISC_REGEX = r'^(?:MiscGroup.*|Misc;[^;]*;(?:SignalBox|wgt_peron|peron|platform).*)$'

def should_exclude(line: str) -> bool:
    for word in BAD_WORDS:
        if line.startswith(word):
            return True
    if line.startswith("Misc"):
        if not re.match(MISC_REGEX, line):
            return True
    return False

def filter_lines(lines):
    output = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        if line.startswith("MiscGroup"):
            group_start = line
            i += 1
            content_kept = []
            has_content = False
            while i < n:
                current = lines[i]
                if current.strip() == "EndMiscGroup":
                    end_line = current
                    i += 1
                    break
                if not should_exclude(current):
                    content_kept.append(current)
                    has_content = True
                i += 1
            else:
                # EndMiscGroup not found, output start and any kept lines
                if has_content:
                    output.append(group_start)
                    output.extend(content_kept)
                continue
            if has_content:
                output.append(group_start)
                output.extend(content_kept)
                output.append(end_line)
        else:
            if not should_exclude(line):
                output.append(line)
            i += 1
    return output

def process_file(file_path: str, output_dir=None, allow_reprocess=False):
    if not file_path.endswith(".sc"):
        print(f"Skipping non-.sc file: {file_path}")
        return

    if file_path.endswith(".lite.sc") and not allow_reprocess:
        print(f"Skipping already processed file: {file_path}")
        return

    base = os.path.basename(file_path)
    if output_dir:
        if file_path.endswith(".lite.sc") and allow_reprocess:
            out_name = base
        else:
            out_name = base[:-3] + ".lite.sc" if base.endswith(".sc") else base + ".lite.sc"
        output_path = os.path.join(output_dir, out_name)
    else:
        if file_path.endswith(".lite.sc") and allow_reprocess:
            output_path = file_path
        else:
            output_path = file_path[:-3] + ".lite.sc"

    print(f"Processing file: {file_path} -> {output_path}")

    try:
        with open(file_path, encoding="utf8") as infile:
            lines = infile.readlines()
        filtered = filter_lines(lines)
        with open(output_path, 'w', encoding="utf8") as outfile:
            outfile.writelines(filtered)
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def process_directory(directory: str, allow_reprocess=False):
    print(f"Processing directory: {directory}")
    for entry in os.listdir(directory):
        full_path = os.path.join(directory, entry)
        if os.path.isfile(full_path):
            process_file(full_path, allow_reprocess=allow_reprocess)

def main():
    parser = argparse.ArgumentParser(description="TD2 SCENERY PROCESSOR")
    parser.add_argument('input', help='Input directory')
    parser.add_argument('output', help='Output directory')
    parser.add_argument('-f', '--force', action='store_true',
                        help='Force overwrite without confirmation if output directory is not empty')
    parser.add_argument('--allow-reprocess', action='store_true',
                        help='Allow reprocessing .lite.sc files without adding extra .lite')
    args = parser.parse_args()

    if args.input and args.output:
        if not os.path.isdir(args.input):
            print(f"Input directory does not exist: {args.input}")
            sys.exit(1)
        output_dir = args.output
        if os.path.isdir(output_dir) and os.listdir(output_dir):
            if not args.force:
                resp = input(f"Output directory '{output_dir}' is not empty. Overwrite? (y/N): ").strip().lower()
                if resp != 'y':
                    print("Aborted.")
                    sys.exit(0)
        os.makedirs(output_dir, exist_ok=True)
        for entry in os.listdir(args.input):
            full_path = os.path.join(args.input, entry)
            if os.path.isfile(full_path):
                process_file(full_path, output_dir=output_dir, allow_reprocess=args.allow_reprocess)
        print("Done!")
    elif args.paths:
        for path in args.paths:
            if os.path.isdir(path):
                process_directory(path, allow_reprocess=args.allow_reprocess)
            elif os.path.isfile(path):
                process_file(path, allow_reprocess=args.allow_reprocess)
            else:
                print(f"Invalid path: {path}")
        print("Done!")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
