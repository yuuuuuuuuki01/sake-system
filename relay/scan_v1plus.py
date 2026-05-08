import os, datetime
from collections import defaultdict

base = "Z:/新しいフォルダー/uniPaaS/Client V1Plus"

all_files = []
for root, dirs, files in os.walk(base):
    dirs.sort()
    for fname in sorted(files):
        fpath = os.path.join(root, fname)
        try:
            size = os.path.getsize(fpath)
            mtime = datetime.datetime.fromtimestamp(os.path.getmtime(fpath)).strftime('%Y-%m-%d')
            rel_path = fpath.replace(base, '').replace('\\', '/')
            ext = fname.rsplit('.', 1)[-1].upper() if '.' in fname else '(no ext)'
            all_files.append((rel_path, size, mtime, ext))
        except:
            pass

print(f"Total files: {len(all_files)}")
print()

by_ext = defaultdict(list)
for rel, size, mtime, ext in all_files:
    by_ext[ext].append((rel, size, mtime))

print("=== Files by type ===")
for ext in sorted(by_ext.keys(), key=lambda e: -sum(s for _,s,_ in by_ext[e])):
    items = by_ext[ext]
    total = sum(s for _,s,_ in items)
    print(f"  .{ext}: {len(items)} files, total {total:,}B")
    for rel, size, mtime in sorted(items, key=lambda x: -x[1])[:5]:
        print(f"    {rel}  ({size:,}B, {mtime})")

print()
print("=== Complete file list ===")
for rel, size, mtime, ext in sorted(all_files):
    print(f"  {size:>12,}B  {mtime}  {rel}")
