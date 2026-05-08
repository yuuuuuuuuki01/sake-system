import re
from pathlib import Path

data = Path("Z:/sk/sys/sktou.sys").read_bytes()
print(f"sktou.sys: {len(data):,} bytes")

# ASCII文字列（5文字以上）
ascii_re = re.compile(rb'[ -~]{5,}')
ascii_strs = ascii_re.findall(data)
print(f"ASCII strings: {len(ascii_strs)}")

# 長いものをフィルタ（短い乱数を除外）
meaningful = [s.decode('ascii') for s in ascii_strs if len(s) >= 6]
# 英数字・日本語ラベルっぽいもの
for s in meaningful[:100]:
    print(f"  {s!r}")
