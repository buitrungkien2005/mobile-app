import re

file = 'src/components/TabBarMenu.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Add up-post to activeTab type
content = content.replace("activeTab?: 'home' | 'discover' | 'messages' | 'profile' | 'none';", "activeTab?: 'home' | 'discover' | 'messages' | 'profile' | 'up-post' | 'none';")

# Update Add Button
add_btn_old = '''      {/* Add Button */}
      <TouchableOpacity style={styles.tabItemAdd}>
        <View style={styles.addBtn}>
          <Ionicons name="add" size={rs(38)} color="#ffb703" />
        </View>
      </TouchableOpacity>'''

add_btn_new = '''      {/* Add Button */}
      <TouchableOpacity 
        style={styles.tabItemAdd} 
        onPress={() => activeTab !== 'up-post' && router.replace('/(tabs)/up-post')}
      >
        <View style={[styles.addBtn, activeTab === 'up-post' && { backgroundColor: '#ffb703' }]}>
          <Ionicons name="add" size={rs(38)} color={activeTab === 'up-post' ? '#000' : '#ffb703'} />
        </View>
      </TouchableOpacity>'''

content = content.replace(add_btn_old, add_btn_new)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated TabBarMenu!")
