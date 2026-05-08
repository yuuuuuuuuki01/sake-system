import re
from pathlib import Path

data = Path("Z:/sk/sys/sktou.sys").read_bytes()

# CP932日本語を探す
jpn_re = re.compile(rb'(?:[\x81-\x9f\xe0-\xfc][\x40-\xfc]){2,}')
hits = jpn_re.findall(data)
print(f"CP932 hits: {len(hits)}")

seen = set()
for h in hits:
    try:
        s = h.decode('cp932', errors='strict')
        if all(c.isprintable() for c in s) and s not in seen:
            seen.add(s)
            print(f"  {s!r}")
            if len(seen) >= 50:
                break
    except:
        pass

print()
# shtou.sys も確認
data2 = Path("Z:/sh/sys/shtou.sys").read_bytes()
hits2 = jpn_re.findall(data2)
print(f"\nshtou.sys CP932 hits: {len(hits2)}")
seen2 = set()
for h in hits2:
    try:
        s = h.decode('cp932', errors='strict')
        if all(c.isprintable() for c in s) and s not in seen2:
            seen2.add(s)
            print(f"  {s!r}")
            if len(seen2) >= 30:
                break
    except:
        pass
