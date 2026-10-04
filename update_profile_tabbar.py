import re

with open('mobile-app/src/app/(tabs)/home.tsx', 'r', encoding='utf-8') as f:
    home_text = f.read()

with open('mobile-app/src/app/(tabs)/profile.tsx', 'r', encoding='utf-8') as f:
    profile_text = f.read()

# Extract tabbar from home.tsx
tabbar_match = re.search(r'(<ImageBackground source=\{require\(\'\.\./\.\./\.\./assets/images/Background_tabar\.png\'\)\}.*?</ImageBackground>)', home_text, re.DOTALL)
if tabbar_match:
    home_tabbar_code = tabbar_match.group(1)
    
    # We need to change the onPress routing for profile.tsx
    # In profile.tsx, Profile should not route to profile, but Home should route to home.
    home_tabbar_code = home_tabbar_code.replace(
        "onPress={() => router.push('/(tabs)/profile')}",
        ""
    )
    home_tabbar_code = home_tabbar_code.replace(
        """<TouchableOpacity style={styles.tabItem}>
          <Image source={require('../../../assets/images/TabItem-Home.png')}""",
        """<TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)/home')}>
          <Image source={require('../../../assets/images/TabItem-Home.png')}"""
    )
    
    # We also want to restore the black active border around the Profile avatar in profile.tsx
    home_tabbar_code = home_tabbar_code.replace(
        """<Image source={require('../../../assets/images/TabItem-Profile.png')} style={{ width: 32, height: 32 }} resizeMode="contain" />""",
        """<View style={styles.profileActiveBorder}>
            <Image source={require('../../../assets/images/TabItem-Profile.png')} style={{ width: 32, height: 32 }} resizeMode="contain" />
          </View>"""
    )

    # Replace tabbar in profile.tsx
    profile_text = re.sub(r'<View style=\{styles\.tabbarContainer\}>.*?</View>', home_tabbar_code, profile_text, flags=re.DOTALL)
    
    # Replace background color in styles.tabbarContainer in profile.tsx
    profile_text = profile_text.replace("backgroundColor: '#ffb703', // MAu vAng n?n tabbar\n", "")
    profile_text = profile_text.replace("backgroundColor: '#ffb703',\n", "")
    
    # Ensure ImageBackground is imported in profile.tsx
    if "ImageBackground" not in profile_text.split("from 'react-native'")[0]:
        profile_text = profile_text.replace("import { View, Text", "import { View, Text, ImageBackground")
        
    with open('mobile-app/src/app/(tabs)/profile.tsx', 'w', encoding='utf-8') as f:
        f.write(profile_text)
else:
    print("Could not find tabbar in home.tsx")

