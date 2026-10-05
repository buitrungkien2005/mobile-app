import React, { useState, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ImageBackground, TextInput, Platform, SafeAreaView, UIManager, LayoutAnimation, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';
import CommentModal from '../../components/CommentModal';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width, height } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393); 
const TABBAR_HEIGHT = 65; 



// =========================================================
// GIAO DIEN: 3. (user) home
// LUONG: User
// =========================================================

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleLike = () => {
    const toValue = liked ? 0 : 1;
    setLiked(!liked);
    Animated.timing(fadeAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }} onPress={toggleLike} activeOpacity={0.8}>
      <View style={{ width: rs(24), height: rs(24), justifyContent: 'center', alignItems: 'center' }}>
        {/* Unliked State */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Ionicons name="heart-outline" size={rs(24)} color="#6b7280" />
        </Animated.View>
        
        {/* Liked State (Gradient) */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim, width: rs(24), height: rs(24) }}>
          <MaskedView
            maskElement={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="heart" size={rs(24)} color="#000" />
              </View>
            }
            style={{ width: rs(24), height: rs(24) }}
          >
            <LinearGradient
              colors={['#ffbb00', '#ff7b00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const SaveButton = () => {
  const [saved, setSaved] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleSave = () => {
    const toValue = saved ? 0 : 1;
    setSaved(!saved);
    Animated.timing(fadeAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity onPress={toggleSave} activeOpacity={0.8} style={{ paddingLeft: rs(10) }}>
      <View style={{ width: rs(20), height: rs(20), justifyContent: 'center', alignItems: 'center' }}>
        {/* Unsaved State */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Ionicons name="bookmark-outline" size={rs(20)} color="#000" />
        </Animated.View>
        
        {/* Saved State (Gradient) */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim, width: rs(20), height: rs(20) }}>
          <MaskedView
            maskElement={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="bookmark" size={rs(20)} color="#000" />
              </View>
            }
            style={{ width: rs(20), height: rs(20) }}
          >
            <LinearGradient
              colors={['#ffbb00', '#ff7b00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const FeedPostBadges = ({ initialActive = 'public' }) => {
  const [active, setActive] = useState(initialActive);
  
  const renderBadge = (id: string, icon: any, label: string) => {
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
  const [activeFilters, setActiveFilters] = useState<string[]>(['For You', 'Public', 'Favorites']);
  
  // Modal state
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

    const openCommentModal = () => setCommentModalVisible(true);
  const closeCommentModal = () => setCommentModalVisible(false);

  const openInviteModal = () => {
    setInviteModalVisible(true);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 15,
      speed: 14,
    }).start();
  };

  const closeInviteModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setInviteModalVisible(false));
  };


  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };


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
      {/* HEADER SECTION */}
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(75) }]}>
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

            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(tabs)/notifications')}>
              <Ionicons name="notifications" size={rs(18)} color="#000" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.headerAvatarBtn} onPress={() => router.push('/profile-setting')}>
              <Image source={require('../../../assets/images/Avatar_Me.png')} style={styles.headerAvatar} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
              width: rs(60), height: rs(60), borderRadius: rs(30),
              backgroundColor: '#ffb703', justifyContent: 'center', alignItems: 'center'
            }}>
              <Ionicons name="add" size={rs(32)} color="#fff" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* FILTERS AREA */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: rs(5) }}>
            {['For You', 'Public', 'Discoveries', 'Nearby', 'Activities', 'Favorites'].map((filter, index) => {
              const isActive = activeFilters.includes(filter);
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  onPress={() => toggleFilter(filter)}
                  activeOpacity={0.8}
                >
                  <Text style={isActive ? styles.filterTextActive : styles.filterText}>{filter}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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
                <LikeButton />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }} onPress={openCommentModal}>
                  <Ionicons name="chatbubble-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openInviteModal}>
                  <Ionicons name="paper-plane-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              <FeedPostBadges initialActive="public" />
              <SaveButton />
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.postAuthor}>Priya Sharma</Text>
                  <Ionicons name="checkmark-circle" size={rs(16)} color="#ffb703" style={{marginLeft: rs(4)}} />
                </View>
                <Text style={styles.postTime}>5h ago • Bangalore, India</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={rs(20)} color="#ffb703" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.postText}>Found a magical little spot today ✨ Some places just feel like home...</Text>
            
            <Image source={{uri: 'https://picsum.photos/id/1015/600/300'}} style={styles.postImage} />
            
            <View style={styles.postActionsRow}>
              <View style={styles.leftActionsGroup}>
                <LikeButton />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }} onPress={openCommentModal}>
                  <Ionicons name="chatbubble-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openInviteModal}>
                  <Ionicons name="paper-plane-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              <FeedPostBadges initialActive="public" />
                <SaveButton />
            </View>

            <View style={styles.commentInputContainer}>
              <TextInput placeholder="Add a comment..." style={styles.commentInput} placeholderTextColor="#9ca3af" />
              <TouchableOpacity style={styles.commentSendBtn}>
                <Ionicons name="send" size={rs(14)} color="#ffb703" />
              </TouchableOpacity>
            </View>
            </View>

            {/* Post 3: Minh Tran */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={require('../../../assets/images/Avatar_MinhTran.png')} style={styles.postAvatar} resizeMode="contain" />
              <View style={styles.postMeta}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.postAuthor}>Minh Tran</Text>
                  <Text style={{fontSize: rs(14), marginLeft: rs(4)}}>🇻🇳</Text>
                  <Ionicons name="checkmark-circle" size={rs(16)} color="#ffb703" style={{marginLeft: rs(4)}} />
                </View>
                <Text style={styles.postTime}>20/8/2026 • Ho Chi Minh City, Vietnam</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={rs(20)} color="#ffb703" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.postText}>This morning's pho was so delicious! 🍜 Nothing beats a hot bowl of pho to start a new day in Saigon...</Text>
            
            <View style={[styles.postImage, { overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }]}>
              <Image source={{uri: 'https://picsum.photos/id/102/600/300'}} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
              <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />
              
              <Ionicons name="lock-closed" size={rs(18)} color="#fff" style={{ marginBottom: rs(8) }} />
              <Text style={{ color: '#fff', fontSize: rs(16), fontWeight: 'bold', marginBottom: rs(4) }}>Connections only</Text>
              <Text style={{ color: '#e5e7eb', fontSize: rs(12), textAlign: 'center', paddingHorizontal: rs(20), marginBottom: rs(16) }}>This post is visible to BeeBuddy connections</Text>
              
              <TouchableOpacity style={{ backgroundColor: '#ffb703', paddingHorizontal: rs(20), paddingVertical: rs(8), borderRadius: rs(20), flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="people" size={rs(14)} color="#000" style={{ marginRight: rs(6) }} />
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: rs(14) }}>Connect to unlock</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.postActionsRow}>
              <View style={styles.leftActionsGroup}>
                <LikeButton />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }} onPress={openCommentModal}>
                  <Ionicons name="chatbubble-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openInviteModal}>
                  <Ionicons name="paper-plane-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              <FeedPostBadges initialActive="connections" />
              <SaveButton />
            </View>

            <View style={styles.commentInputContainer}>
              <TextInput placeholder="Add a comment..." style={styles.commentInput} placeholderTextColor="#9ca3af" />
              <TouchableOpacity style={styles.commentSendBtn}>
                <Ionicons name="send" size={rs(14)} color="#ffb703" />
              </TouchableOpacity>
            </View>
            </View>
          </View>

          </ScrollView>

      {/* Floating Bee AI */}
      <AISup />

      
      <CommentModal visible={isCommentModalVisible} onClose={closeCommentModal} />

      {/* Share Post Modal */}
      <Modal visible={isInviteModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={closeInviteModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.inviteModalCard, { transform: [{ scale: scaleValue }] }]}>
                <Text style={styles.inviteModalTitle}>Share Post</Text>
                
                {/* Share via WhatsApp */}
                <TouchableOpacity style={styles.shareOptionBtn}>
                  <Image source={require('../../../assets/images/whatapp.png')} style={styles.shareOptionIcon} />
                  <Text style={styles.shareOptionText}>Share via WhatsApp</Text>
                  <Ionicons name="chevron-forward" size={rs(20)} color="#d1d5db" />
                </TouchableOpacity>

                {/* Share via Email */}
                <TouchableOpacity style={styles.shareOptionBtn}>
                  <Image source={require('../../../assets/images/Email.png')} style={styles.shareOptionIcon} />
                  <Text style={styles.shareOptionText}>Share via Email</Text>
                  <Ionicons name="chevron-forward" size={rs(20)} color="#d1d5db" />
                </TouchableOpacity>

                {/* Share via Twitter */}
                <TouchableOpacity style={styles.shareOptionBtn}>
                  <Image source={require('../../../assets/images/Twitter.png')} style={styles.shareOptionIcon} />
                  <Text style={styles.shareOptionText}>Share via Twitter</Text>
                  <Ionicons name="chevron-forward" size={rs(20)} color="#d1d5db" />
                </TouchableOpacity>

                {/* Social Icons Row */}
                <View style={styles.socialIconsRow}>
                  <Image source={require('../../../assets/images/Facebook.png')} style={styles.socialIconLarge} />
                  <Image source={require('../../../assets/images/Instagram.png')} style={[styles.socialIconLarge, { width: rs(42), height: rs(42) }]} />
                  <Image source={require('../../../assets/images/Tiktok.png')} style={styles.socialIconLarge} />
                  <Ionicons name="chevron-forward" size={rs(20)} color="#d1d5db" style={{ marginLeft: rs(5) }} />
                </View>

                <View style={styles.modalDivider} />

                <Text style={styles.orShareText}>OR SHARE VIA LINK</Text>

                <View style={styles.linkRow}>
                  <View style={styles.linkInputBox}>
                    <Ionicons name="link-outline" size={rs(20)} color="#6b7280" />
                    <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="tail">
                      https://invite.link/abc...
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.copyBtnContainer}>
                    <LinearGradient
                      colors={['#ffbb00', '#ff7b00']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.copyBtnGradient}
                    >
                      <Text style={styles.copyBtnText}>copy</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* TabBar Coded UI */}
      <TabBarMenu activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Background màu trắng
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
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
    width: rs(30), // Kích thước tỷ lệ chuẩn của BrandLogo
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
    top: rs(8),
    right: rs(8),
    width: rs(10),
    height: rs(10),
    backgroundColor: '#ef4444',
    borderRadius: rs(5),
    borderWidth: 1.5,
    borderColor: '#ffb703',
  },
  headerAvatarBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rs(10),
    borderWidth: 2,
    borderColor: '#ffb703',
    overflow: 'hidden',
  },
  headerAvatar: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
  },
  
  /* STORIES AREA */
  storiesContainer: {
    paddingHorizontal: rs(20),
    marginTop: rs(0),
    marginBottom: rs(0),
    alignItems: 'flex-start',
  },
  storyItem: {
    alignItems: 'center',
    marginRight: rs(18),
  },
  storyAvatarBorderActive: {
    width: rs(62),
    height: rs(62),
    borderRadius: rs(31),
    borderWidth: 2,
    borderColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  storyAvatarActive: {
    width: rs(58),
    height: rs(58),
  },
  storyAvatar: {
    width: rs(58),
    height: rs(58),
  },
  storyNameActive: {
    fontSize: rs(12),
    fontWeight: 'bold',
    marginTop: rs(6),
    color: '#000',
    textAlign: 'center',
  },
  storyName: {
    fontSize: rs(12),
    color: '#374151',
    marginTop: rs(6),
    fontWeight: '600',
    textAlign: 'center',
  },
  addStoryBtn: {
    width: rs(60),
    height: rs(60),
    borderRadius: rs(30),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rs(4), // Căn lùi xuống 1 chút cho cân với các avatar
  },
  
  /* FILTER TAGS */
  filtersContainer: {
    paddingHorizontal: rs(20),
  },
  filterPill: {
    paddingHorizontal: rs(16),
    paddingVertical: rs(8),
    borderRadius: rs(20),
    backgroundColor: '#f3f4f6', // xám nhạt
    marginRight: rs(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPillActive: {
    backgroundColor: '#ffb703',
  },
  filterText: {
    fontSize: rs(13),
    color: '#4b5563',
    fontWeight: '600',
  },
  filterTextActive: {
    fontSize: rs(13),
    color: '#fff',
    fontWeight: '600',
  },
  
  /* FEED AREA */
  feedContainer: {
    paddingHorizontal: rs(16),
  },
  postCard: {
    backgroundColor: '#e7e5db', // Màu nền thẻ bài viết hơi ngả be/xám giống ảnh
    borderRadius: rs(24),
    padding: rs(16),
    marginBottom: rs(20),
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  postAvatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    marginRight: rs(12),
  },
  postMeta: {
    flex: 1,
  },
  postAuthor: {
    fontSize: rs(16),
    fontWeight: 'bold',
    color: '#111827',
  },
  postTime: {
    fontSize: rs(13),
    color: '#6b7280',
    marginTop: rs(2),
  },
  postText: {
    fontSize: rs(14),
    color: '#111827',
    lineHeight: rs(20),
    marginBottom: rs(12),
  },
  postImage: {
    width: '100%',
    height: rs(200),
    borderRadius: rs(16),
    marginBottom: rs(12),
  },
  postActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(12),
  },
  leftActionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: rs(10),
  },
  tagsGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: rs(10),
  },
  postTagPublic: {
    flexDirection: 'row',
    backgroundColor: '#ffb703',
    paddingHorizontal: rs( 6 ),
    paddingVertical: rs( 3 ),
    borderRadius: rs(12),
    alignItems: 'center',
    marginRight: rs(2),
    marginBottom: rs(4),
  },
  postTagTextDark: {
    fontSize: rs( 8 ),
    fontWeight: 'bold',
    color: '#000',
  },
  postTag: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: rs( 6 ),
    paddingVertical: rs( 3 ),
    borderRadius: rs(12),
    alignItems: 'center',
    marginRight: rs(2),
    marginBottom: rs(4),
  },
  postTagText: {
    fontSize: rs( 8 ),
    fontWeight: '600',
    color: '#374151',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: rs(24),
    paddingHorizontal: rs(16),
    paddingVertical: rs(10),
  },
  commentInput: {
    flex: 1,
    fontSize: rs(14),
    color: '#111827',
    padding: 0,
    height: rs(20),
  },
  commentSendBtn: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    borderWidth: 1.5,
    borderColor: '#fcd34d',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffbf0',
    marginLeft: rs(8),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteModalCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: rs(24),
    padding: rs(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inviteModalTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(40),
    color: '#111827',
    textAlign: 'center',
    marginBottom: rs(10),
  },
  shareOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(30),
    paddingVertical: rs(12),
    paddingHorizontal: rs(16),
    marginBottom: rs(12),
    width: '100%',
  },
  shareOptionIcon: {
    width: rs(32),
    height: rs(32),
    marginRight: rs(8),
  },
  shareOptionText: {
    flex: 1,
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#111827',
  },
  socialIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: rs(10),
    paddingRight: rs(10),
    width: '100%',
  },
  socialIconLarge: {
    width: rs(36),
    height: rs(36),
    marginHorizontal: rs(8),
  },
  modalDivider: {
    height: rs(1),
    backgroundColor: '#e5e7eb',
    marginVertical: rs(20),
    width: '100%',
  },
  orShareText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(12),
    color: '#6b7280',
    marginBottom: rs(10),
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  linkInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: rs(20),
    paddingVertical: rs(12),
    paddingHorizontal: rs(16),
    marginRight: rs(10),
  },
  linkText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#6b7280',
    marginLeft: rs(8),
    flex: 1,
  },
  copyBtnContainer: {
    borderRadius: rs(20),
    overflow: 'hidden',
  },
  copyBtnGradient: {
    paddingVertical: rs(12),
    paddingHorizontal: rs(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyBtnText: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(24),
    color: '#fff',
    lineHeight: rs(24),
  },
});
