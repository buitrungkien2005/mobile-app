import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';
import CommentModal from '../../components/CommentModal';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

const GradientText = (props: any) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#ffbb00', '#ff7b00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LikeButton = ({ initialCount }: { initialCount: number }) => {
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
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(8) }} onPress={toggleLike} activeOpacity={0.8}>
      <View style={{ width: rs(18), height: rs(18), justifyContent: 'center', alignItems: 'center' }}>
        {/* Unliked State */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Ionicons name="heart-outline" size={rs(18)} color="#6b7280" />
        </Animated.View>
        
        {/* Liked State (Gradient) */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim, width: rs(18), height: rs(18) }}>
          <MaskedView
            maskElement={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="heart" size={rs(18)} color="#000" />
              </View>
            }
            style={{ width: rs(18), height: rs(18) }}
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
      <Text style={{ fontFamily: 'AfacadFlux_400Regular', fontSize: rs(12), color: '#374151', marginLeft: rs(2) }}>
        {liked ? initialCount + 1 : initialCount}
      </Text>
    </TouchableOpacity>
  );
};

const PostBadgesGroup = ({ initialActive = 'connections' }: { initialActive?: string }) => {
  const [active, setActive] = useState(initialActive);
  
  const renderBadge = (id: string, iconName: any, label: string) => {
    const isActive = active === id;
    if (isActive) {
      return (
        <TouchableOpacity key={id} onPress={() => setActive(id)} activeOpacity={0.8}>
          <LinearGradient colors={['#ffbb00', '#ff7b00']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.postBadgeOrange}>
            <Ionicons name={iconName} size={rs(6)} color="#fff" />
            <Text style={styles.postBadgeTextOrange}>{label}</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity key={id} onPress={() => setActive(id)} activeOpacity={0.8}>
        <View style={styles.postBadgeGray}>
          <Ionicons name={iconName} size={rs(6)} color="#4b5563" />
          <Text style={styles.postBadgeTextGray}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.postBadges}>
      {renderBadge('public', 'globe-outline', 'Public')}
      {renderBadge('connections', 'people-outline', 'Connections')}
      {renderBadge('close', 'lock-closed-outline', 'Close Circle')}
    </View>
  );
};

export default function ProfileInfoScreen() {
  const router = useRouter();
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [openPostMenuId, setOpenPostMenuId] = useState<string | null>(null);
  
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

  const togglePostMenu = (postId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenPostMenuId(openPostMenuId === postId ? null : postId);
  };

  const renderChip = (label: string, bgColor: string, textColor: string, isGradient: boolean = false) => (
    <View style={[styles.chip, { backgroundColor: bgColor }]}>
      {isGradient ? (
        <GradientText style={styles.chipText}>{label}</GradientText>
      ) : (
        <Text style={[styles.chipText, { color: textColor }]}>{label}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Overlay & Top Row */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={styles.overlay} 
          resizeMode="cover" 
        />
        {/* Header Top Row */}
        <View style={styles.headerTop}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={rs(12)} color="#111827" style={{ marginTop: rs(12), marginRight: rs(6) }} />
            <Text style={styles.headerTitle}>Account info</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../../assets/images/BrandLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarBorder}>
                <Image 
                  source={require('../../../assets/images/AvatarOuter.png')} 
                  style={styles.avatarImage} 
                  resizeMode="contain"
                />
              </View>
              {/* Camera Badge */}
              <TouchableOpacity style={styles.cameraBadge}>
                <Ionicons name="camera" size={rs(16)} color="#fff" style={{ opacity: 0 }} />
              </TouchableOpacity>
            </View>

            <Text style={styles.nameText}>Buzzy</Text>
            <Text style={styles.usernameText}>@buzzy_bee</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>350</Text>
              <Text style={styles.statLabel}>Hive Points</Text>
            </View>
          </View>

          {/* Info Form Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>priya*****@gmail.com</Text>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>+91 98765 ****</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date Joined</Text>
              <Text style={styles.infoValue}>September 12, 2026</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Status</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Active</Text>
              </View>
            </View>
          </View>

          {/* Profile Badge Description */}
          <View style={styles.profileBadgeCard}>
            <GradientText style={styles.profileBadgeTitle}>Profile Badge</GradientText>
            <Text style={styles.profileBadgeText}>
              Your account is verified. You have access to all public community postings and message requests.
            </Text>
          </View>

          {/* Delete Account */}
          <View style={styles.deleteSection}>
            <TouchableOpacity>
              <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>
            <Text style={styles.deleteWarning}>
              Warning: This action is permanent and will completely delete your account data.
            </Text>
          </View>

          {/* My Buzzing Bio */}
          <View style={styles.bioCard}>
            <GradientText style={styles.sectionTitle}>My Buzzing Bio</GradientText>
            <Text style={styles.bioText}>
              Just a busy bee making sweet memories in BeeBuddy! Love sharing honey tips and making flower connections.
            </Text>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-twitter" size={rs(20)} color="#ff9800" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-linkedin" size={rs(20)} color="#ff9800" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Invite & Logout */}
          <TouchableOpacity style={styles.inviteButtonContainer} onPress={openInviteModal}>
            <LinearGradient
              colors={['#ffbb00', '#ff7b00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.inviteButtonGradient}
            >
              <Text style={styles.inviteButtonText}>Invite Friends</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/(auth)/login')}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>

          {/* Basic Info */}
          <View style={styles.basicInfoSection}>
            <GradientText style={styles.sectionTitle}>Basic Info</GradientText>
            <View style={styles.chipRow}>
              {renderChip('08/12/1992', '#fff9e6', '#000')}
              {renderChip('Non-binary', '#fff9e6', '#000')}
              {renderChip('Product Designer', '#fff9e6', '#000')}
            </View>

            <Text style={styles.subTitle}>Personality & Lifestyle</Text>
            <View style={styles.chipRow}>
              {renderChip('INTP', '#fff9e6', '#000')}
              {renderChip('Minimalist & active', '#fff9e6', '#000')}
            </View>

            <Text style={styles.subTitle}>Interests</Text>
            <View style={styles.chipRow}>
              {renderChip('Design', '#fff9e6', '#f59e0b', true)}
              {renderChip('Coffee', '#fff9e6', '#f59e0b', true)}
              {renderChip('Hiking', '#fff9e6', '#f59e0b', true)}
            </View>

            <Text style={styles.subTitle}>Hobbies</Text>
            <View style={styles.chipRow}>
              {renderChip('Sketching', '#dcfce7', '#166534')}
              {renderChip('Trail running', '#dcfce7', '#166534')}
              {renderChip('Cooking', '#dcfce7', '#166534')}
            </View>

            <Text style={styles.subTitle}>Skills</Text>
            <View style={styles.chipRow}>
              {renderChip('UI/UX Design', '#f3e8ff', '#7e22ce')}
              {renderChip('Prototyping', '#f3e8ff', '#7e22ce')}
              {renderChip('User Research', '#f3e8ff', '#7e22ce')}
            </View>

            <Text style={styles.subTitle}>Favorite Colors</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorCircle, { backgroundColor: '#ff8787' }]} />
              <View style={[styles.colorCircle, { backgroundColor: '#72f5ce' }]} />
              <View style={[styles.colorCircle, { backgroundColor: '#c084fc' }]} />
            </View>
          </View>

          {/* Recent Posts */}
          <View style={styles.recentPostsSection}>
            <GradientText style={styles.sectionTitle}>Recent Posts</GradientText>
            
            {/* Post 1 */}
            <View style={[styles.postCard, openPostMenuId === 'post1' && { zIndex: 10 }]}>
              <View style={styles.postHeader}>
                <Image source={require('../../../assets/images/Profile_Info.png')} style={styles.postAvatar} />
                <View style={styles.postHeaderText}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.postName}>Buzzy</Text>
                    <Image source={require('../../../assets/images/check-circle.png')} style={{ width: rs(14), height: rs(14), marginLeft: rs(4) }} resizeMode="contain" />
                  </View>
                  <Text style={styles.postTime}>3h ago</Text>
                </View>
                <TouchableOpacity onPress={() => togglePostMenu('post1')}>
                  <Ionicons name="ellipsis-vertical" size={rs(20)} color="#f59e0b" />
                </TouchableOpacity>
              </View>

              {/* Dropdown Menu Post */}
              {openPostMenuId === 'post1' && (
                <View style={styles.postDropdownMenu}>
                  <TouchableOpacity style={styles.postDropdownItem} onPress={() => router.push('/(tabs)/edit-post?postId=1')}>
                    <Ionicons name="chatbubble-outline" size={rs(18)} color="#111827" style={{ textShadowColor: '#111827', textShadowRadius: 0.5, textShadowOffset: { width: rs(0.5), height: rs(0.5) } }} />
                    <Text style={styles.postDropdownText}>Edit post</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postDropdownItem}>
                    <Ionicons name="ban-outline" size={rs(20)} color="#ef4444" style={{ textShadowColor: '#ef4444', textShadowRadius: 0.5, textShadowOffset: { width: rs(0.5), height: rs(0.5) } }} />
                    <Text style={[styles.postDropdownText, { color: '#ef4444' }]}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postDropdownItem}>
                    <Ionicons name="flag-outline" size={rs(20)} color="#111827" style={{ textShadowColor: '#111827', textShadowRadius: 0.5, textShadowOffset: { width: rs(0.5), height: rs(0.5) } }} />
                    <Text style={styles.postDropdownText}>Pin</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.postContentText}>
                Found a magical little spot today ✨ Some places just feel like home...
              </Text>
              <Image source={require('../../../assets/images/Pic_Jung.png')} style={styles.postImage} resizeMode="cover" />
              <View style={styles.postFooter}>
                <View style={styles.postActions}>
                  <LikeButton initialCount={128} />
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openCommentModal}>
                    <Ionicons name="chatbubble-outline" size={rs(18)} color="#6b7280" />
                    <Text style={styles.postActionText}>24</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: rs(8) }} onPress={openInviteModal}>
                    <Ionicons name="paper-plane-outline" size={rs(18)} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                <PostBadgesGroup initialActive="connections" />
                </View>
              </View>

            {/* Post 2 */}
            <View style={[styles.postCard, openPostMenuId === 'post2' && { zIndex: 10 }]}>
              <View style={styles.postHeader}>
                <Image source={require('../../../assets/images/Profile_Info.png')} style={styles.postAvatar} />
                <View style={styles.postHeaderText}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.postName}>Buzzy</Text>
                    <Image source={require('../../../assets/images/check-circle.png')} style={{ width: rs(14), height: rs(14), marginLeft: rs(4) }} resizeMode="contain" />
                  </View>
                  <Text style={styles.postTime}>1d ago</Text>
                </View>
                <TouchableOpacity onPress={() => togglePostMenu('post2')}>
                  <Ionicons name="ellipsis-vertical" size={rs(20)} color="#f59e0b" />
                </TouchableOpacity>
              </View>

              {/* Dropdown Menu Post 2 */}
              {openPostMenuId === 'post2' && (
                <View style={styles.postDropdownMenu}>
                  <TouchableOpacity style={styles.postDropdownItem} onPress={() => router.push('/(tabs)/edit-post?postId=2')}>
                    <Ionicons name="chatbubble-outline" size={rs(18)} color="#111827" style={{ textShadowColor: '#111827', textShadowRadius: 0.5, textShadowOffset: { width: rs(0.5), height: rs(0.5) } }} />
                    <Text style={styles.postDropdownText}>Edit post</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postDropdownItem}>
                    <Ionicons name="ban-outline" size={rs(20)} color="#ef4444" style={{ textShadowColor: '#ef4444', textShadowRadius: 0.5, textShadowOffset: { width: rs(0.5), height: rs(0.5) } }} />
                    <Text style={[styles.postDropdownText, { color: '#ef4444' }]}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postDropdownItem}>
                    <Ionicons name="flag-outline" size={rs(20)} color="#111827" style={{ textShadowColor: '#111827', textShadowRadius: 0.5, textShadowOffset: { width: rs(0.5), height: rs(0.5) } }} />
                    <Text style={styles.postDropdownText}>Pin</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.postContentText}>
                New honey recipe alert! 🍯 Who wants to try my lavender-infused honeycomb?
              </Text>
              <Image source={require('../../../assets/images/Pic_Hon.png')} style={styles.postImage} resizeMode="cover" />
              <View style={styles.postFooter}>
                <View style={styles.postActions}>
                  <LikeButton initialCount={95} />
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openCommentModal}>
                    <Ionicons name="chatbubble-outline" size={rs(18)} color="#6b7280" />
                    <Text style={styles.postActionText}>16</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: rs(8) }} onPress={openInviteModal}>
                    <Ionicons name="paper-plane-outline" size={rs(18)} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                <PostBadgesGroup initialActive="connections" />
                </View>
              </View>
            </View>

          {/* Gallery */}
          <View style={styles.gallerySection}>
            <GradientText style={styles.sectionTitle}>Gallery</GradientText>
            <View style={styles.galleryGrid}>
              <Image source={require('../../../assets/images/Gallery.png')} style={styles.galleryImage} />
              <Image source={require('../../../assets/images/Gallery.png')} style={styles.galleryImage} />
              <Image source={require('../../../assets/images/Gallery.png')} style={styles.galleryImage} />
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Floating AI Bee */}
      <AISup isGuest={false} />

      {/* Comment Modal */}
      <CommentModal visible={isCommentModalVisible} onClose={closeCommentModal} />

      {/* TabBar */}
      <TabBarMenu activeTab="profile" />

      {/* Invite Friends Modal */}
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  hexBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    height: OVERLAY_HEIGHT + 90,
    width: '100%',
    },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    paddingTop: rs(85),
  },
  backButton: {
    marginRight: rs(10),
    marginTop: rs(5),
  },
  headerTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(36),
    color: '#000',
    marginTop: rs(15),
  },
  logo: {
    width: rs(35),
    height: rs(50),
  },
  contentContainer: {
    paddingHorizontal: rs(20),
    paddingTop: rs(10),
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: rs(25),
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: rs(10),
  },
  avatarBorder: {
    width: rs(116),
    height: rs(118),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: rs(116),
    height: rs(118),
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  nameText: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(42),
    color: '#000',
    marginBottom: -10,
  },
  usernameText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(16),
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(25),
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: rs(15),
    marginHorizontal: rs(5),
    backgroundColor: '#fff',
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(1) },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(22),
    color: '#000',
    marginBottom: rs(2),
  },
  statLabel: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#6b7280',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: rs(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rs(18),
    paddingHorizontal: rs(16),
  },
  infoLabel: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(16),
    color: '#6b7280',
  },
  infoValue: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(16),
    color: '#000',
  },
  activeBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: rs(10),
    paddingVertical: rs(4),
    borderRadius: rs(8),
  },
  activeBadgeText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#059669',
  },
  divider: {
    height: rs(1),
    backgroundColor: '#f3f4f6',
    width: '100%',
  },
  profileBadgeCard: {
    backgroundColor: '#fffdf0',
    borderRadius: rs(16),
    padding: rs(16),
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  profileBadgeTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(28),
    color: '#b45309',
    marginBottom: -2,
  },
  profileBadgeText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#4b5563',
    lineHeight: rs(22),
  },
  deleteSection: {
    alignItems: 'center',
    marginTop: rs(65),
    marginBottom: rs(20),
  },
  deleteText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#ef4444',
    textDecorationLine: 'underline',
    marginBottom: rs(8),
  },
  deleteWarning: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: rs(20),
  },
  bioCard: {
    backgroundColor: '#fff',
    borderRadius: rs(16),
    padding: rs(20),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: rs(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(32),
    color: '#ff9800',
    marginBottom: 0,
  },
  bioText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(16),
    color: '#111827',
    lineHeight: rs(24),
    marginBottom: rs(15),
  },
  socialRow: {
    flexDirection: 'row',
  },
  socialBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  inviteButtonContainer: {
    marginBottom: rs(15),
    borderRadius: rs(18),
    overflow: 'hidden',
  },
  inviteButtonGradient: {
    paddingVertical: rs(15),
    alignItems: 'center',
  },
  inviteButtonText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#fff',
  },
  logoutButton: {
    alignItems: 'center',
    marginBottom: rs(30),
  },
  logoutText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(16),
    color: '#6b7280',
  },
  basicInfoSection: {
    marginBottom: rs(30),
  },
  subTitle: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(16),
    color: '#000',
    marginTop: rs(15),
    marginBottom: rs(10),
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: rs(12),
    paddingVertical: rs(6),
    borderRadius: rs(20),
    marginRight: rs(8),
    marginBottom: rs(8),
  },
  chipText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
  },
  colorRow: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    marginRight: rs(10),
  },
  recentPostsSection: {
    marginBottom: rs(30),
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    padding: rs(16),
    marginBottom: rs(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  postAvatar: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    marginRight: rs(10),
  },
  postHeaderText: {
    flex: 1,
  },
  postName: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#000',
  },
  postTime: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#9ca3af',
  },
  postContentText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#111827',
    marginBottom: rs(12),
    lineHeight: rs(22),
  },
  postImage: {
    width: '100%',
    height: rs(200),
    borderRadius: rs(12),
    marginBottom: rs(15),
  },
  postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postActionText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    marginLeft: rs(2),
  },
  gallerySection: {
    marginBottom: rs(30),
  },
  galleryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  galleryImage: {
    width: '32%',
    height: rs(110),
    borderRadius: rs(12),
  },
  postBadges: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      gap: rs(3),
      flex: 1,
    },
  postBadgeGray: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: rs(4),
    paddingVertical: rs(2),
    borderRadius: rs(10),
    
  },
  postBadgeOrange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff9800',
    paddingHorizontal: rs(4),
    paddingVertical: rs(2),
    borderRadius: rs(10),
    
  },
  postBadgeTextGray: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(8),
    color: '#4b5563',
    marginLeft: rs(2),
  },
  postBadgeTextOrange: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(8),
    color: '#ffffff',
    marginLeft: rs(2),
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
  },
  linkInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(12),
    padding: rs(12),
    marginRight: rs(10),
  },
  linkText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(12), color: '#374151',
    marginLeft: rs(8),
    flex: 1,
  },
  copyBtnContainer: {
    borderRadius: rs(12),
    overflow: 'hidden',
  },
  copyBtnGradient: {
    paddingVertical: rs(12),
    paddingHorizontal: rs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#fff',
  },
  postDropdownMenu: {
    position: 'absolute',
    top: rs(50),
    right: rs(15),
    backgroundColor: '#fff',
    borderRadius: rs(16),
    paddingVertical: rs(10),
    paddingHorizontal: rs(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
    minWidth: 140,
  },
  postDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(10),
  },
  postDropdownText: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(28),
    color: '#111827',
    marginLeft: rs(8),
    lineHeight: rs(28),
    marginTop: rs(4),
  },
});








