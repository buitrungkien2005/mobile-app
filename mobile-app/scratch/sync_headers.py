import re
import os

files = [
    "src/app/(tabs)/privacy-safety.tsx",
    "src/app/(tabs)/language.tsx",
    "src/app/(tabs)/theme.tsx",
    "src/app/(tabs)/help-center.tsx",
    "src/app/(tabs)/notifications.tsx",
    "src/app/(tabs)/change-password.tsx",
    "src/app/(tabs)/change-password-success.tsx",
    "src/app/(tabs)/profile-info.tsx"
]

for file in files:
    if not os.path.exists(file):
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Revert overlay to original
    content = re.sub(
        r"style=\{\[styles\.overlay,\s*\{[^}]*\}\]\}",
        "style={styles.overlay}",
        content
    )

    # 2. Revert headerTop to original
    content = re.sub(
        r"<View style=\{\[styles\.headerTop,\s*\{[^}]*\}\]\}>",
        "<View style={styles.headerTop}>",
        content
    )

    # 3. Fix stylesheet
    # Make sure headerContainer has height: OVERLAY_HEIGHT + 90
    if "headerContainer:" in content:
        # Replace existing height if any
        content = re.sub(r"(headerContainer:\s*\{[^}]*)height:\s*[^,}]+,?", r"\1height: OVERLAY_HEIGHT + 90,", content)
        # If no height exists in headerContainer, add it
        if "height: OVERLAY_HEIGHT + 90" not in content:
            content = re.sub(r"(headerContainer:\s*\{)", r"\1\n    height: OVERLAY_HEIGHT + 90,", content)

    # Make sure overlay has height: OVERLAY_HEIGHT
    content = re.sub(r"(overlay:\s*\{[^}]*)height:\s*[^,}]+,?", r"\1height: OVERLAY_HEIGHT,", content)

    # Make sure headerTop has paddingTop: rs(95)
    if "headerTop:" in content:
        content = re.sub(r"(headerTop:\s*\{[^}]*)paddingTop:\s*[^,}]+,?", r"\1paddingTop: rs(95),", content)
        if "paddingTop: rs(95)" not in content:
            content = re.sub(r"(headerTop:\s*\{)", r"\1\n    paddingTop: rs(95),", content)

    # 4. Cleanup useSafeAreaInsets (optional, but good)
    content = re.sub(r"import \{ useSafeAreaInsets \} from 'react-native-safe-area-context';\n", "", content)
    content = re.sub(r"const insets = useSafeAreaInsets\(\);\n\s*", "", content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Processed {file}")
