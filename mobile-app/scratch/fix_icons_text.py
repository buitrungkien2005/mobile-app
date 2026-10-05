import re

file = "src/app/(tabs)/profile-info.tsx"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix text corruption
content = re.sub(r'Found a magical little spot today .* Some places just feel like home\.\.\.', 'Found a magical little spot today ✨ Some places just feel like home...', content)
content = re.sub(r'New honey recipe alert! .* Who wants to try my lavender-infused honeycomb\?', 'New honey recipe alert! 🍯 Who wants to try my lavender-infused honeycomb?', content)

# 2. Shrink LikeButton icons
content = content.replace("marginRight: rs(20)", "marginRight: rs(12)")
content = content.replace("width: rs(24), height: rs(24)", "width: rs(18), height: rs(18)")
content = content.replace('name="heart-outline" size={rs(24)}', 'name="heart-outline" size={rs(18)}')
content = content.replace('name="heart" size={rs(24)}', 'name="heart" size={rs(18)}')

# 3. Shrink Comment and Share icons
content = content.replace('name="chatbubble-outline" size={rs(20)}', 'name="chatbubble-outline" size={rs(18)}')
content = content.replace('name="paper-plane-outline" size={rs(20)}', 'name="paper-plane-outline" size={rs(18)}')

# 4. Decrease margins in postActions
content = content.replace('marginLeft: rs(15)', 'marginLeft: rs(12)')

# 5. Fix postFooter wrap
content = re.sub(
    r'postFooter:\s*\{\s*flexDirection:\s*\'row\',\s*justifyContent:\s*\'space-between\',\s*alignItems:\s*\'center\',\s*flexWrap:\s*\'wrap\',\s*gap:\s*rs\(10\),\s*\}',
    'postFooter: {\n      flexDirection: \'row\',\n      justifyContent: \'space-between\',\n      alignItems: \'center\',\n    }',
    content
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Icons scaled down and text fixed")

