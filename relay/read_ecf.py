import re
from pathlib import Path

ecf = Path("Z:/販売管理.ecf").read_bytes()
print(f"ECF size: {len(ecf):,} bytes")

# ASCII文字列を抽出（4文字以上）
ascii_re = re.compile(rb'[ -~]{4,}')
ascii_strings = ascii_re.findall(ecf)
print(f"ASCII strings: {len(ascii_strings)}")
for s in ascii_strings[:100]:
    print(f"  {s.decode('ascii', errors='replace')}")
