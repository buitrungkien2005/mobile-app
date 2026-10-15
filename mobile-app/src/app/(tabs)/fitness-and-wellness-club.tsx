import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import MemFace from '../../components/MemFace';
import InviteFriendsModal from '../../components/InviteFriendsModal';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

type PrivateJoinState = 'Join Community' | 'Request Pending';

const PrivateCommunityJoinButton = () => {
  const [joinState, setJoinState] = useState<PrivateJoinState>('Join Community');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePress = () => {
    if (isTransitioning) return;

    if (joinState === 'Join Community') {
      setIsTransitioning(true);
      timerRef.current = setTimeout(() => {
        setJoinState('Request Pending');
        setIsTransitioning(false);
      }, 1500);
    } else if (joinState === 'Request Pending') {
      // Toggle back to Join Community
      setJoinState('Join Community');
    }
  };

  const getStyleOverrides = () => {
    if (joinState === 'Request Pending') {
      return {
        btn: { backgroundColor: '#000000', borderWidth: 0 },
        text: { color: '#ffffff' },
      };
    }
    return {
      btn: { backgroundColor: '#f59e0b', borderWidth: 0 },
      text: { color: '#ffffff' },
    };
  };

  const overrides = getStyleOverrides();

  return (
    <TouchableOpacity 
      style={[styles.joinBtn, overrides.btn]} 
      onPress={handlePress}
      disabled={isTransitioning}
      activeOpacity={0.8}
    >
      <Text style={[styles.joinBtnText, overrides.text]} numberOfLines={1}>
        {joinState}
      </Text>
    </TouchableOpacity>
  );
};

