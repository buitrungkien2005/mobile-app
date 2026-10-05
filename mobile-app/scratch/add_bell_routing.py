import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple regex to replace the touchable wrapper
    content = re.sub(
        r'<TouchableOpacity style=\{styles\.(iconButton|iconBtn)\}>(\s*<Ionicons name="notifications")',
        r'<TouchableOpacity style={styles.\1} onPress={() => router.push(\'/(tabs)/notifications\')}>\2',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('src/app/(tabs)/home.tsx')
update_file('src/app/(tabs)/up-post.tsx')
print("Updated!")
