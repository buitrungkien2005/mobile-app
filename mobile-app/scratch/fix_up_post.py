import re
file = 'src/app/(tabs)/up-post.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
'''          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={rs(20)} color="#000" />
          </View>''',
'''          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={rs(20)} color="#000" />
          </TouchableOpacity>'''
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed JSX error!')
