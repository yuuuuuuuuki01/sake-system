import subprocess, os, shutil

outdir = r"C:\sake-system\sake-system\relay\tmp_chm"
chm = r"Z:\新しいフォルダー\uniPaaS\Client V1Plus\Support\TechnicalNotes.chm"

shutil.rmtree(outdir, ignore_errors=True)
os.makedirs(outdir, exist_ok=True)

result = subprocess.run(
    ['hh.exe', '-decompile', outdir, chm],
    capture_output=True,
    timeout=30
)
print("returncode:", result.returncode)
print("stdout:", result.stdout[:500])
print("stderr:", result.stderr[:500])

files = []
for root, dirs, fnames in os.walk(outdir):
    for f in fnames:
        files.append(os.path.join(root, f))
print(f"Files extracted: {len(files)}")
for f in sorted(files)[:30]:
    print(f"  {f}")
