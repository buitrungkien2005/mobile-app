import re
import os

file = "src/app/(tabs)/profile-setting.tsx"

with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update overlay height to OVERLAY_HEIGHT + insets.top
content = content.replace(
    "style={styles.overlay}",
    "style={[styles.overlay, { height: OVERLAY_HEIGHT + insets.top }]}"
)

# 2. Update logo top to OVERLAY_HEIGHT + insets.top + rs(15)
content = re.sub(
    r"style=\{\[styles\.logo,\s*\{[^}]*\}\]\}",
    r"style={[styles.logo, { top: OVERLAY_HEIGHT + insets.top + rs(15) }]}",
    content
)

# 3. Increase headerContainer height so it includes the logo.
# Remove height from headerContainer in stylesheet
content = re.sub(r"(headerContainer:\s*\{[^}]*)height:\s*OVERLAY_HEIGHT[^,]*,?\s*", r"\1", content)

# Change JSX
content = content.replace(
    "<View style={styles.headerContainer}>",
    "<View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + insets.top + rs(90) }]}>"
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Processed {file}")
