import re

with open('mobile-app/src/app/(tabs)/home.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update tabbarContainer to be an ImageBackground
text = text.replace(
    "<View style={styles.tabbarContainer}>",
    "<ImageBackground source={require('../../../assets/images/Background_tabar.png')} style={styles.tabbarContainer} resizeMode=\"cover\">"
)
text = text.replace(
    "</View>\n    </ImageBackground>",
    "</ImageBackground>\n    </ImageBackground>"
)

# 2. Replace Home icon
text = text.replace(
    """<View style={styles.homeActiveContainer}>
            <Ionicons name="home-outline" size={24} color="#fff" />
          </View>""",
    """<Image source={require('../../../assets/images/TabItem-Home.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />"""
)

# 3. Replace Compass (Discover) icon
text = text.replace(
    """<Ionicons name="compass-outline" size={28} color="#000" />""",
    """<Image source={require('../../../assets/images/TabItem-Discover.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />"""
)

# 4. Replace Chat (Messages) icon
text = text.replace(
    """<Ionicons name="chatbubble-outline" size={26} color="#000" />""",
    """<Image source={require('../../../assets/images/TabItem-Messages.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />"""
)

# 5. Replace Profile icon (Remove the inactive border and just use the image)
text = text.replace(
    """<View style={styles.profileInactiveBorder}>
            <Image 
              source={require('../../../assets/images/avatar_v2_0.png')} 
              style={styles.profileAvatar} 
              resizeMode="contain" 
            />
          </View>""",
    """<Image source={require('../../../assets/images/TabItem-Profile.png')} style={{ width: 32, height: 32, borderRadius: 16 }} resizeMode="contain" />"""
)

# 6. Remove the backgroundColor from tabbarContainer style since it's an ImageBackground now
text = text.replace("backgroundColor: '#ffb703', \n    flexDirection: 'row',", "flexDirection: 'row',")

with open('mobile-app/src/app/(tabs)/home.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

