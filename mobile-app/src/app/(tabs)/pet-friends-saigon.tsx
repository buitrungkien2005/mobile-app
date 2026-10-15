import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import MemFace from '../../components/MemFace';
import ActiveMem from '../../components/ActiveMem';
import InviteFriendsModal from '../../components/InviteFriendsModal';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

type JoinState = 'Join Community' | 'Request Access' | 'Request Pending' | 'Joined' | 'Manage';

const CommunityJoinButton = () => {
  const [joinState, setJoinState] = useState<JoinState>('Join Community');
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePress = () => {
    if (joinState === 'Join Community') {
      setJoinState('Request Access');
      timerRef.current = setTimeout(() => {
        setJoinState('Request Pending');
        timerRef.current = setTimeout(() => {
          setJoinState('Joined');
          timerRef.current = setTimeout(() => {
            setJoinState('Manage');
          }, 1500);
        }, 1500);
      }, 1500);
    } else if (joinState === 'Manage') {
      setJoinState('Join Community');
    }
  };

  const getStyleOverrides = () => {
    switch (joinState) {
      case 'Request Access':
      case 'Manage':
        return {
          btn: { backgroundColor: '#000000', borderWidth: 0 },
          text: { color: '#ffffff' },
        };
      case 'Request Pending':
        return {
          btn: { backgroundColor: '#ffffff', borderWidth: 1.5, borderColor: '#d1d5db' },
          text: { color: '#6b7280' },
        };
      case 'Joined':
        return {
          btn: { backgroundColor: '#ffffff', borderWidth: 1.5, borderColor: '#22c55e' },
          text: { color: '#22c55e' },
        };
      case 'Join Community':
      default:
        return {
          btn: { backgroundColor: '#f59e0b', borderWidth: 0 },
          text: { color: '#ffffff' },
        };
    }
  };

  const overrides = getStyleOverrides();
  const disabled = joinState === 'Request Access' || joinState === 'Request Pending' || joinState === 'Joined';

  return (
    <TouchableOpacity 
      style={[styles.joinBtn, overrides.btn]} 
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.joinBtnText, overrides.text]} numberOfLines={1}>
        {joinState}
      </Text>
    </TouchableOpacity>
  );
};

