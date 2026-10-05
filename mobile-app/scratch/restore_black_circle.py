import re

file = 'src/components/TabBarMenu.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Restore Home active state to use homeActiveContainer
content = content.replace(
'''          {activeTab === 'home' ? (
            <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
          ) : (''',
'''          {activeTab === 'home' ? (
            <View style={styles.homeActiveContainer}>
              <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
            </View>
          ) : ('''
)

# Restore Discover active state to use homeActiveContainer
content = content.replace(
'''          {activeTab === 'discover' ? (
            <Image source={require('../../assets/images/compass.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
          ) : (''',
'''          {activeTab === 'discover' ? (
            <View style={styles.homeActiveContainer}>
              <Image source={require('../../assets/images/compass.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
            </View>
          ) : ('''
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)

file2 = 'src/app/(tabs)/notifications.tsx'
with open(file2, 'r', encoding='utf-8') as f2:
    content2 = f2.read()

content2 = content2.replace('<TabBarMenu activeTab="none" />', '<TabBarMenu activeTab="home" />')

with open(file2, 'w', encoding='utf-8') as f2:
    f2.write(content2)

print("Restored black circle and updated notifications.tsx!")
