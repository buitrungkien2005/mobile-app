import re

file = 'src/app/(tabs)/up-post.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add isSearchActive state and toggleSearch function
state_pattern = r'const \[activePrivacy, setActivePrivacy\] = useState\(\'Everyone\'\);'
state_replacement = '''const [activePrivacy, setActivePrivacy] = useState('Everyone');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };'''
content = re.sub(state_pattern, state_replacement, content)

# 2. Replace the old header with the new one
old_header_pattern = re.compile(r'<ImageBackground.*?<ScrollView', re.DOTALL)
new_header = '''<View style={[styles.headerContainer, { height: OVERLAY_HEIGHT }]}>
        <Image source={require('../../../assets/images/profile_overlay_new.png')} style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} resizeMode="cover" />
        <View style={[styles.headerTop, { paddingTop: rs(65), position: 'relative' }]}>
          <Image source={require('../../../assets/images/BrandLogo.png')} style={styles.logo} resizeMode="contain" />
          
          <View style={styles.headerRightActions}>
            <View style={[styles.searchWrapper, isSearchActive ? styles.searchWrapperExpanded : styles.searchWrapperCollapsed]}>
              {isSearchActive && (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor="#9ca3af"
                  autoFocus
                />
              )}
              <TouchableOpacity style={styles.searchIconButton} onPress={toggleSearch}>
                <Ionicons name="search" size={rs(18)} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications" size={rs(18)} color="#000" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.headerAvatarBtn} onPress={() => router.push('/profile-setting')}>
              <Image source={require('../../../assets/images/Avatar_Me.png')} style={styles.headerAvatar} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView'''

content = old_header_pattern.sub(new_header, content)

# 3. Add styles to match home.tsx
old_styles_pattern = re.compile(r'topOverlay: \{.*?\},\s*headerContainer: \{.*?\},\s*logo: \{.*?\},\s*headerRight: \{.*?\},\s*iconBtn: \{.*?\},\s*notificationBadge: \{.*?\},\s*avatarContainer: \{.*?\},\s*', re.DOTALL)
new_styles = '''headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  headerTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    alignItems: 'center',
    marginTop: rs(10),
  },
  logo: {
    height: rs(46),
    width: rs(30),
  },
  headerRightActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: rs(40),
  },
  searchWrapperCollapsed: {
    width: rs(40),
    backgroundColor: 'transparent',
  },
  searchWrapperExpanded: {
    flex: 1,
    backgroundColor: '#fffcf2',
    borderRadius: rs(20),
    borderWidth: 1.5,
    borderColor: '#ffb703',
    marginLeft: rs(15),
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: rs(16),
    fontSize: rs(14),
    color: '#000',
    height: '100%',
  },
  searchIconButton: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rs(10),
  },
  notificationDot: {
    position: 'absolute',
    top: rs(10),
    right: rs(12),
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    backgroundColor: '#ef4444',
  },
  headerAvatarBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    marginLeft: rs(10),
    borderWidth: 2,
    borderColor: '#ffb703',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  headerAvatar: {
    width: '100%',
    height: '100%',
  },
  '''
content = old_styles_pattern.sub(new_styles, content)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Header synchronized!')