export default function PetFriendsSaigonScreen() {
  const router = useRouter();
  const [post1Liked, setPost1Liked] = useState(false);
  const [post2Liked, setPost2Liked] = useState(false);
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
              source={require('../../../assets/images/CoverPhoto-Pet.png')} 
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
                  source={require('../../../assets/images/card.png')} 
                  style={styles.communityAvatar} 
                />
              </View>

              {/* Title & Metadata */}
              <View style={styles.communityHeaderRight}>
                <Text style={styles.communityTitle}>Pet Friends Saigon</Text>
                
                <View style={styles.metaRowItem}>
                  <Image 
                    source={require('../../../assets/images/userss2.png')} 
                    style={styles.metaIconUsers} 
                    resizeMode="contain" 
                  />
                  <Text style={styles.membersCountText}>1.1K members</Text>
                </View>

                <View style={styles.metaRowItem}>
                  <Image 
                    source={require('../../../assets/images/globe-icon.png')} 
                    style={styles.metaIconGlobe} 
                    resizeMode="contain" 
                  />
                  <Text style={styles.publicText}>Public</Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.communityDesc}>
              For pet lovers to share tips, find playdates and make friends
            </Text>

            {/* Reusable MemFace component */}
            <MemFace othersCount="+1,090 others" />
          </View>
        </View>

        {/* ACTION BUTTONS ROW */}
        <View style={styles.actionsRow}>
          <CommunityJoinButton />

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
              The friendliest pet community in Saigon! Share adorable photos, get vet recommendations, arrange playdates, and connect with fellow animal lovers. Dogs, cats, and all furry friends welcome!
            </Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {['Pets', 'Dogs', 'Cats', 'Saigon', 'Playdates'].map(tag => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* SECTION 3: UPCOMING EVENTS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Upcoming Events</Text>

          {/* Event 1 */}
          <TouchableOpacity style={styles.eventCard} activeOpacity={0.8}>
            <Image 
              source={require('../../../assets/images/event_thumb_1.png')} 
              style={styles.eventThumb} 
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Paws in the Park - Morning Walk</Text>
              <View style={styles.eventMetaRow}>
                <Image 
                  source={require('../../../assets/images/calendar.png')} 
                  style={styles.eventIconSmall} 
                  resizeMode="contain" 
                />
                <Text style={styles.eventMetaText}>Oct 13, 7:00 AM</Text>
              </View>
              <View style={styles.eventMetaRow}>
                <Image 
                  source={require('../../../assets/images/map-pin.png')} 
                  style={styles.eventIconSmall} 
                  resizeMode="contain" 
                />
                <Text style={styles.eventMetaText}>Sala Park, Thu Duc City</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
          </TouchableOpacity>

          {/* Event 2 */}
          <TouchableOpacity style={styles.eventCard} activeOpacity={0.8}>
            <Image 
              source={require('../../../assets/images/event_thumb_2.png')} 
              style={styles.eventThumb} 
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Cat Parents Coffee Gathering</Text>
              <View style={styles.eventMetaRow}>
                <Image 
                  source={require('../../../assets/images/calendar.png')} 
                  style={styles.eventIconSmall} 
                  resizeMode="contain" 
                />
                <Text style={styles.eventMetaText}>Oct 20, 9:30 AM</Text>
              </View>
              <View style={styles.eventMetaRow}>
                <Image 
                  source={require('../../../assets/images/map-pin.png')} 
                  style={styles.eventIconSmall} 
                  resizeMode="contain" 
                />
                <Text style={styles.eventMetaText}>Catfe Lounge, District 10</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* SECTION 4: COMMUNITY POSTS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Community Posts</Text>

          {/* Post 1 */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.authorAvatarWrap}>
                <Image 
                  source={require('../../../assets/images/AuthorAvatar.png')} 
                  style={styles.authorAvatar} 
                />
              </View>
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>Amina Mansoor</Text>
                <Text style={styles.postTime}>2 hours ago</Text>
              </View>
            </View>

            <Text style={styles.postContent}>
              Mochi made so many golden retriever buddies at the park today! Look at that happy smile...
            </Text>

            <View style={styles.postGrid}>
              <Image 
                source={require('../../../assets/images/GridImage.png')} 
                style={styles.postGridImg} 
              />
              <Image 
                source={require('../../../assets/images/GridImage2.png')} 
                style={styles.postGridImg} 
              />
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.postActionItem}
                onPress={() => setPost1Liked(!post1Liked)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={post1Liked ? "heart" : "heart-outline"} 
                  size={rs(18)} 
                  color={post1Liked ? "#ef4444" : "#6b7280"} 
                />
                <Text style={styles.postActionText}>{post1Liked ? 74 : 73}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postActionItem} activeOpacity={0.7}>
                <Image 
                  source={require('../../../assets/images/Comment.png')} 
                  style={styles.commentIcon} 
                  resizeMode="contain" 
                />
                <Text style={styles.postActionText}>21</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Post 2 */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.authorAvatarWrap}>
                <Image 
                  source={require('../../../assets/images/AuthorAvatar2.png')} 
                  style={styles.authorAvatar} 
                />
              </View>
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>Linh Nguyen</Text>
                <Text style={styles.postTime}>Yesterday</Text>
              </View>
            </View>

            <Text style={styles.postContent}>
              Any recommended pet clinic open 24/7 near Binh Thanh? Thanks fellow paw-rents in advance!...
            </Text>

            <View style={styles.postGrid}>
              <Image 
                source={require('../../../assets/images/GridImage3.png')} 
                style={styles.postGridImg} 
              />
              <Image 
                source={require('../../../assets/images/GridImage4.png')} 
                style={styles.postGridImg} 
              />
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.postActionItem}
                onPress={() => setPost2Liked(!post2Liked)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={post2Liked ? "heart" : "heart-outline"} 
                  size={rs(18)} 
                  color={post2Liked ? "#ef4444" : "#6b7280"} 
                />
                <Text style={styles.postActionText}>{post2Liked ? 29 : 28}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postActionItem} activeOpacity={0.7}>
                <Image 
                  source={require('../../../assets/images/Comment.png')} 
                  style={styles.commentIcon} 
                  resizeMode="contain" 
                />
                <Text style={styles.postActionText}>11</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Banner link */}
          <TouchableOpacity activeOpacity={0.8} style={styles.readFullPostsBtn}>
            <Text style={styles.readFullPostsText}>Join this community to read full posts</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 5: ACTIVE MEMBERS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Active Members</Text>
          <View style={styles.activeMembersCard}>
            <ActiveMem />
          </View>
        </View>

        {/* SECTION 6: COMMUNITY RULES */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Community Rules</Text>
          <View style={styles.rulesCard}>
            {/* Rule 1 */}
            <View style={styles.ruleItem}>
              <View style={styles.ruleBadge}>
                <Text style={styles.ruleBadgeText}>1</Text>
              </View>
              <View style={styles.ruleContent}>
                <Text style={styles.ruleTitle}>Be kind to all animals & owners</Text>
                <Text style={styles.ruleDesc}>
                  Spread positive vibes. Respect each pet's temperament, boundaries, and personal space.
                </Text>
              </View>
            </View>

            {/* Rule 2 */}
            <View style={styles.ruleItem}>
              <View style={styles.ruleBadge}>
                <Text style={styles.ruleBadgeText}>2</Text>
              </View>
              <View style={styles.ruleContent}>
                <Text style={styles.ruleTitle}>Leash your pets in public areas</Text>
                <Text style={styles.ruleDesc}>
                  For safety during meetups, ensure dogs are leashed unless in designated enclosed playpens.
                </Text>
              </View>
            </View>

            {/* Rule 3 */}
            <View style={[styles.ruleItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <View style={styles.ruleBadge}>
                <Text style={styles.ruleBadgeText}>3</Text>
              </View>
              <View style={styles.ruleContent}>
                <Text style={styles.ruleTitle}>Helpful health advice only</Text>
                <Text style={styles.ruleDesc}>
                  Share genuine experiences but always advise consulting certified veterinarians for serious medical issues.
                </Text>
              </View>
            </View>
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
        communityTitle="Pet Friends Saigon"
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
    alignItems: 'flex-start',
    marginBottom: rs(12),
  },
  avatarBorderWrapper: {
    width: rs(58),
    height: rs(58),
    borderRadius: rs(12),
    borderWidth: 2,
    borderColor: '#f59e0b',
    padding: 2,
    backgroundColor: '#ffffff',
    marginRight: rs(12),
  },
  communityAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: rs(8),
    resizeMode: 'cover',
  },
  communityHeaderRight: {
    flex: 1,
    justifyContent: 'center',
  },
  communityTitle: {
    fontSize: rs(18),
    fontFamily: 'Inter_700Bold',
    color: '#111827',
    marginBottom: rs(4),
  },
  metaRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(2),
  },
  metaIconUsers: {
    width: rs(14),
    height: rs(14),
    marginRight: rs(6),
    tintColor: '#4b5563',
  },
  membersCountText: {
    fontSize: rs(12.5),
    fontFamily: 'Inter_500Medium',
    color: '#4b5563',
  },
  metaIconGlobe: {
    width: rs(13),
    height: rs(13),
    marginRight: rs(6),
    tintColor: '#4b5563',
  },
  publicText: {
    fontSize: rs(12.5),
    fontFamily: 'Inter_500Medium',
    color: '#4b5563',
  },
  communityDesc: {
    fontSize: rs(13.5),
    fontFamily: 'Inter_400Regular',
    color: '#374151',
    lineHeight: rs(19),
    marginBottom: rs(14),
  },
  actionsRow: {
    flexDirection: 'row',
    marginHorizontal: rs(16),
    marginTop: rs(12),
    gap: rs(10),
  },
  joinBtn: {
    flex: 1,
    backgroundColor: '#f59e0b',
    borderRadius: rs(24),
    paddingVertical: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinBtnText: {
    color: '#ffffff',
    fontFamily: 'Inter_700Bold',
    fontSize: rs(14),
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(24),
    paddingVertical: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: rs(6),
  },
  shareBtnText: {
    color: '#374151',
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(14),
  },
  shareIcon: {
    width: rs(15),
    height: rs(15),
    tintColor: '#4b5563',
  },
  sectionContainer: {
    marginHorizontal: rs(16),
    marginTop: rs(22),
  },
  sectionHeading: {
    fontSize: rs(17),
    fontFamily: 'Inter_700Bold',
    color: '#111827',
    marginBottom: rs(10),
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  aboutDesc: {
    fontSize: rs(13.5),
    fontFamily: 'Inter_400Regular',
    color: '#4b5563',
    lineHeight: rs(20),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(8),
    marginTop: rs(12),
  },
  tagPill: {
    backgroundColor: '#fef3c7',
    borderRadius: rs(16),
    paddingHorizontal: rs(14),
    paddingVertical: rs(6),
  },
  tagText: {
    color: '#b45309',
    fontSize: rs(12.5),
    fontFamily: 'Inter_600SemiBold',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  eventThumb: {
    width: rs(58),
    height: rs(58),
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
    marginBottom: rs(4),
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(2),
  },
  eventIconSmall: {
    width: rs(12),
    height: rs(12),
    marginRight: rs(6),
    tintColor: '#6b7280',
  },
  eventMetaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(14),
    marginBottom: rs(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(10),
  },
  authorAvatarWrap: {
    width: rs(38),
    height: rs(38),
    borderRadius: rs(19),
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
    fontSize: rs(13.5),
    color: '#111827',
  },
  postTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(11.5),
    color: '#9ca3af',
    marginTop: rs(1),
  },
  postContent: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(13),
    color: '#374151',
    lineHeight: rs(18.5),
    marginBottom: rs(10),
  },
  postGrid: {
    flexDirection: 'row',
    gap: rs(8),
    marginBottom: rs(10),
  },
  postGridImg: {
    flex: 1,
    height: rs(110),
    borderRadius: rs(12),
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(16),
  },
  postActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(5),
  },
  postActionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12.5),
    color: '#6b7280',
  },
  commentIcon: {
    width: rs(16),
    height: rs(16),
    tintColor: '#6b7280',
  },
  readFullPostsBtn: {
    marginVertical: rs(10),
    alignItems: 'center',
  },
  readFullPostsText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(13.5),
    color: '#ea580c',
  },
  activeMembersCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    paddingVertical: rs(14),
    paddingHorizontal: rs(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  rulesCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: rs(16),
  },
  ruleBadge: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(12),
    marginTop: rs(2),
  },
  ruleBadgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(13),
    color: '#b45309',
  },
  ruleContent: {
    flex: 1,
  },
  ruleTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(14),
    color: '#111827',
    marginBottom: rs(2),
  },
  ruleDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12.5),
    color: '#6b7280',
    lineHeight: rs(18),
  },
});
