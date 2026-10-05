import re
file = "src/app/(tabs)/profile-setting.tsx"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r"style=\{\[styles\.overlay,\s*\{[^}]*\}\]\}", "style={styles.overlay}", content)
content = re.sub(r"style=\{\[styles\.logo,\s*\{[^}]*\}\]\}", "style={styles.logo}", content)
content = re.sub(r"(headerContainer:\s*\{[^}]*)height:\s*[^,}]+,?", r"\1height: OVERLAY_HEIGHT,", content)
content = re.sub(r"(overlay:\s*\{[^}]*)height:\s*[^,}]+,?", r"\1height: OVERLAY_HEIGHT,", content)
content = re.sub(r"(logo:\s*\{[^}]*)top:\s*[^,}]+,?", r"\1top: rs(95),", content)

content = content.replace("import { useSafeAreaInsets } from 'react-native-safe-area-context';\n", "")
content = re.sub(r"const insets = useSafeAreaInsets\(\);\n\s*", "", content)

# Check if headerContainer height got removed previously, if so add it
if "height: OVERLAY_HEIGHT" not in content.split("headerContainer:")[1].split("}")[0]:
    content = content.replace("headerContainer: {", "headerContainer: {\n    height: OVERLAY_HEIGHT,")

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed profile-setting")
