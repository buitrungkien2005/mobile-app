import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

good_header = """      {/* HEADER SECTION */}
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(30) }]}>
        <Image source={require('../../../assets/images/top_overlay.png')} style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} resizeMode="cover" />
        <View style={[styles.headerTop, { paddingTop: rs(50), position: 'relative' }]}>
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
      </View>"""

old_header = """      {/* HEADER SECTION WITH CURVE */}
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/images/top_overlay.png')} style={styles.overlay} resizeMode="cover" />
      </View>

      <View style={styles.headerTop}>
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
      </View>"""

content = content.replace(old_header, good_header)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Header fixed')
