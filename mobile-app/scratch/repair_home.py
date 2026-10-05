import re
import os

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

prefix = content.split("  return (")[0]
suffix = content.split("                <View style={{flexDirection: 'row', alignItems: 'center'}}>")[1]

middle = """  return (
    <View style={styles.container}>
      <View style={styles.topCurvedBackground}>
        <Image source={require('../../../assets/images/top_overlay.png')} style={styles.topOverlayImage} resizeMode="cover" />
      </View>

      <View style={styles.headerRow}>
        <Image source={require('../../../assets/images/BrandLogo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.headerRight}>
          <View style={styles.searchContainer}>
            {isSearchActive && (
              <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#6b7280" autoFocus />
            )}
            <TouchableOpacity style={styles.headerIconWrapper} onPress={toggleSearch}>
              <Ionicons name="search" size={rs(20)} color="#111827" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.headerIconWrapper}>
            <Ionicons name="notifications-outline" size={rs(20)} color="#111827" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile-setting')}>
            <Image source={require('../../../assets/images/Avatar_Me.png')} style={styles.headerAvatar} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: rs(80) }}>
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesScroll}>
            <View style={styles.storyItem}>
              <View style={[styles.storyAvatarWrapper, styles.storyAvatarWrapperActive]}>
                <Image source={require('../../../assets/images/Avatar_Me.png')} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyNameActive}>Me</Text>
            </View>
            <View style={styles.storyItem}>
              <View style={styles.storyAvatarWrapper}>
                <Image source={require('../../../assets/images/Avatar_AlexKim.png')} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyName}>Alex Kim</Text>
            </View>
            <View style={styles.storyItem}>
              <View style={styles.storyAvatarWrapper}>
                <Image source={require('../../../assets/images/Avatar_MinhTran.png')} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyName}>Minh Tran</Text>
            </View>
            <View style={styles.storyItem}>
              <View style={styles.storyAvatarWrapper}>
                <Image source={require('../../../assets/images/Avatar_SoraPark.png')} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyName}>Sora Park</Text>
            </View>
            <View style={styles.storyItem}>
              <View style={styles.storyAvatarWrapper}>
                <Image source={require('../../../assets/images/Avatar_YukiTanaka.png')} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyName}>Yuki Tanaka</Text>
            </View>
            <TouchableOpacity style={styles.storyAddBtn}>
              <Ionicons name="add" size={rs(24)} color="#fff" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
            <TouchableOpacity style={styles.filterBtnActive}><Text style={styles.filterTextActive}>For You</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterBtnActive}><Text style={styles.filterTextActive}>Public</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn}><Text style={styles.filterText}>Discoveries</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn}><Text style={styles.filterText}>Nearby</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn}><Text style={styles.filterText}>Activities</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterBtnActive}><Text style={styles.filterTextActive}>Favorites</Text></TouchableOpacity>
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

content = prefix + middle + suffix
with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
