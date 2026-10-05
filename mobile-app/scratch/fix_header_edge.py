import re
import os

files = [
    "src/app/(tabs)/privacy-safety.tsx",
    "src/app/(tabs)/language.tsx",
    "src/app/(tabs)/theme.tsx",
    "src/app/(tabs)/help-center.tsx",
    "src/app/(tabs)/notifications.tsx",
    "src/app/(tabs)/change-password.tsx",
    "src/app/(tabs)/change-password-success.tsx"
]

for file in files:
    if not os.path.exists(file):
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update overlay height to OVERLAY_HEIGHT + insets.top
    content = content.replace(
        "style={styles.overlay}",
        "style={[styles.overlay, { height: OVERLAY_HEIGHT + insets.top }]}"
    )

    # 2. Update headerTop paddingTop to OVERLAY_HEIGHT + insets.top + rs(15)
    content = re.sub(
        r"style=\{\[styles\.headerTop,\s*\{[^}]*\}\]\}",
        r"style={[styles.headerTop, { paddingTop: OVERLAY_HEIGHT + insets.top + rs(15) }]}",
        content
    )
    # Also if it's still style={styles.headerTop}
    content = content.replace(
        "<View style={styles.headerTop}>",
        "<View style={[styles.headerTop, { paddingTop: OVERLAY_HEIGHT + insets.top + rs(15) }]}>"
    )

    # 3. Remove fixed height from headerContainer
    content = re.sub(r"(headerContainer:\s*\{[^}]*)height:\s*OVERLAY_HEIGHT[^,]*,?\s*", r"\1", content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Processed {file}")
