import struct, re, os

mcf_path = "Z:/k5/prg/K5CTL.MCF"
size = os.path.getsize(mcf_path)

with open(mcf_path, 'rb') as f:
    hdr = f.read(512)

print(f"Magic: {hdr[:2]!r}")
rec_size = struct.unpack_from('<H', hdr, 0x18)[0]
total_slots = (size - 0x200) // rec_size
print(f"MCF: rec_size={rec_size}, total_slots={total_slots}")

# Search for field-related keywords in first 2MB
with open(mcf_path, 'rb') as f:
    chunk = f.read(2097152)

# CP932 keywords
keywords = {
    'juchuDate':   bytes([0x8e, 0xf3, 0x92, 0x8d, 0x93, 0xfa]),  # 受注日
    'customer':    bytes([0x93, 0x60, 0x88, 0xd3, 0x90, 0xe6]),  # 得意先
    'product':     bytes([0x8f, 0xa4, 0x95, 0x69]),               # 商品
    'qty':         bytes([0x90, 0x94, 0x97, 0xca]),               # 数量
    'nohinn':      bytes([0x94, 0x5b, 0x95, 0x69, 0x93, 0xfa]),  # 納品日
    'juchuNo':     bytes([0x8e, 0xf3, 0x92, 0x8d, 0x94, 0xd4]),  # 受注番号
}

print("\nCP932 keyword search:")
for name, pat in keywords.items():
    positions = []
    pos = 0
    while True:
        found = chunk.find(pat, pos)
        if found < 0:
            break
        positions.append(found)
        pos = found + 1
    if positions:
        print(f"  {name}: found at {positions[:5]}")
        # Show context
        p = positions[0]
        ctx = chunk[max(0,p-16):p+len(pat)+20]
        readable = ''.join(chr(b) if 0x20 <= b <= 0x7e else '.' for b in ctx)
        print(f"    Context: {ctx.hex()} | {readable}")

# Extract ASCII strings
print("\nLong ASCII strings in first 2MB (field/table names):")
pos = 0
count = 0
while pos < len(chunk) - 5:
    start = pos
    while pos < len(chunk) and 0x20 <= chunk[pos] <= 0x7e:
        pos += 1
    length = pos - start
    if 4 <= length <= 60:
        s = chunk[start:pos].decode('ascii', errors='replace').strip()
        if re.search(r'[A-Za-z]', s):
            # Look for table/field related terms
            su = s.upper()
            if any(kw in su for kw in ['IDD', 'IDO', 'JGS', 'TOR', 'K5IDD', 'K5IDO']):
                print(f"  0x{start:07x}: {repr(s)}")
                count += 1
    pos = max(pos + 1, start + 1)

if count == 0:
    print("  (none found with IDD/IDO/JGS patterns)")
    # Show all strings containing 'K5' or 'SK'
    pos = 0
    for _ in range(5000):
        start = pos
        while pos < len(chunk) and 0x20 <= chunk[pos] <= 0x7e:
            pos += 1
        length = pos - start
        if 4 <= length <= 60:
            s = chunk[start:pos].decode('ascii', errors='replace').strip()
            if re.search(r'[A-Za-z]', s) and ('K5' in s or 'SK' in s.upper()):
                print(f"  0x{start:07x}: {repr(s)}")
        pos = max(pos + 1, start + 1)
        if pos >= len(chunk):
            break
