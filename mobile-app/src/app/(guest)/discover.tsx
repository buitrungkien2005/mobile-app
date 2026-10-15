import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  TextInput,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import GuestTabBarMenu from '../../components/GuestTabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 55;

interface BuddyProfile {
  id: string;
  name: string;
  location: string;
  avatar: any;
  avatarResizeMode?: 'cover' | 'contain';
  zodiac: {
    symbol: string;
    name: string;
  };
  tags: string[];
  bio: string;
}

const BUDDY_PROFILES: BuddyProfile[] = [
  {
    id: '1',
    name: 'Daniel, 35',
    location: 'District 1, Ho Chi Minh City',
    avatar: require('../../../assets/images/MinhTran_Avatar.png'),
    avatarResizeMode: 'cover',
    zodiac: { symbol: '♌', name: 'Leo' },
    tags: ['ENFP', '🎨 Design', '📷 Photography', '☕ Coffee'],
    bio: "I'm a 3rd-year Graphic Design student. Would love to find teammates who share a passion for photography and enjoy weekend coffee trips! ☕📷"
  },
  {
    id: '2',
    name: 'Tran Hoang Nam, 22',
    location: 'Cau Giay, Hanoi',
    avatar: require('../../../assets/images/Avatar_MinhTran.png'),
    avatarResizeMode: 'contain',
    zodiac: { symbol: '♏', name: 'Scorpio' },
    tags: ['INTJ', '💻 Coding', '🎮 Gaming', '⚡ Projects'],
    bio: "A junior coder who loves conquering challenges. Looking for buddies to team up on a React Native capstone project or climb the LoL ranks together! 💻🎮"
  },
  {
    id: '3',
    name: 'Le Mai Chi, 20',
    location: 'Hai Chau, Da Nang',
    avatar: require('../../../assets/images/avatar_v3_Clover.png'),
    avatarResizeMode: 'contain',
    zodiac: { symbol: '♓', name: 'Pisces' },
    tags: ['INFJ', '📝 Writing', '🎸 Guitar', '🏄 Travel'],
    bio: "I enjoy writing, chilling with acoustic guitar, and watching the sunset by the Da Nang beach. Looking for someone who shares a love for life's simple stories."
  },
  {
    id: '4',
    name: 'Pham Quoc Bao, 23',
    location: 'Ninh Kieu, Can Tho',
    avatar: require('../../../assets/images/avatar_v3_Sunny.png'),
    avatarResizeMode: 'contain',
    zodiac: { symbol: '♈', name: 'Aries' },
    tags: ['ESFP', '✍️ Content', '🍲 Food', '🚀 Creative'],
    bio: "An energetic content creator. Passionate about Western Vietnamese cuisine and evening strolls along the Ninh Kieu wharf. Let's connect if you want to explore Can Tho!"
  }
];

