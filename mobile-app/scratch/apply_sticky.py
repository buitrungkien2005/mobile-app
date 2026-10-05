import re
file = 'src/app/(tabs)/up-post.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>',
    '<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, zIndex: 1 }}>'
)
content = content.replace(
    'contentContainerStyle={{ paddingBottom: rs(100) }}',
    'contentContainerStyle={{ paddingBottom: rs(100), paddingTop: OVERLAY_HEIGHT + rs(10) }}'
)

content = content.replace(
'''  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT,
  },''',
'''  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },'''
)

content = content.replace(
'''  scrollBody: {
    flex: 1,
    paddingHorizontal: rs(20),
    paddingTop: rs(20),
  },''',
'''  scrollBody: {
    flex: 1,
    paddingHorizontal: rs(20),
  },'''
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Applied sticky header!')
