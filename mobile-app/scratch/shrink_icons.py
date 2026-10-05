import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Change all rs(26) to rs(20) (this covers LikeButton and SaveButton)
content = re.sub(r'rs\(26\)', 'rs(20)', content)

# Change chat and share from 22 to 20
content = content.replace('name="chatbubble-outline" size={rs(22)}', 'name="chatbubble-outline" size={rs(20)}')
content = content.replace('name="paper-plane-outline" size={rs(22)}', 'name="paper-plane-outline" size={rs(20)}')

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Shrunk icons!')
