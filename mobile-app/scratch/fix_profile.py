import re

file = 'src/app/(tabs)/profile-info.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>\n                    <Ionicons name=\"chatbubble-outline\"", "<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openCommentModal}>\n                    <Ionicons name=\"chatbubble-outline\"")

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed profile-info!')
