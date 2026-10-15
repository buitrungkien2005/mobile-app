import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import InviteFriendsModal from '../../components/InviteFriendsModal';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function UpdateExplorerScreen() {
  const router = useRouter();
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);

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

        {/* Top Navigation Row (Positioned below status bar & top wave) */}
        <View style={styles.headerTop}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/discover');
              }
            }} 
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={rs(22)} color="#1e1810" />
          </TouchableOpacity>

          {/* Screen Title */}
          <Text style={styles.headerTitle}>View Community</Text>

          {/* Header Right Logo/Bookmark */}
          <View style={styles.headerRight}>
            <Image 
              source={require('../../../assets/images/explorer_logo.png')} 
              style={styles.headerLogo} 
              resizeMode="contain" 
            />
          </View>
        </View>
      </View>

      {/* SCROLLABLE MAIN CONTENT (Matching Content.png) */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: Yellow Hero Banner ("Create your own Nest!") */}
        <View style={styles.heroBanner}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Create your own Nest!</Text>
            <Text style={styles.heroDesc}>
              With your Explorer tier, you can run up to 2 active communities with custom tags.
            </Text>
          </View>
          <TouchableOpacity style={styles.startBtn} activeOpacity={0.85}>
            <Text style={styles.startBtnText}>Start</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 2: Upgrade Promo Card ("Upgrade for More Buddy Features") */}
        <View style={styles.upgradeCard}>
          <Text style={styles.upgradeCardTitle}>Upgrade for More Buddy Features</Text>

          {/* Feature 1 */}
          <View style={styles.featureItemRow}>
            <Image 
              source={require('../../../assets/images/lock4.png')} 
              style={styles.featureIcon} 
              resizeMode="contain" 
            />
            <Text style={styles.featureItemText}>Create your own community groups</Text>
          </View>

          {/* Feature 2 */}
          <View style={styles.featureItemRow}>
            <Image 
              source={require('../../../assets/images/lock4.png')} 
              style={styles.featureIcon} 
              resizeMode="contain" 
            />
            <Text style={styles.featureItemText}>Advanced buddy matchmaking filters</Text>
          </View>

          {/* Feature 3 */}
          <View style={styles.featureItemRow}>
            <Image 
              source={require('../../../assets/images/lock4.png')} 
              style={styles.featureIcon} 
              resizeMode="contain" 
            />
            <Text style={styles.featureItemText}>Access exclusive private circles & networks</Text>
          </View>

          {/* Upgrade CTA Button */}
          <TouchableOpacity 
            style={styles.upgradeBtn} 
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/explorer-checkout')}
          >
            <Text style={styles.upgradeBtnText}>Upgrade to Explorer</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 3: Exclusive Community Card ("Alpine Peak Walkers") */}
        <View style={styles.alpineCard}>
          <Image 
            source={require('../../../assets/images/Alpine.png')} 
            style={styles.alpineCover} 
            resizeMode="cover" 
          />
          <View style={styles.alpineCardBody}>
            {/* Title & Verified Badge Row */}
            <View style={styles.alpineHeaderRow}>
              <Text style={styles.alpineTitle}>Alpine Peak Walkers</Text>
              <View style={styles.verifiedBadge}>
                <Image 
                  source={require('../../../assets/images/VerifiedBadge.png')} 
                  style={styles.verifiedBadgeIcon} 
                  resizeMode="contain" 
                />
                <Text style={styles.verifiedBadgeText}>Verified Community</Text>
              </View>
            </View>

            {/* Tags & Rating Row */}
            <View style={styles.alpineTagsRow}>
              <View style={styles.exclusiveBadge}>
                <Text style={styles.exclusiveBadgeText}>Exclusive</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Image 
                  source={require('../../../assets/images/star.png')} 
                  style={styles.starIcon} 
                  resizeMode="contain" 
                />
                <Text style={styles.ratingText}>4.9 Rating</Text>
              </View>
            </View>

            {/* Unlock & Join Button */}
            <TouchableOpacity 
              style={styles.unlockJoinBtn} 
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/explorer-checkout')}
            >
              <Text style={styles.unlockJoinBtnText}>Unlock & Join</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 4: Public Communities Title */}
        <Text style={styles.publicSectionTitle}>Public communities for you</Text>

        {/* Saigon Foodies Trail Card */}
        <View style={styles.saigonCard}>
          <Image 
            source={require('../../../assets/images/Saigon.png')} 
            style={styles.saigonCover} 
            resizeMode="cover" 
          />
          <View style={styles.saigonCardBody}>
            <Text style={styles.saigonTitle}>Saigon Foodies Trail</Text>
            <Text style={styles.saigonDesc}>
              Unlocking HCMC's culinary secrets together on weekends
            </Text>
            <View style={styles.foodTag}>
              <Text style={styles.foodTagText}>Food & Drink</Text>
            </View>
          </View>
        </View>

        {/* SECTION 5: Saigon Coffee Roasters (With Full Landscape Cover Photo from Content.png) */}
        <View style={styles.coffeeCard}>
          {/* Landscape Cover Photo */}
          <Image 
            source={require('../../../assets/images/CoverPhoto-CoffeeRoasters.png')} 
            style={styles.coffeeCover} 
            resizeMode="cover" 
          />

          <View style={styles.coffeeCardBody}>
            {/* Title & Buddy + Badge Row */}
            <View style={styles.coffeeHeaderRow}>
              <Text style={styles.coffeeTitle}>Saigon Coffee Roasters</Text>
              <View style={styles.buddyBadge}>
                <Text style={styles.buddyBadgeText}>Buddy +</Text>
              </View>
            </View>

            {/* Members & Privacy Meta */}
            <Text style={styles.coffeeMeta}>1 member (You) • Private Circle</Text>

            {/* Description */}
            <Text style={styles.coffeeDesc}>
              A space for coffee nerds in Saigon to discuss slow drip, roasting profiles & origin beans.
            </Text>
          </View>
        </View>

        {/* STANDALONE ACTION BUTTONS (Outside Saigon Coffee Roasters card) */}
        <TouchableOpacity 
          style={styles.inviteBtn} 
          activeOpacity={0.85}
          onPress={() => setInviteModalVisible(true)}
        >
          <Text style={styles.inviteBtnText}>Invite Members</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.goToCommunityBtn} 
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/see-all-communities')}
        >
          <Text style={styles.goToCommunityBtnText}>Go to Community</Text>
        </TouchableOpacity>

        {/* Bottom padding for TabBar and Floating Mascot */}
        <View style={{ height: TABBAR_HEIGHT + rs(75) }} />
      </ScrollView>

      {/* FLOATING AISUP MASCOT */}

      <TabBarMenu activeTab="discover" />

      <AISup />

      {/* INVITE FRIENDS MODAL */}
      <InviteFriendsModal 
        visible={isInviteModalVisible}
        onClose={() => setInviteModalVisible(false)}
        communityTitle="Saigon Coffee Roasters"
      />
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
    opacity: 0.25,
  },
  fixedHeaderArea: {
    backgroundColor: '#ffffff',
    height: rs(118),
    zIndex: 10,
    elevation: 3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  headerTop: {
    position: 'absolute',
    bottom: rs(8),
    left: 0,
    right: 0,
    height: rs(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
  },
  backButton: {
    width: rs(36),
    height: rs(36),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(32),
    lineHeight: rs(34),
    color: '#1e1810',
    flex: 1,
    marginLeft: rs(4),
  },
  headerRight: {
    width: rs(36),
    height: rs(36),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerLogo: {
    width: rs(26),
    height: rs(38),
  },

  // SCROLL CONTENT
  scrollContent: {
    paddingHorizontal: rs(16),
    paddingTop: rs(14),
  },

  // SECTION 1: HERO BANNER
  heroBanner: {
    backgroundColor: '#ffb800',
    borderRadius: rs(16),
    paddingHorizontal: rs(16),
    paddingVertical: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  heroTextWrap: {
    flex: 1,
    paddingRight: rs(12),
  },
  heroTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(26),
    lineHeight: rs(26),
    color: '#1e1810',
  },
  heroDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    lineHeight: rs(16),
    color: '#1e1810',
    marginTop: rs(3),
  },
  startBtn: {
    backgroundColor: '#1e1810',
    paddingHorizontal: rs(16),
    paddingVertical: rs(7),
    borderRadius: rs(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(12),
    color: '#ffffff',
  },

  // SECTION 2: UPGRADE CARD
  upgradeCard: {
    backgroundColor: '#fffdf8',
    borderRadius: rs(18),
    borderWidth: 1,
    borderColor: '#f2ece0',
    paddingHorizontal: rs(16),
    paddingVertical: rs(16),
    marginBottom: rs(18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  upgradeCardTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(26),
    lineHeight: rs(26),
    color: '#1e1810',
    marginBottom: rs(14),
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(11),
  },
  featureIcon: {
    width: rs(14),
    height: rs(14),
    marginRight: rs(10),
  },
  featureItemText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(13),
    color: '#1e1810',
    flex: 1,
  },
  upgradeBtn: {
    backgroundColor: '#ffbb00',
    borderRadius: rs(22),
    height: rs(44),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(10),
  },
  upgradeBtnText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(15),
    color: '#ffffff',
  },

  // SECTION 3: ALPINE CARD
  alpineCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(18),
    borderWidth: 1,
    borderColor: '#efeae0',
    overflow: 'hidden',
    marginBottom: rs(18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  alpineCover: {
    width: '100%',
    height: rs(102),
  },
  alpineCardBody: {
    padding: rs(14),
  },
  alpineHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alpineTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#1e1810',
  },
  verifiedBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    borderRadius: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
  },
  verifiedBadgeIcon: {
    width: rs(12),
    height: rs(12),
  },
  verifiedBadgeText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(10),
    color: '#2e7d32',
  },
  alpineTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
    marginTop: rs(6),
    marginBottom: rs(12),
  },
  exclusiveBadge: {
    backgroundColor: '#fff4d9',
    paddingHorizontal: rs(8),
    paddingVertical: rs(2),
    borderRadius: rs(8),
  },
  exclusiveBadgeText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(11),
    color: '#b45309',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
  },
  starIcon: {
    width: rs(11),
    height: rs(11),
  },
  ratingText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(11),
    color: '#1e1810',
  },
  unlockJoinBtn: {
    backgroundColor: '#ffb800',
    borderRadius: rs(16),
    height: rs(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockJoinBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    color: '#1e1810',
  },

  // SECTION 4: PUBLIC COMMUNITIES
  publicSectionTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(26),
    lineHeight: rs(26),
    color: '#1e1810',
    marginTop: rs(6),
    marginBottom: rs(10),
  },
  saigonCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#efeae0',
    overflow: 'hidden',
    marginBottom: rs(18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  saigonCover: {
    width: '100%',
    height: rs(100),
  },
  saigonCardBody: {
    padding: rs(14),
  },
  saigonTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#1e1810',
  },
  saigonDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#4b5563',
    marginTop: rs(3),
  },
  foodTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: rs(8),
    paddingVertical: rs(2),
    borderRadius: rs(8),
    alignSelf: 'flex-start',
    marginTop: rs(8),
  },
  foodTagText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(10.5),
    color: '#374151',
  },

  // SECTION 5: COFFEE CARD (SAIGON COFFEE ROASTERS)
  coffeeCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#efeae0',
    overflow: 'hidden',
    marginBottom: rs(18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  coffeeCover: {
    width: '100%',
    height: rs(125),
  },
  coffeeCardBody: {
    padding: rs(14),
  },
  coffeeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coffeeTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#1e1810',
  },
  buddyBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    borderRadius: rs(10),
  },
  buddyBadgeText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(10),
    color: '#d97706',
  },
  coffeeMeta: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(11),
    color: '#6b7280',
    marginTop: rs(4),
  },
  coffeeDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    lineHeight: rs(16),
    color: '#4b5563',
    marginTop: rs(8),
    marginBottom: rs(2),
  },
  inviteBtn: {
    backgroundColor: '#ffbb00',
    borderRadius: rs(22),
    height: rs(45),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(12),
  },
  inviteBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#ffffff',
  },
  goToCommunityBtn: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(22),
    height: rs(44),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(12),
  },
  goToCommunityBtnText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(15),
    color: '#374151',
  },
});
