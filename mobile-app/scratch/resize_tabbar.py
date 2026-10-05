import re
import os

files = [
    "src/components/TabBarMenu.tsx",
    "src/components/GuestTabBarMenu.tsx"
]

for file in files:
    if not os.path.exists(file):
        print(f"Skipping {file}")
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normal icons (34 -> 26)
    content = content.replace('rs(34)', 'rs(26)')
    
    # Profile icon (46 -> 36)
    content = content.replace('rs(46)', 'rs(36)')
    # Also profile active border radius (23 -> 18)
    content = content.replace('borderRadius: rs(23)', 'borderRadius: rs(18)')
    
    # Active container width 68 -> 54
    content = content.replace('width: rs(68)', 'width: rs(54)')
    
    # Active container height is 44, but addBtn is also 44.
    # We want to change the homeActiveContainer height to 34, not the addBtn height!
    home_active_pattern = r"(homeActiveContainer:\s*\{[^}]*?height:\s*rs\()44(\)[^}]*?borderRadius:\s*rs\()22(\))"
    content = re.sub(home_active_pattern, r"\g<1>34\g<2>17\g<3>", content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {file}")
