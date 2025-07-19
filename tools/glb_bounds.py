import argparse
import os
import json
import logging
from tqdm import tqdm
import trimesh

def parse_args():
    parser = argparse.ArgumentParser(
        description="Extract bounding boxes from GLB mesh files and output JSON summary."
    )
    parser.add_argument(
        'input',
        help='Input file or directory containing .glb files'
    )
    parser.add_argument(
        'output',
        help='Output JSON file path'
    )
    parser.add_argument(
        '--decimal_places', '-d',
        type=int,
        default=3,
        help='Number of decimal places for output coordinates (default: 3)'
    )
    parser.add_argument(
        '--no_aliases', '-a',
        action='store_false',
        help='Disable aliases in the output JSON (default: false)'
    )
    return parser.parse_args()

def round_floats(obj, prec=3):
    if isinstance(obj, float):
        return round(obj, prec)
    elif isinstance(obj, dict):
        return {k: round_floats(v, prec) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [round_floats(v, prec) for v in obj]
    else:
        return obj

def collect_glb_files(path):
    """
    Given a path, return a list of .glb files.
    If path is a directory, walk it; if file, return single-element list.
    """
    glb_files = []
    if os.path.isdir(path):
        for root, _, files in os.walk(path):
            for name in files:
                if name.lower().endswith('.glb'):
                    glb_files.append(os.path.join(root, name))
    elif os.path.isfile(path) and path.lower().endswith('.glb'):
        glb_files = [path]
    else:
        logging.error(f"Input path '{path}' is neither a .glb file nor a directory containing them.")
    return glb_files

def process_file(filepath):
    """
    Load a GLB file, compute its center and size, return a dict entry.
    Returns None if fails.
    """
    try:
        mesh = trimesh.load(filepath, force='mesh')
        if mesh.is_empty:
            logging.warning(f"Mesh in '{filepath}' is empty, skipping.")
            return None
    except Exception as e:
        logging.warning(f"Failed to load '{filepath}' as a mesh: {e}")
        return None

    # Compute axis-aligned bounding box
    bounds = mesh.bounds  # shape (2,3): [min, max]
    min_pt, max_pt = bounds
    center = (min_pt + max_pt) / 2.0
    size = max_pt - min_pt

    # y is the top axis by convention
    entry = {
        'center': {
            'x': float(center[0]),
            'y': float(center[1]),
            'z': float(center[2]),
        },
        'size': {
            'x': float(size[0]),
            'y': float(size[1]),
            'z': float(size[2]),
        }
    }
    return entry

def items_equal(item1, item2):
    if isinstance(item1, dict) and isinstance(item2, dict):
        if item1.keys() != item2.keys():
            return False
        return all(items_equal(item1[k], item2[k]) for k in item1)
    elif isinstance(item1, list) and isinstance(item2, list):
        if len(item1) != len(item2):
            return False
        return all(items_equal(i1, i2) for i1, i2 in zip(item1, item2))
    elif isinstance(item1, (int, float)) and isinstance(item2, (int, float)):
        return round(item1, 6) == round(item2, 6)
    else:
        return item1 == item2

def find_apply_aliases(results):
    logging.info("Applying aliases...")
    final_results = {}

    for name, entry in results.items():
        if not entry:
            continue

        found_alias = False
        for existing_name, existing_entry in final_results.items():
            if 'alias' in existing_entry:
                continue

            if not items_equal(entry, existing_entry):
                continue

            final_results[name] = {
                'alias': existing_name
            }
            found_alias = True
            break

        if not found_alias:
            final_results[name] = entry

    return final_results

def main():
    logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
    args = parse_args()

    glb_files = collect_glb_files(args.input)
    if not glb_files:
        logging.error("No .glb files found to process.")
        return

    results = {}
    for filepath in tqdm(glb_files, desc="Processing GLB files"):
        entry = process_file(filepath)
        if entry:
            prefab_name = os.path.splitext(os.path.basename(filepath))[0]
            results[prefab_name] = entry

    # Write output JSON
    try:
        with open(args.output, 'w') as f:
            results_final = find_apply_aliases(results) if args.no_aliases else results
            json.dump(round_floats(results_final, args.decimal_places), f, indent=4)
        logging.info(f"Successfully wrote {len(results)} entries to '{args.output}'")
    except Exception as e:
        logging.error(f"Failed to write output JSON: {e}")

if __name__ == '__main__':
    main()
