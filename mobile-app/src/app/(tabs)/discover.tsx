import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

type ConnectState = 'Connect' | 'Pending' | 'Accept' | 'Connected' | 'Disconnected';

const UserConnectButton = () => {
  const [state, setState] = useState<ConnectState>('Connect');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePress = () => {
    if (state === 'Connect') {
      setState('Pending');
      timerRef.current = setTimeout(() => {
        setState('Accept');
        timerRef.current = setTimeout(() => {
          setState('Connected');
        }, 1500);
      }, 1500);
    } else if (state === 'Connected') {
      setState('Disconnected');
      timerRef.current = setTimeout(() => {
        setState('Connect');
      }, 1500);
    }
  };

  const getStyleOverrides = () => {
    if (state === 'Pending' || state === 'Accept') {
      return {
        btn: { backgroundColor: '#000000' },
        text: { color: '#ffffff' }
      };
    } else if (state === 'Connected') {
      return {
        btn: { backgroundColor: '#000000' },
        text: { color: '#22c55e' } // Green text
      };
    } else if (state === 'Disconnected') {
      return {
        btn: { backgroundColor: '#000000' },
        text: { color: '#ef4444' } // Red text
      };
    }
    return { btn: {}, text: {} };
  };

  const overrides = getStyleOverrides();
  const disabled = state === 'Pending' || state === 'Accept' || state === 'Disconnected';

  return (
    <TouchableOpacity 
      style={[styles.connectBtn, overrides.btn]} 
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={[styles.connectBtnText, overrides.text]}>{state}</Text>
    </TouchableOpacity>
  );
};

