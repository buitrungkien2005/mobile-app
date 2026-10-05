import re
import os

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# I will recreate the file completely up to the point of the return statement
# I will use the exact original JSX and style properties

middle = """// =========================================================
// GIAO DIEN: 3. (user) home
// LUONG: User
// =========================================================

const FeedPostBadges = ({ initialActive = 'public' }) => {
  const [active, setActive] = useState(initialActive);
  
  const renderBadge = (id, icon, label) => {
    const isActive = active === id;
    return (
      <TouchableOpacity onPress={() => setActive(id)} activeOpacity={0.8} style={isActive ? styles.postTagPublic : styles.postTag}>
        <Ionicons name={icon} size={rs(8)} color={isActive ? "#000" : "#374151"} style={{marginRight: rs(3)}} />
        <Text style={isActive ? styles.postTagTextDark : styles.postTagText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tagsGroup}>
      {renderBadge('public', 'globe-outline', 'Public')}
      {renderBadge('connections', 'people', 'Connections')}
      {renderBadge('close', 'lock-closed', 'Close Circle')}
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    LayoutAnimation.configureNext({
      duration: 600, // Cham hon (600ms)
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.easeInEaseOut, springDamping: 0.8 },
      delete: { type: LayoutAnimation.Types.easeOut, property: LayoutAnimation.Properties.opacity },
    });
    setIsSearchActive(!isSearchActive);
  };

  return (
    <View style={styles.container}>
      {/* HEADER SECTION WITH CURVE */}
      <View style={styles.headerContainer}>
        <ImageBackground source={require('../../../assets/images/top_overlay.png')} style={styles.overlay} resizeMode="cover">
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
          </View>
        </ImageBackground>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* STORIES AREA */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.storyItem}>
              <View style={styles.storyAvatarBorderActive}>
                <Image source={require('../../../assets/images/Avatar_Me.png')} style={styles.storyAvatarActive} resizeMode="contain" />
              </View>
              <Text style={styles.storyNameActive}>Me</Text>
            </View>
            <View style={styles.storyItem}>
              <Image source={require('../../../assets/images/Avatar_AlexKim.png')} style={styles.storyAvatar} resizeMode="contain" />
              <Text style={styles.storyName}>Alex Kim</Text>
            </View>
            <View style={styles.storyItem}>
              <Image source={require('../../../assets/images/Avatar_MinhTran.png')} style={styles.storyAvatar} resizeMode="contain" />
              <Text style={styles.storyName}>Minh Tran</Text>
            </View>
            <View style={styles.storyItem}>
              <Image source={require('../../../assets/images/Avatar_SoraPark.png')} style={styles.storyAvatar} resizeMode="contain" />
              <Text style={styles.storyName}>Sora Park</Text>
            </View>
            <View style={styles.storyItem}>
              <Image source={require('../../../assets/images/Avatar_YukiTanaka.png')} style={styles.storyAvatar} resizeMode="contain" />
              <Text style={styles.storyName}>Yuki Tanaka</Text>
            </View>
            
            <TouchableOpacity style={{
              width: rs(70), height: rs(70), borderRadius: rs(35),
              backgroundColor: '#ffb703', justifyContent: 'center', alignItems: 'center'
            }}>
              <Ionicons name="add" size={rs(32)} color="#fff" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* FILTERS AREA */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: rs(15) }}>
            <TouchableOpacity style={[styles.filterPill, styles.filterPillActive]}>
              <Text style={styles.filterTextActive}>For You</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterPill, styles.filterPillActive]}>
              <Text style={styles.filterTextActive}>Public</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterPill}>
              <Text style={styles.filterText}>Discoveries</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterPill}>
              <Text style={styles.filterText}>Nearby</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterPill}>
              <Text style={styles.filterText}>Activities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterPill, styles.filterPillActive]}>
              <Text style={styles.filterTextActive}>Favorites</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.feedContainer}>
          {/* Post 1: Jake Miller */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={require('../../../assets/images/avatar_v3_Sunny.png')} style={styles.postAvatar} resizeMode="contain" />
              <View style={styles.postMeta}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.postAuthor}>Jake Miller</Text>
                  <Ionicons name="checkmark-circle" size={rs(16)} color="#ffb703" style={{marginLeft: rs(4)}} />
                </View>
                <Text style={styles.postTime}>3h ago • Bangalore, India</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={rs(20)} color="#ffb703" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.postText}>Looking for fellow mystery lovers 🔍 Anyone here a fan of Agatha Christie?</Text>
            
            <Image source={{uri: 'https://picsum.photos/id/1025/600/300'}} style={styles.postImage} />
            
            <View style={styles.postActionsRow}>
              <View style={styles.leftActionsGroup}>
                <TouchableOpacity><Ionicons name="heart-outline" size={rs(24)} color="#000" style={styles.actionIcon} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="chatbubble-outline" size={rs(24)} color="#000" style={styles.actionIcon} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="paper-plane-outline" size={rs(24)} color="#000" /></TouchableOpacity>
              </View>
              
              <FeedPostBadges initialActive="public" />
              <TouchableOpacity><Ionicons name="bookmark-outline" size={rs(24)} color="#000" /></TouchableOpacity>
            </View>

            <View style={styles.commentInputContainer}>
              <TextInput placeholder="Add a comment..." style={styles.commentInput} placeholderTextColor="#9ca3af" />
              <TouchableOpacity style={styles.commentSendBtn}>
                <Ionicons name="send" size={rs(14)} color="#ffb703" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Post 2: Priya Sharma */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={require('../../../assets/images/avatar_v3_Honey.png')} style={styles.postAvatar} resizeMode="contain" />
              <View style={styles.postMeta}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>"""

prefix = content.split('// =========================================================')[0]
suffix = content.split('                <View style={{flexDirection: \'row\', alignItems: \'center\'}}>')[2]

content = prefix + '\n' + middle + '\n                <View style={{flexDirection: \'row\', alignItems: \'center\'}}>' + suffix
with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