export default function FitnessAndWellnessClubScreen() {
  const router = useRouter();
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* FIXED TOP HEADER & SEARCH BAR */}
      <View style={styles.fixedHeaderArea}>
        <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(65) }]}>
          <Image 
            source={require('../../../assets/images/profile_overlay_new.png')} 
            style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} 
            resizeMode="cover" 
          />
          <View style={[styles.headerTop, { paddingTop: rs(75), position: 'relative' }]}>
            <Image source={require('../../../assets/images/BrandLogo.png')} style={styles.logoImage} resizeMode="contain" />
            
            <View style={styles.headerRightActions}>
              <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(tabs)/notifications')}>
                <Ionicons name="notifications" size={rs(18)} color="#000" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.headerAvatarBtn} onPress={() => router.replace('/(tabs)/profile')}>
                <Image source={require('../../../assets/images/Avatar_Me.png')} style={styles.headerAvatar} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.filterBtn, styles.filterBtnActive]} 
                onPress={() => router.back()}
              >
                <Ionicons name="options-outline" size={rs(20)} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={rs(20)} color="#ffbb00" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search communities, people, interests..."
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      </View>

      {/* FLOATING FIXED BACK BUTTON (STAYS MOTIONLESS LIKE HEADER) */}
      <TouchableOpacity 
        style={styles.floatingBackBtn} 
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={rs(20)} color="#ffffff" />
      </TouchableOpacity>

      {/* SCROLLABLE MAIN CONTENT */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* CARD 1: MAIN COMMUNITY CARD */}
        <View style={styles.mainCommunityCard}>
          {/* Cover Photo */}
          <View style={styles.coverWrapper}>
            <Image 
              source={require('../../../assets/images/Fitness.png')} 
              style={styles.coverImage} 
              resizeMode="cover" 
            />
          </View>

          {/* Community Info Section */}
          <View style={styles.cardBody}>
            <View style={styles.communityHeaderRow}>
              {/* Square avatar with golden border */}
              <View style={styles.avatarBorderWrapper}>
                <Image 
                  source={require('../../../assets/images/sport.png')} 
                  style={styles.communityAvatar} 
                />
              </View>

              {/* Title & Metadata */}
              <View style={styles.communityHeaderRight}>
                <Text style={styles.communityTitle}>Fitness & Wellness Club</Text>
                
                <View style={styles.metaRowItem}>
                  <Image 
                    source={require('../../../assets/images/userss2.png')} 
                    style={styles.metaIconUsers} 
                    resizeMode="contain" 
                  />
                  <Text style={styles.membersCountText}>328 members</Text>
                </View>

                <View style={styles.metaRowItem}>
                  <Image 
                    source={require('../../../assets/images/globe-icon.png')} 
                    style={styles.metaIconGlobe} 
                    resizeMode="contain" 
                  />
                  <Text style={styles.publicText}>Private</Text>
                </View>
              </View>
            </View>

            {/* Description Tagline */}
            <Text style={styles.communityDesc}>
              Stay healthy, stay strong — your fitness journey starts here
            </Text>

            {/* Reusable MemFace component */}
            <MemFace othersCount="+300 others" />
          </View>
        </View>

        {/* ACTION BUTTONS ROW (OUTSIDE CARD 1) */}
        <View style={styles.actionsRow}>
          <PrivateCommunityJoinButton />

          <TouchableOpacity style={styles.shareBtn} onPress={() => setInviteModalVisible(true)} activeOpacity={0.8}>
            <Text style={styles.shareBtnText}>Share Link</Text>
            <Image 
              source={require('../../../assets/images/share-2.png')} 
              style={styles.shareIcon} 
              resizeMode="contain" 
            />
          </TouchableOpacity>
        </View>

        {/* SECTION 2: ABOUT */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutDesc}>
              A private community for fitness enthusiasts in Ho Chi Minh City. We share workout routines, healthy recipes, and support each other's wellness goals. Members only — request access to join us!
            </Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {['Fitness', 'Wellness', 'Health', 'Gym', 'Yoga'].map(tag => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom padding for TabBar and Floating Mascot */}
        <View style={{ height: TABBAR_HEIGHT + rs(70) }} />
      </ScrollView>

      {/* FLOATING AISUP MASCOT */}

      <TabBarMenu activeTab="discover" />

      <AISup />

      {/* INVITE FRIENDS MODAL */}
      <InviteFriendsModal
        visible={isInviteModalVisible}
        onClose={() => setInviteModalVisible(false)}
        communityTitle="Fitness & Wellness Club"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  fixedHeaderArea: {
    backgroundColor: '#ffffff',
    zIndex: 10,
    elevation: 3,
  },
  headerContainer: {
    width: '100%',
    zIndex: 1,
    elevation: 1,
  },
  overlay: {
    width: '100%',
  },
  headerTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    alignItems: 'center',
    marginTop: rs(10),
  },
  logoImage: {
    width: rs(38),
    height: rs(44),
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(12),
  },
  iconButton: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: rs(8),
    right: rs(10),
    width: rs(6),
    height: rs(6),
    backgroundColor: 'red',
    borderRadius: rs(3),
  },
  headerAvatarBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffb703',
    overflow: 'hidden',
  },
  headerAvatar: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
  },
  filterBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(10),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  filterBtnActive: {
    backgroundColor: '#ffbb00',
    borderColor: '#ffbb00',
  },
  searchSection: {
    paddingHorizontal: rs(20),
    marginTop: rs(12),
    marginBottom: rs(14),
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: rs(16),
    height: rs(48),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: rs(10),
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: rs(14),
    color: '#111827',
  },
  scrollContent: {
    paddingTop: rs(12),
  },
  // CARD 1
  mainCommunityCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    marginHorizontal: rs(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  coverWrapper: {
    width: '100%',
    height: rs(180),
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  floatingBackBtn: {
    position: 'absolute',
    top: OVERLAY_HEIGHT + rs(165),
    left: rs(30),
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    elevation: 8,
  },
  cardBody: {
    padding: rs(16),
  },
  communityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  avatarBorderWrapper: {
    width: rs(68),
    height: rs(68),
    borderRadius: rs(16),
    borderWidth: 2,
    borderColor: '#f59e0b',
    padding: rs(2),
    backgroundColor: '#ffffff',
    marginRight: rs(14),
  },
  communityAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: rs(14),
  },
  communityHeaderRight: {
    flex: 1,
    justifyContent: 'center',
  },
  communityTitle: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: rs(20),
    color: '#111827',
    marginBottom: rs(4),
  },
  metaRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(2),
  },
  metaIconUsers: {
    width: rs(14),
    height: rs(14),
    marginRight: rs(6),
  },
  membersCountText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(12),
    color: '#ea580c',
  },
  metaIconGlobe: {
    width: rs(13),
    height: rs(13),
    marginRight: rs(6),
  },
  publicText: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
  },
  communityDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(13),
    color: '#4b5563',
    lineHeight: rs(18),
    marginBottom: rs(12),
  },

  // ACTION BUTTONS ROW
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: rs(16),
    marginTop: rs(14),
    gap: rs(12),
  },
  joinBtn: {
    flex: 1,
    height: rs(44),
    borderRadius: rs(22),
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  joinBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(14),
    color: '#ffffff',
  },
  shareBtn: {
    flex: 1,
    height: rs(44),
    borderRadius: rs(22),
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#f59e0b',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rs(8),
  },
  shareBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(14),
    color: '#f59e0b',
  },
  shareIcon: {
    width: rs(16),
    height: rs(16),
    tintColor: '#f59e0b',
  },

  // SECTIONS
  sectionContainer: {
    marginTop: rs(20),
    paddingHorizontal: rs(16),
  },
  sectionHeading: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(16),
    color: '#111827',
    marginBottom: rs(10),
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(14),
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  aboutDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(13),
    color: '#4b5563',
    lineHeight: rs(20),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(8),
    marginTop: rs(10),
  },
  tagPill: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: rs(12),
    paddingVertical: rs(6),
    borderRadius: rs(16),
  },
  tagText: {
    fontFamily: 'Inter_500Medium',
    fontSize: rs(12),
    color: '#b45309',
  },

  // UPCOMING EVENTS
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(10),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    elevation: 1,
  },
  eventThumb: {
    width: rs(54),
    height: rs(54),
    borderRadius: rs(12),
    marginRight: rs(12),
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(14),
    color: '#111827',
    marginBottom: rs(3),
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(2),
  },
  eventIconSmall: {
    width: rs(12),
    height: rs(12),
    marginRight: rs(5),
    tintColor: '#9ca3af',
  },
  eventMetaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(11),
    color: '#6b7280',
  },

  // COMMUNITY POSTS
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(14),
    marginBottom: rs(12),
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(10),
  },
  authorAvatarWrap: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    overflow: 'hidden',
    marginRight: rs(10),
  },
  authorAvatar: {
    width: '100%',
    height: '100%',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(13),
    color: '#111827',
  },
  postTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(11),
    color: '#9ca3af',
  },
  postContent: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(13),
    color: '#374151',
    lineHeight: rs(19),
    marginBottom: rs(10),
  },
  postGrid: {
    flexDirection: 'row',
    gap: rs(8),
    marginBottom: rs(10),
  },
  postGridImg: {
    flex: 1,
    height: rs(100),
    borderRadius: rs(10),
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(18),
    paddingTop: rs(4),
  },
  postActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(6),
  },
  postActionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: rs(12),
    color: '#4b5563',
  },
  commentIcon: {
    width: rs(16),
    height: rs(16),
  },
  readFullPostsBtn: {
    alignItems: 'center',
    paddingVertical: rs(10),
  },
  readFullPostsText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(13),
    color: '#ea580c',
  },

  // ACTIVE MEMBERS
  activeMembersCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    paddingVertical: rs(14),
    paddingHorizontal: rs(6),
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },

  // COMMUNITY RULES
  rulesCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(14),
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: rs(12),
    paddingBottom: rs(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  ruleBadge: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
    marginTop: rs(2),
  },
  ruleBadgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(11),
    color: '#b45309',
  },
  ruleContent: {
    flex: 1,
  },
  ruleTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(13),
    color: '#111827',
    marginBottom: rs(2),
  },
  ruleDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    lineHeight: rs(17),
  },
});