export default function DiscoverScreen() {
  const router = useRouter();
  const [selectedChips, setSelectedChips] = useState<string[]>(['All']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['📚 Book Clubs', '💻 Coding']);

  const filterOptions = ['All', 'People', 'Posts', 'Interests', 'Hashtags'];
  const suggestedInterests = [
    '📚 Book Clubs', '🎨 Art & Design', '🏃 Running', '🎸 Music',
    '🍳 Cooking', '💻 Coding', '🧘 Yoga', '🌱 Gardening'
  ];

  const sharedUsers = [
    { name: 'Alex Kim', location: 'Mapo-gu, Seoul', tags: ['💻 Coding', '🎮 Gaming', '🎵 Music'] },
    { name: 'MinhTran', location: 'Cau Giay, Hanoi', tags: ['📷 Photography', '🏃 Running', '☕ Coffee'] },
    { name: 'Sora Park', location: 'Gangnam, Seoul', tags: ['🎨 Design', '📚 Reading', '🧘 Yoga'] },
    { name: 'Yuki Tanaka', location: 'Shibuya, Tokyo', tags: ['🎬 Film', '🍳 Cooking', '✈️ Travel'] },
  ];

  const toggleChip = (chip: string) => {
    if (chip === 'All') {
      setSelectedChips(['All']);
    } else {
      let newSelected = selectedChips.includes(chip) 
        ? selectedChips.filter(c => c !== chip)
        : [...selectedChips.filter(c => c !== 'All'), chip];
      
      if (newSelected.length === 0) newSelected = ['All'];
      setSelectedChips(newSelected);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER SECTION (Fixed) */}
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

            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={rs(20)} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={rs(20)} color="#ffbb00" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search contacts"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Filter Chips */}
        <View style={styles.chipsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
            {filterOptions.map(item => {
              const isActive = selectedChips.includes(item);
              return (
                <TouchableOpacity 
                  key={item} 
                  style={[styles.chip, isActive && styles.chipActive]}
                  onPress={() => toggleChip(item)}
                >
                  <Text style={isActive ? styles.chipTextActive : styles.chipText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Recent Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          {['study buddies in Saigon', 'photography groups', 'weekend hiking'].map((item, idx) => (
            <View key={idx} style={styles.recentItem}>
              <Ionicons name="time-outline" size={rs(20)} color="#6b7280" />
              <Text style={styles.recentText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Suggested Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Interests</Text>
          <View style={styles.suggestedWrap}>
            {suggestedInterests.map(interest => {
              const isActive = selectedInterests.includes(interest);
              return (
                <TouchableOpacity 
                  key={interest} 
                  style={[styles.suggestedPill, isActive && styles.suggestedPillActive]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={styles.suggestedPillText}>{interest}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Trending Hashtags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Hashtags 🔥</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingScroll}>
            <View style={styles.trendingCard}>
              <Text style={styles.trendingTitle}>#StudyBuddies</Text>
              <Text style={styles.trendingSubtitle}>1.2k posts</Text>
            </View>
            <View style={styles.trendingCard}>
              <Text style={styles.trendingTitle}>#BookClub</Text>
              <Text style={styles.trendingSubtitle}>2.1k posts</Text>
            </View>
            <View style={styles.trendingCard}>
              <Text style={styles.trendingTitle}>#WeekendHike</Text>
              <Text style={styles.trendingSubtitle}>890 posts</Text>
            </View>
            <View style={styles.trendingCard}>
              <Text style={styles.trendingTitle}>#CoffeeLover</Text>
              <Text style={styles.trendingSubtitle}>654 posts</Text>
            </View>
          </ScrollView>
        </View>

        {/* People With Shared Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>People With Shared Interests</Text>
          <ScrollView horizontal={false} scrollEnabled={false} contentContainerStyle={{ gap: rs(16) }}>
            {sharedUsers.map((user, idx) => (
              <View key={idx} style={styles.userCard}>
                <View style={styles.userInfoRow}>
                  <Image source={require('../../../assets/images/AvatarBorder.png')} style={styles.sharedAvatar} />
                  <View style={styles.userDetails}>
                    <View style={styles.nameRow}>
                      <Text style={styles.userName}>{user.name}</Text>
                      <Image source={require('../../../assets/images/VerifiedBadge.png')} style={{ width: rs(16), height: rs(16), marginLeft: rs(4) }} resizeMode="contain" />
                    </View>
                    <Text style={styles.userLocation}>{user.location}</Text>
                  </View>
                </View>

                <View style={styles.userTags}>
                  {user.tags.map(tag => (
                    <View key={tag} style={styles.userTag}><Text style={styles.userTagText}>{tag}</Text></View>
                  ))}
                </View>

                <View style={styles.userActions}>
                  <UserConnectButton />
                  <TouchableOpacity style={styles.chatBtn}>
                    <Ionicons name="chatbubble" size={rs(16)} color="#ffbb00" style={{ marginRight: rs(6) }} />
                    <Text style={styles.chatBtnText}>Chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

      {/* TabBar */}
      <TabBarMenu activeTab="discover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
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
    height: rs(46),
    width: rs(30),
  },
  headerRightActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rs(10),
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
    marginLeft: rs(10),
    borderWidth: 2,
    borderColor: '#ffb703',
    overflow: 'hidden',
  },
  headerAvatar: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
  },
  searchSection: {
    paddingHorizontal: rs(20),
    marginTop: rs(20),
    marginBottom: rs(20),
  },
  filterBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginLeft: rs(10),
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    borderWidth: 1,
    borderColor: '#ffbb00',
    height: rs(48),
    paddingHorizontal: rs(16),
  },
  searchIcon: {
    marginRight: rs(10),
  },
  searchInput: {
    flex: 1,
    fontSize: rs(15),
    color: '#111827',
  },
  chipsContainer: {
    marginTop: rs(10),
    marginBottom: rs(20),
  },
  chipsScroll: {
    paddingHorizontal: rs(20),
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: rs(16),
    paddingVertical: rs(8),
    borderRadius: rs(20),
    backgroundColor: '#f9fafb',
    marginRight: rs(10),
  },
  chipActive: {
    backgroundColor: '#ffbb00',
  },
  chipText: {
    fontSize: rs(14),
    color: '#6b7280',
    fontWeight: 'bold',
  },
  chipTextActive: {
    fontSize: rs(14),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: rs(20),
    marginBottom: rs(24),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  sectionTitle: {
    fontSize: rs(16),
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: rs(12),
  },
  clearText: {
    fontSize: rs(14),
    color: '#ffbb00',
    fontWeight: 'bold',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  recentText: {
    fontSize: rs(14),
    color: '#111827',
    marginLeft: rs(10),
    fontWeight: '500',
  },
  suggestedWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(10),
  },
  suggestedPill: {
    paddingHorizontal: rs(14),
    paddingVertical: rs(8),
    borderRadius: rs(20),
    backgroundColor: '#f3f4f6',
  },
  suggestedPillActive: {
    backgroundColor: '#fef3c7',
  },
  suggestedPillText: {
    fontSize: rs(13),
    color: '#111827',
    fontWeight: '500',
  },
  trendingScroll: {
    gap: rs(12),
  },
  trendingCard: {
    backgroundColor: '#fffdf0',
    borderWidth: 1,
    borderColor: '#fef08a',
    borderRadius: rs(12),
    padding: rs(16),
    minWidth: 140,
  },
  trendingTitle: {
    fontSize: rs(14),
    fontWeight: 'bold',
    color: '#b45309',
    marginBottom: rs(4),
  },
  trendingSubtitle: {
    fontSize: rs(12),
    color: '#a16207',
  },
  userCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(20),
    padding: rs(16),
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(16),
  },
  sharedAvatar: {
    width: rs(60),
    height: rs(60),
    marginRight: rs(16),
    resizeMode: 'contain',
  },
  userDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(4),
  },
  userName: {
    fontSize: rs(16),
    fontWeight: 'bold',
    color: '#111827',
  },
  userLocation: {
    fontSize: rs(13),
    color: '#6b7280',
  },
  userTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(8),
    marginBottom: rs(20),
  },
  userTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: rs(12),
    paddingVertical: rs(6),
    borderRadius: rs(16),
  },
  userTagText: {
    fontSize: rs(12),
    color: '#374151',
    fontWeight: '500',
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: rs(12),
  },
  connectBtn: {
    flex: 1,
    backgroundColor: '#ffbb00',
    paddingVertical: rs(12),
    borderRadius: rs(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectBtnText: {
    fontSize: rs(14),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  chatBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffbb00',
    paddingVertical: rs(12),
    borderRadius: rs(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBtnText: {
    fontSize: rs(14),
    fontWeight: 'bold',
    color: '#ffbb00',
  },
});
