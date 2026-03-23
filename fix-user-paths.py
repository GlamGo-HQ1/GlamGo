from __future__ import annotations

import argparse
from pathlib import Path


TEXT_EXTENSIONS = {
    ".md",
    ".json",
    ".txt",
    ".yaml",
    ".yml",
    ".toml",
    ".ini",
    ".cfg",
}


REPLACEMENTS = [
    # file:/// URI paths (space encoded)
    ("file:///C:/Users/Oviks/.gemini/antigravity/", "file:///C:/Users/Swift%20America/.gemini/antigravity/"),
    ("file:///c:/Users/Oviks/.gemini/antigravity/", "file:///c:/Users/Swift%20America/.gemini/antigravity/"),
    ("file:///C:/Users/OVIKS/.gemini/antigravity/", "file:///C:/Users/Swift%20America/.gemini/antigravity/"),
    ("file:///c:/Users/OVIKS/.gemini/antigravity/", "file:///c:/Users/Swift%20America/.gemini/antigravity/"),
    ("file:///C:/Users/Oviks/antigravitygold/", "file:///C:/Users/Swift%20America/.gemini/antigravity/"),
    ("file:///c:/Users/Oviks/antigravitygold/", "file:///c:/Users/Swift%20America/.gemini/antigravity/"),
    ("file:///C:/Users/OVIKS/antigravitygold/", "file:///C:/Users/Swift%20America/.gemini/antigravity/"),
    ("file:///c:/Users/OVIKS/antigravitygold/", "file:///c:/Users/Swift%20America/.gemini/antigravity/"),

    # plain slash paths
    ("C:/Users/Oviks/.gemini/antigravity/", "C:/Users/Swift America/.gemini/antigravity/"),
    ("c:/Users/Oviks/.gemini/antigravity/", "c:/Users/Swift America/.gemini/antigravity/"),
    ("C:/Users/OVIKS/.gemini/antigravity/", "C:/Users/Swift America/.gemini/antigravity/"),
    ("c:/Users/OVIKS/.gemini/antigravity/", "c:/Users/Swift America/.gemini/antigravity/"),
    ("C:/Users/Oviks/antigravitygold/", "C:/Users/Swift America/.gemini/antigravity/"),
    ("c:/Users/Oviks/antigravitygold/", "c:/Users/Swift America/.gemini/antigravity/"),
    ("C:/Users/OVIKS/antigravitygold/", "C:/Users/Swift America/.gemini/antigravity/"),
    ("c:/Users/OVIKS/antigravitygold/", "c:/Users/Swift America/.gemini/antigravity/"),

    # plain backslash paths
    ("C:\\Users\\Oviks\\.gemini\\antigravity\\", "C:\\Users\\Swift America\\.gemini\\antigravity\\"),
    ("c:\\Users\\Oviks\\.gemini\\antigravity\\", "c:\\Users\\Swift America\\.gemini\\antigravity\\"),
    ("C:\\Users\\OVIKS\\.gemini\\antigravity\\", "C:\\Users\\Swift America\\.gemini\\antigravity\\"),
    ("c:\\Users\\OVIKS\\.gemini\\antigravity\\", "c:\\Users\\Swift America\\.gemini\\antigravity\\"),
    ("C:\\Users\\Oviks\\antigravitygold\\", "C:\\Users\\Swift America\\.gemini\\antigravity\\"),
    ("c:\\Users\\Oviks\\antigravitygold\\", "c:\\Users\\Swift America\\.gemini\\antigravity\\"),
    ("C:\\Users\\OVIKS\\antigravitygold\\", "C:\\Users\\Swift America\\.gemini\\antigravity\\"),
    ("c:\\Users\\OVIKS\\antigravitygold\\", "c:\\Users\\Swift America\\.gemini\\antigravity\\"),

    # broad username replacements (catch all remaining references)
    ("C:/Users/Oviks/", "C:/Users/Swift America/"),
    ("c:/Users/Oviks/", "c:/Users/Swift America/"),
    ("C:/Users/OVIKS/", "C:/Users/Swift America/"),
    ("c:/Users/OVIKS/", "c:/Users/Swift America/"),
    ("C:/Users/OVX/", "C:/Users/Swift America/"),
    ("c:/Users/OVX/", "c:/Users/Swift America/"),
    ("C:\\Users\\Oviks\\", "C:\\Users\\Swift America\\"),
    ("c:\\Users\\Oviks\\", "c:\\Users\\Swift America\\"),
    ("C:\\Users\\OVIKS\\", "C:\\Users\\Swift America\\"),
    ("c:\\Users\\OVIKS\\", "c:\\Users\\Swift America\\"),
    ("C:\\Users\\OVX\\", "C:\\Users\\Swift America\\"),
    ("c:\\Users\\OVX\\", "c:\\Users\\Swift America\\"),
    ("/Users/Oviks/", "/Users/Swift America/"),
    ("/Users/OVIKS/", "/Users/Swift America/"),
    ("/Users/OVX/", "/Users/Swift America/"),
]


def process_file(path: Path, apply: bool) -> tuple[bool, int]:
    try:
        original = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return False, 0

    updated = original
    replacements_applied = 0
    for old, new in REPLACEMENTS:
        count = updated.count(old)
        if count:
            updated = updated.replace(old, new)
            replacements_applied += count

    if replacements_applied == 0:
        return False, 0

    if apply:
        path.write_text(updated, encoding="utf-8")

    return True, replacements_applied


def iter_files(root: Path):
    for p in root.rglob("*"):
        if p.is_file() and p.suffix.lower() in TEXT_EXTENSIONS:
            yield p


def main() -> int:
    parser = argparse.ArgumentParser(description="Replace legacy user path references.")
    parser.add_argument(
        "--root",
        action="append",
        dest="roots",
        help="Root folder to scan (can be passed multiple times).",
    )
    parser.add_argument("--apply", action="store_true", help="Write changes to files.")
    args = parser.parse_args()

    roots = args.roots or [
        r"C:\Users\Swift America\.gemini\antigravity",
        r"C:\Users\Swift America\.config\opencode",
    ]

    total_files = 0
    changed_files = 0
    total_replacements = 0

    for root_str in roots:
        root = Path(root_str)
        if not root.exists():
            print(f"[skip] missing root: {root}")
            continue

        for file_path in iter_files(root):
            total_files += 1
            changed, count = process_file(file_path, args.apply)
            if changed:
                changed_files += 1
                total_replacements += count
                mode = "updated" if args.apply else "would update"
                print(f"[{mode}] {file_path} ({count} replacements)")

    action = "Applied" if args.apply else "Dry-run found"
    print(
        f"\n{action}: {changed_files} files, {total_replacements} replacements, "
        f"scanned {total_files} files."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