export default function GuestDiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

  const categories = ['All', 'Hobbies', 'Career', 'Personality', 'MBTI', 'Zodiac'];

  const openSignInModal = () => setIsSignInModalVisible(true);
  const closeSignInModal = () => setIsSignInModalVisible(false);

  // Filter profiles based on search query
  const filteredProfiles = BUDDY_PROFILES.filter(profile => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(query) ||
      profile.location.toLowerCase().includes(query) ||
      profile.bio.toLowerCase().includes(query) ||
      profile.tags.some(t => t.toLowerCase().includes(query)) ||
      profile.zodiac.name.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <Image 
        source={require('../../../assets/images/hex_bg.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header Wave Overlay */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../../assets/images/Lop_phu_tren_profiel.png')} 
            style={styles.overlay} 
            resizeMode="cover" 
          />
          
          <View style={styles.headerContent}>
            {/* Top Row: Logo & Filter / Setting */}
            <View style={styles.topRow}>
              <Image 
                source={require('../../../assets/images/logo.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />

              {/* Nút setting trên header: Mở modal Sign in */}
              <TouchableOpacity 
                style={styles.filterBtn} 
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Ionicons name="options-outline" size={rs(22)} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={rs(20)} color="#9ca3af" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search for friends..." 
              placeholderTextColor="#9ca3af" 
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Category Chips Section */}
        <View style={styles.categorySection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Buddy Cards Section */}
        <View style={styles.cardsContainer}>
          {filteredProfiles.map((buddy) => (
            <View key={buddy.id} style={styles.buddyCard}>
              {/* Header: Avatar, Name, Location & Heart */}
              <View style={styles.cardHeader}>
                <Image 
                  source={buddy.avatar} 
                  style={styles.avatar} 
                  resizeMode={buddy.avatarResizeMode || 'contain'} 
                />
                <View style={styles.metaInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.userName}>{buddy.name}</Text>
                    {/* Huy hiệu tích vàng verified.png */}
                    <Image 
                      source={require('../../../assets/images/verified.png')} 
                      style={styles.verifiedBadge} 
                      resizeMode="contain" 
                    />
                  </View>
                  <Text style={styles.userLocation}>{buddy.location}</Text>
                </View>

                {/* Nút icon trái tim: Mở modal Sign in */}
                <TouchableOpacity 
                  onPress={openSignInModal} 
                  activeOpacity={0.8} 
                  style={styles.heartBtn}
                >
                  <Ionicons name="heart-outline" size={rs(22)} color="#4b5563" />
                </TouchableOpacity>
              </View>

              {/* Tags Row */}
              <View style={styles.tagsRow}>
                {/* Zodiac Tag */}
                <View style={styles.zodiacTag}>
                  <View style={styles.zodiacBadge}>
                    <Text style={styles.zodiacSymbol}>{buddy.zodiac.symbol}</Text>
                  </View>
                  <Text style={styles.zodiacText}>{buddy.zodiac.name}</Text>
                </View>

                {/* Standard Tags */}
                {buddy.tags.map((tag, idx) => (
                  <View key={idx} style={styles.grayTag}>
                    <Text style={styles.grayTagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Bio Text */}
              <Text style={styles.bioText}>
                {buddy.bio}
              </Text>

              {/* Divider */}
              <View style={styles.cardDivider} />

              {/* Action Buttons Row */}
              <View style={styles.actionsRow}>
                {/* Nút Message: Mở modal Sign in */}
                <TouchableOpacity 
                  style={styles.messageBtn} 
                  onPress={openSignInModal} 
                  activeOpacity={0.8}
                >
                  <Ionicons name="chatbubble-outline" size={rs(18)} color="#ffb703" style={{ marginRight: rs(6) }} />
                  <Text style={styles.messageBtnText}>Message</Text>
                </TouchableOpacity>

                {/* Nút Add Friend: Mở modal Sign in */}
                <TouchableOpacity 
                  style={styles.addFriendBtn} 
                  onPress={openSignInModal} 
                  activeOpacity={0.8}
                >
                  <Ionicons name="people" size={rs(18)} color="#000000" style={{ marginRight: rs(6) }} />
                  <Text style={styles.addFriendBtnText}>Add Friend</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sign In Required Modal (Chuẩn theo Sign_In_Request.png) */}
      <Modal
        visible={isSignInModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSignInModal}
      >
        <TouchableWithoutFeedback onPress={closeSignInModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.signInCard}>
                <Text style={styles.signInTitle}>Sign in required</Text>
                <Text style={styles.signInDesc}>
                  Log in or create an account{'\n'}to comment and share.
                </Text>
                <TouchableOpacity
                  style={styles.signInBtn}
                  onPress={() => {
                    closeSignInModal();
                    router.replace('/(auth)/login');
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signInBtnText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Guest TabBar with Discover Active */}
      <GuestTabBarMenu activeTab="discover" />

      {/* Floating Bee AI (TOPMOST LAYER) */}
      <AISup isGuest={true} />
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
    opacity: 0.5,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT + rs(60),
    marginBottom: rs(0),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  headerContent: {
    paddingHorizontal: rs(20),
    paddingTop: rs(75),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rs(48),
  },
  logo: {
    width: rs(32),
    height: rs(50),
  },
  filterBtn: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(14),
    backgroundColor: '#ffffff',
    borderWidth: 1.2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(1) },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  /* Search Section */
  searchSection: {
    paddingHorizontal: rs(16),
    marginTop: rs(16),
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    borderWidth: 1.2,
    borderColor: '#e5e7eb',
    height: rs(46),
    paddingHorizontal: rs(16),
  },
  searchIcon: {
    marginRight: rs(10),
  },
  searchInput: {
    flex: 1,
    fontSize: rs(15),
    color: '#111827',
    fontFamily: 'AfacadFlux_400Regular',
    height: '100%',
  },

  /* Category Section */
  categorySection: {
    marginTop: rs(14),
  },
  categoryScroll: {
    paddingHorizontal: rs(16),
    gap: rs(8),
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: rs(16),
    paddingVertical: rs(7),
    borderRadius: rs(14),
    backgroundColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: '#ffb703',
  },
  categoryText: {
    fontSize: rs(14),
    color: '#4b5563',
    fontFamily: 'AfacadFlux_600SemiBold',
  },
  categoryTextActive: {
    color: '#ffffff',
    fontFamily: 'AfacadFlux_700Bold',
  },

  /* Cards Section */
  cardsContainer: {
    paddingHorizontal: rs(16),
    marginTop: rs(16),
  },
  buddyCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    padding: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(26),
    borderWidth: 2,
    borderColor: '#ffb703',
  },
  metaInfo: {
    flex: 1,
    marginLeft: rs(12),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17.5),
    color: '#111827',
  },
  verifiedBadge: {
    width: rs(15),
    height: rs(15),
    marginLeft: rs(5),
  },
  userLocation: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#6b7280',
    marginTop: rs(2),
  },
  heartBtn: {
    padding: rs(6),
  },

  /* Tags */
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(6),
    marginTop: rs(12),
  },
  zodiacTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef9c3',
    paddingHorizontal: rs(8),
    paddingVertical: rs(4.5),
    borderRadius: rs(10),
  },
  zodiacBadge: {
    width: rs(16),
    height: rs(16),
    borderRadius: rs(4),
    backgroundColor: '#9333ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(4),
  },
  zodiacSymbol: {
    color: '#ffffff',
    fontSize: rs(10),
    fontWeight: 'bold',
  },
  zodiacText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(12),
    color: '#1f2937',
  },
  grayTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: rs(10),
    paddingVertical: rs(5),
    borderRadius: rs(10),
  },
  grayTagText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(12),
    color: '#374151',
  },

  /* Bio */
  bioText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13.5),
    color: '#374151',
    lineHeight: rs(20),
    marginTop: rs(12),
  },

  /* Divider */
  cardDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: rs(14),
  },

  /* Actions */
  actionsRow: {
    flexDirection: 'row',
    gap: rs(12),
  },
  messageBtn: {
    flex: 1,
    height: rs(42),
    borderRadius: rs(21),
    borderWidth: 1.5,
    borderColor: '#ffb703',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14.5),
    color: '#ffb703',
  },
  addFriendBtn: {
    flex: 1,
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: '#ffb703',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFriendBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14.5),
    color: '#000000',
  },

  /* Sign In Required Modal Styles (Sign_In_Request.png) */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInCard: {
    width: rs(230),
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    paddingVertical: rs(18),
    paddingHorizontal: rs(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  signInTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17.5),
    color: '#ffaa00',
    marginBottom: rs(6),
  },
  signInDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: rs(17),
    marginBottom: rs(14),
  },
  signInBtn: {
    backgroundColor: '#ffb703',
    paddingVertical: rs(6),
    paddingHorizontal: rs(28),
    borderRadius: rs(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
    color: '#000000',
  },
});
