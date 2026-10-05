import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix OVERLAY_HEIGHT back to 67 / 393
content = content.replace('OVERLAY_HEIGHT = width * (149 / 393)', 'OVERLAY_HEIGHT = width * (67 / 393)')

# Replace top_overlay.png with profile_overlay_new.png
content = content.replace('top_overlay.png', 'profile_overlay_new.png')

# Update headerContainer and headerTop styles to match profile-info.tsx
content = re.sub(r'<View style=\{\[styles\.headerContainer, \{ height: OVERLAY_HEIGHT \}\]\}>', '<View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(90) }]}>', content)
content = re.sub(r'paddingTop: rs\(50\)', 'paddingTop: rs(85)', content)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed overlay image and header layout!')
