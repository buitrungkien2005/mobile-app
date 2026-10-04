import re

with open('mobile-app/src/app/(tabs)/profile.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Make sure useRouter is imported!
if 'useRouter' not in text:
    text = text.replace("import { Ionicons } from '@expo/vector-icons';", "import { Ionicons } from '@expo/vector-icons';\nimport { useRouter } from 'expo-router';")

# Find the start of TabBar Coded UI
start_idx = text.find("{/* TabBar Coded UI */}")
end_idx = text.find("  );\n}", start_idx)

new_tabbar = """{/* TabBar Coded UI */}
      <ImageBackground source={require('../../../assets/images/Background_tabar.png')} style={styles.tabbarContainer} resizeMode="cover">
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)/home')}>
          <Image source={require('../../../assets/images/TabItem-Home.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Image source={require('../../../assets/images/TabItem-Discover.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItemAdd}>
          <View style={styles.addBtn}>
            <Ionicons name="add" size={32} color="#ffbb00" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Image source={require('../../../assets/images/TabItem-Messages.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} >
          <View style={styles.profileActiveBorder}>
            <Image source={require('../../../assets/images/TabItem-Profile.png')} style={{ width: 32, height: 32 }} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
"""

if start_idx != -1 and end_idx != -1:
    text = text[:start_idx] + new_tabbar + text[end_idx:]

# Ensure router is initialized
if 'const router = useRouter();' not in text:
    text = text.replace('export default function ProfileScreen() {', 'export default function ProfileScreen() {\n  const router = useRouter();')

with open('mobile-app/src/app/(tabs)/profile.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

