import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Modal,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import InviteFriendsModal from '../../components/InviteFriendsModal';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function AlpineTrailBuddiesScreen() {
  const router = useRouter();

  // State
  const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'members'>('feed');
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isManageModalVisible, setManageModalVisible] = useState(false);

  // Handle hardware back on Android
  useEffect(() => {
    const backAction = () => {
      router.replace('/(tabs)/search-buddy');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Watermark Pattern */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      {/* FIXED TOP HEADER */}
      <View style={styles.fixedHeaderArea}>
        {/* Top Wave Overlay */}
        <Image 
          source={require('../../../assets/images/Lop phu tren.png')} 
          style={styles.overlay} 
          resizeMode="cover" 
        />

        {/* Top Navigation Row */}
        <View style={styles.headerTop}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.replace('/(tabs)/search-buddy')} 
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={rs(22)} color="#1e1810" />
          </TouchableOpacity>

          {/* Screen Title */}
          <Text style={styles.headerTitle}>Your community</Text>
        </View>
      </View>

      {/* SCROLLABLE MAIN CONTENT */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: Live Success Banner */}
        <View style={styles.liveBanner}>
          <View style={styles.bannerCheckCircle}>
            <Ionicons name="checkmark" size={rs(13)} color="#16a34a" />
          </View>
          <Text style={styles.liveBannerText}>
            Your Nest is live! Let the adventures begin!
          </Text>
        </View>

        {/* SECTION 2: Hero Section (Cover, Avatar, Community Info) */}
        <View style={styles.heroSection}>
          {/* Cover Photo */}
          <View style={styles.coverWrapper}>
            <Image 
              source={require('../../../assets/images/Alpine.png')} 
              style={styles.coverImage} 
              resizeMode="cover" 
            />
          </View>

          {/* Avatar & Title Row */}
          <View style={styles.profileHeaderRow}>
            <View style={styles.avatarContainer}>
              <Image 
                source={require('../../../assets/images/Alpine.png')} 
                style={styles.avatarImage} 
                resizeMode="cover" 
              />
            </View>

            <View style={styles.titleArea}>
              <Text style={styles.communityTitle}>Alpine Trail Buddies</Text>
              
              {/* Creator / Admin Badge */}
              <View style={styles.creatorBadge}>
                <Ionicons name="shield-checkmark" size={rs(11)} color="#b45309" style={{ marginRight: rs(3) }} />
                <Text style={styles.creatorBadgeText}>You're the creator · Admin</Text>
              </View>
            </View>
          </View>

          {/* Metadata Badges Row */}
          <View style={styles.metaBadgesRow}>
            <View style={styles.metaBadge}>
              <Ionicons name="globe-outline" size={rs(12)} color="#4b5563" style={{ marginRight: rs(4) }} />
              <Text style={styles.metaBadgeText}>Public</Text>
            </View>

            <View style={styles.metaBadge}>
              <Ionicons name="walk-outline" size={rs(12)} color="#4b5563" style={{ marginRight: rs(4) }} />
              <Text style={styles.metaBadgeText}>Hiking</Text>
            </View>

            <View style={styles.metaBadge}>
              <Ionicons name="person-outline" size={rs(12)} color="#4b5563" style={{ marginRight: rs(4) }} />
              <Text style={styles.metaBadgeText}>1 member (You)</Text>
            </View>
          </View>

          {/* Location Row */}
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={rs(14)} color="#9ca3af" style={{ marginRight: rs(4) }} />
            <Text style={styles.locationText}>Chamonix, France</Text>
          </View>

          {/* Description */}
          <Text style={styles.descriptionText}>
            Easy trails, fresh air and good company. A welcoming space for weekend walks around Chamonix.
          </Text>

          {/* Action Buttons Row: Manage & Invite Members */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity 
              style={styles.manageBtn}
              onPress={() => setManageModalVisible(true)}
              activeOpacity={0.85}
            >
              <Ionicons name="settings-outline" size={rs(15)} color="#ffffff" style={{ marginRight: rs(6) }} />
              <Text style={styles.manageBtnText}>Manage</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.inviteBtn}
              onPress={() => setInviteModalVisible(true)}
              activeOpacity={0.85}
            >
              <Ionicons name="person-add-outline" size={rs(15)} color="#ffffff" style={{ marginRight: rs(6) }} />
              <Text style={styles.inviteBtnText}>Invite members</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 3: Tabs Navigation (Feed, Events, Members) */}
        <View style={styles.tabsNavRow}>
          <TouchableOpacity 
            style={[styles.tabNavItem, activeTab === 'feed' && styles.tabNavItemActive]}
            onPress={() => setActiveTab('feed')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabNavText, activeTab === 'feed' && styles.tabNavTextActive]}>
              Feed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabNavItem, activeTab === 'events' && styles.tabNavItemActive]}
            onPress={() => setActiveTab('events')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabNavText, activeTab === 'events' && styles.tabNavTextActive]}>
              Events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabNavItem, activeTab === 'members' && styles.tabNavItemActive]}
            onPress={() => setActiveTab('members')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabNavText, activeTab === 'members' && styles.tabNavTextActive]}>
              Members
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 4: Onboarding Checklist ("Make this Nest your own") */}
        <View style={styles.checklistCard}>
          <View style={styles.checklistHeaderRow}>
            <Text style={styles.checklistTitle}>Make this Nest your own</Text>
            <View style={styles.donePill}>
              <Text style={styles.donePillText}>1 of 3 done</Text>
            </View>
          </View>

          {/* Checklist Items */}
          <View style={styles.checklistItems}>
            {/* Item 1: Community details added (Done) */}
            <View style={styles.checklistItem}>
              <View style={styles.doneCheckCircle}>
                <Ionicons name="checkmark" size={rs(13)} color="#ffffff" />
              </View>
              <View style={styles.checkItemContent}>
                <Text style={styles.checkItemTitleDone}>Community details added</Text>
              </View>
            </View>

            {/* Item 2: Invite your first trail buddies */}
            <TouchableOpacity 
              style={styles.checklistItem}
              onPress={() => setInviteModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.pendingStepCircle}>
                <Text style={styles.pendingStepNumber}>2</Text>
              </View>
              <View style={styles.checkItemContent}>
                <Text style={styles.checkItemTitle}>Invite your first trail buddies</Text>
                <Text style={styles.checkItemSubtitle}>
                  Share your Nest with friends who love the outdoors.
                </Text>
              </View>
            </TouchableOpacity>

            {/* Item 3: Plan your first walk */}
            <View style={styles.checklistItem}>
              <View style={styles.pendingStepCircle}>
                <Text style={styles.pendingStepNumber}>3</Text>
              </View>
              <View style={styles.checkItemContent}>
                <Text style={styles.checkItemTitle}>Plan your first walk</Text>
                <Text style={styles.checkItemSubtitle}>
                  Pick a trail and give everyone a date to look forward to.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 5: Feed Empty State */}
        <View style={styles.feedEmptyCard}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="chatbubble-ellipses-outline" size={rs(24)} color="#f59e0b" />
          </View>

          <Text style={styles.emptyTitle}>Every adventure starts with a hello</Text>
          <Text style={styles.emptySubtitle}>
            No posts yet. Introduce yourself and share the kind of walks you'd love to plan.
          </Text>

          <TouchableOpacity 
            style={styles.welcomePostBtn}
            onPress={() => router.push('/(tabs)/up-post')}
            activeOpacity={0.85}
          >
            <Ionicons name="create-outline" size={rs(16)} color="#ffffff" style={{ marginRight: rs(6) }} />
            <Text style={styles.welcomePostBtnText}>Write a welcome post</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding for TabBar and Floating Mascot */}
        <View style={{ height: TABBAR_HEIGHT + rs(65) }} />
      </ScrollView>

      {/* FLOATING AISUP MASCOT */}
      <AISup />

      {/* TABBAR MENU */}
      <TabBarMenu activeTab="discover" />

      {/* INVITE FRIENDS MODAL */}
      <InviteFriendsModal 
        visible={isInviteModalVisible}
        onClose={() => setInviteModalVisible(false)}
        communityTitle="Alpine Trail Buddies"
      />

      {/* MANAGE NEST MODAL */}
      <Modal
        visible={isManageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setManageModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setManageModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.manageModalCard}>
                <View style={styles.manageModalHeader}>
                  <Text style={styles.manageModalTitle}>Manage Nest</Text>
                  <TouchableOpacity onPress={() => setManageModalVisible(false)}>
                    <Ionicons name="close" size={rs(20)} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.manageOptionRow} activeOpacity={0.7}>
                  <Ionicons name="create-outline" size={rs(18)} color="#4b5563" style={{ marginRight: rs(10) }} />
                  <Text style={styles.manageOptionText}>Edit Community Info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.manageOptionRow} activeOpacity={0.7}>
                  <Ionicons name="image-outline" size={rs(18)} color="#4b5563" style={{ marginRight: rs(10) }} />
                  <Text style={styles.manageOptionText}>Change Cover & Avatar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.manageOptionRow} activeOpacity={0.7}>
                  <Ionicons name="shield-outline" size={rs(18)} color="#4b5563" style={{ marginRight: rs(10) }} />
                  <Text style={styles.manageOptionText}>Privacy & Permissions</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.manageOptionRow, { borderBottomWidth: 0 }]} 
                  onPress={() => setManageModalVisible(false)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="checkmark-circle-outline" size={rs(18)} color="#22c55e" style={{ marginRight: rs(10) }} />
                  <Text style={[styles.manageOptionText, { color: '#22c55e', fontWeight: 'bold' }]}>Done</Text>
                </TouchableOpacity>
              </View>
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
    width: '100%',
    height: '100%',
    opacity: 0.35,
  },

  /* FIXED TOP HEADER */
  fixedHeaderArea: {
    position: 'relative',
    width: '100%',
    height: OVERLAY_HEIGHT + rs(55),
    zIndex: 10,
    backgroundColor: 'transparent',
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
    paddingHorizontal: rs(20),
    paddingTop: rs(72),
  },
  backButton: {
    width: rs(36),
    height: rs(36),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(8),
  },
  headerTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(20),
    color: '#1e1810',
  },

  /* SCROLL CONTENT */
  scrollContent: {
    paddingHorizontal: rs(16),
    paddingTop: rs(10),
  },

  /* SECTION 1: Live Banner */
  liveBanner: {
    backgroundColor: '#f0fdf4',
    borderRadius: rs(14),
    borderWidth: 1,
    borderColor: '#bbf7d0',
    paddingVertical: rs(10),
    paddingHorizontal: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
  },
  bannerCheckCircle: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  liveBannerText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    color: '#166534',
    flex: 1,
  },

  /* SECTION 2: Hero Section */
  heroSection: {
    backgroundColor: '#ffffff',
    borderRadius: rs(20),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    padding: rs(14),
    marginBottom: rs(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  coverWrapper: {
    width: '100%',
    height: rs(125),
    borderRadius: rs(14),
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -rs(20),
    paddingHorizontal: rs(4),
  },
  avatarContainer: {
    width: rs(58),
    height: rs(58),
    borderRadius: rs(29),
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#ffedd5',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  titleArea: {
    marginLeft: rs(10),
    marginTop: rs(18),
    flex: 1,
  },
  communityTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17.5),
    color: '#111827',
  },
  creatorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: rs(8),
    paddingVertical: rs(2.5),
    borderRadius: rs(10),
    alignSelf: 'flex-start',
    marginTop: rs(3),
  },
  creatorBadgeText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(11),
    color: '#b45309',
  },
  metaBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(6),
    marginTop: rs(14),
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: rs(10),
    paddingVertical: rs(4),
    borderRadius: rs(12),
  },
  metaBadgeText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(12),
    color: '#4b5563',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(8),
  },
  locationText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#6b7280',
  },
  descriptionText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#4b5563',
    lineHeight: rs(18),
    marginTop: rs(10),
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: rs(10),
    marginTop: rs(14),
  },
  manageBtn: {
    flex: 1,
    height: rs(42),
    backgroundColor: '#1f1f1f',
    borderRadius: rs(21),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manageBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
    color: '#ffffff',
  },
  inviteBtn: {
    flex: 1,
    height: rs(42),
    backgroundColor: '#ffaa00',
    borderRadius: rs(21),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
    color: '#ffffff',
  },

  /* SECTION 3: Tabs Navigation */
  tabsNavRow: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#f1f5f9',
    marginBottom: rs(14),
  },
  tabNavItem: {
    paddingVertical: rs(10),
    marginRight: rs(24),
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
    marginBottom: -1.5,
  },
  tabNavItemActive: {
    borderBottomColor: '#ffaa00',
  },
  tabNavText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(15),
    color: '#6b7280',
  },
  tabNavTextActive: {
    fontFamily: 'AfacadFlux_700Bold',
    color: '#111827',
  },

  /* SECTION 4: Onboarding Checklist */
  checklistCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(18),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    padding: rs(16),
    marginBottom: rs(14),
  },
  checklistHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(14),
  },
  checklistTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#111827',
  },
  donePill: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    borderRadius: rs(10),
  },
  donePillText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(11),
    color: '#b45309',
  },
  checklistItems: {
    gap: rs(12),
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  doneCheckCircle: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
    marginTop: rs(2),
  },
  checkItemContent: {
    flex: 1,
  },
  checkItemTitleDone: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13.5),
    color: '#6b7280',
    textDecorationLine: 'line-through',
    marginTop: rs(2),
  },
  pendingStepCircle: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    backgroundColor: '#f9fafb',
    borderWidth: 1.2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
    marginTop: rs(2),
  },
  pendingStepNumber: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(11.5),
    color: '#4b5563',
  },
  checkItemTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13.5),
    color: '#111827',
  },
  checkItemSubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    marginTop: rs(1),
    lineHeight: rs(16),
  },

  /* SECTION 5: Feed Empty State */
  feedEmptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(18),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    paddingVertical: rs(20),
    paddingHorizontal: rs(16),
    alignItems: 'center',
    marginBottom: rs(16),
  },
  emptyIconCircle: {
    width: rs(46),
    height: rs(46),
    borderRadius: rs(23),
    backgroundColor: '#fffbeb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(8),
  },
  emptyTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15.5),
    color: '#111827',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(17),
    marginTop: rs(4),
    marginBottom: rs(14),
    paddingHorizontal: rs(10),
  },
  welcomePostBtn: {
    backgroundColor: '#ffaa00',
    paddingVertical: rs(9),
    paddingHorizontal: rs(20),
    borderRadius: rs(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomePostBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13.5),
    color: '#ffffff',
  },

  /* MANAGE MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rs(24),
  },
  manageModalCard: {
    width: '100%',
    maxWidth: rs(300),
    backgroundColor: '#ffffff',
    borderRadius: rs(20),
    padding: rs(18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  manageModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(14),
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: rs(10),
  },
  manageModalTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17),
    color: '#111827',
  },
  manageOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(10),
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  manageOptionText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(14),
    color: '#374151',
  },
});
