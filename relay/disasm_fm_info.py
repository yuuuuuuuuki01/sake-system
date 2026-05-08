"""
MGBtrieve.dllのfm_info_get関数の冒頭をディスアセンブルして
何を返す関数か解析する
"""
import struct
from pathlib import Path

data = Path("Z:/新しいフォルダー/uniPaaS/Client V1Plus/Gateways/MGBtrieve.dll").read_bytes()
pe_off = struct.unpack_from('<I', data, 0x3C)[0]
num_sections = struct.unpack_from('<H', data, pe_off + 6)[0]
opt_size = struct.unpack_from('<H', data, pe_off + 20)[0]
sections_off = pe_off + 24 + opt_size
sections = []
for i in range(num_sections):
    s = sections_off + i * 40
    name = data[s:s+8].rstrip(b'\x00').decode('ascii', errors='replace')
    vaddr = struct.unpack_from('<I', data, s + 12)[0]
    vsize = struct.unpack_from('<I', data, s + 16)[0]
    raw = struct.unpack_from('<I', data, s + 20)[0]
    sections.append((name, vaddr, vsize, raw))
    print(f"Section {name}: vaddr=0x{vaddr:08x} raw=0x{raw:08x} size=0x{vsize:x}")

def rva_to_off(rva):
    for name, vaddr, vsize, raw in sections:
        if vaddr <= rva < vaddr + vsize:
            return raw + (rva - vaddr)
    return None

# エクスポートテーブルからfm_info_getのRVAを取得
export_rva = struct.unpack_from('<I', data, pe_off + 0x78)[0]
exp_off = rva_to_off(export_rva)
num_funcs = struct.unpack_from('<I', data, exp_off + 20)[0]
num_names = struct.unpack_from('<I', data, exp_off + 24)[0]
funcs_rva = struct.unpack_from('<I', data, exp_off + 28)[0]
names_rva = struct.unpack_from('<I', data, exp_off + 32)[0]
ords_rva  = struct.unpack_from('<I', data, exp_off + 36)[0]

names_off = rva_to_off(names_rva)
ords_off  = rva_to_off(ords_rva)
funcs_off = rva_to_off(funcs_rva)

for i in range(num_names):
    name_rva = struct.unpack_from('<I', data, names_off + i*4)[0]
    name_off = rva_to_off(name_rva)
    name = b''
    j = name_off
    while data[j] != 0:
        name += bytes([data[j]]); j += 1
    name = name.decode('ascii')
    ord_idx = struct.unpack_from('<H', data, ords_off + i*2)[0]
    func_rva = struct.unpack_from('<I', data, funcs_off + ord_idx*4)[0]
    func_off = rva_to_off(func_rva)
    
    print(f"\n{name}: RVA=0x{func_rva:x}, file_off=0x{func_off:x}")
    # 最初の64バイトを表示
    chunk = data[func_off:func_off+64]
    print(f"  hex: {chunk.hex()}")
    # 簡易ディスアセンブル（x86 push/mov/call等）
    i2 = 0
    while i2 < 32:
        b = chunk[i2]
        if b == 0x55: print(f"  +{i2:2d}: push ebp"); i2+=1
        elif b == 0x8B and chunk[i2+1] == 0xEC: print(f"  +{i2:2d}: mov ebp,esp"); i2+=2
        elif b == 0x83 and chunk[i2+1] == 0xEC: print(f"  +{i2:2d}: sub esp,{chunk[i2+2]}"); i2+=3
        elif b == 0x68: val=struct.unpack_from('<I',chunk,i2+1)[0]; print(f"  +{i2:2d}: push 0x{val:x}"); i2+=5
        elif b == 0xE8: val=struct.unpack_from('<i',chunk,i2+1)[0]; print(f"  +{i2:2d}: call +{val+5}"); i2+=5
        elif b == 0xC3: print(f"  +{i2:2d}: ret"); break
        elif b == 0x6A: print(f"  +{i2:2d}: push {chunk[i2+1]}"); i2+=2
        elif b == 0x33 and chunk[i2+1] == 0xC0: print(f"  +{i2:2d}: xor eax,eax"); i2+=2
        else: print(f"  +{i2:2d}: {b:02x}"); i2+=1
