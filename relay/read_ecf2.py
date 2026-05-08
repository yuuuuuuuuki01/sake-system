import re
from pathlib import Path

# Try all ECF files
for ecf_name in ["販売管理.ecf", "販売管理０.ecf", "販売管理１.ecf", "販売管理２.ecf", "蔵内管理.ecf"]:
    ecf = Path(f"Z:/{ecf_name}").read_bytes()
    
    # CP932エンコードの日本語文字列を探す
    # CP932の第1バイト: 0x81-0x9F, 0xE0-0xFC
    # 第2バイト: 0x40-0xFC (0x7Fを除く)
    
    # まずファイル名パターンを探す（英大文字4文字以上 + .DAT）
    dat_re = re.compile(rb'[A-Z0-9]{4,16}\.DAT')
    dat_hits = dat_re.findall(ecf)
    
    # CP932日本語の連続を探す
    jpn_re = re.compile(rb'(?:[\x81-\x9f\xe0-\xfc][\x40-\xfc]){2,}')
    jpn_hits = jpn_re.findall(ecf)
    
    print(f"=== {ecf_name} ===")
    if dat_hits:
        print(f"DAT file refs: {[h.decode('ascii') for h in set(dat_hits)]}")
    else:
        print("No DAT file refs found")
    
    if jpn_hits:
        print(f"CP932 strings ({len(jpn_hits)} total), sample:")
        seen = set()
        for h in jpn_hits[:200]:
            try:
                s = h.decode('cp932', errors='strict')
                if s not in seen and all(c.isprintable() for c in s):
                    seen.add(s)
                    print(f"  {s!r}")
                    if len(seen) >= 20:
                        break
            except:
                pass
    print()
