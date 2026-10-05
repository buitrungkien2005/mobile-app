import re

file = 'src/components/TabBarMenu.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Home active state to not use homeActiveContainer
content = content.replace(
'''          {activeTab === 'home' ? (
            <View style={styles.homeActiveContainer}>
              <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
            </View>
          ) : (''',
'''          {activeTab === 'home' ? (
            <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
          ) : ('''
)

# Replace Discover active state to not use homeActiveContainer
content = content.replace(
'''          {activeTab === 'discover' ? (
            <View style={styles.homeActiveContainer}>
              <Image source={require('../../assets/images/compass.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
            </View>
          ) : (''',
'''          {activeTab === 'discover' ? (
            <Image source={require('../../assets/images/compass.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
          ) : ('''
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed black circles!")
