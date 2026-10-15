import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

type ConnectState = 'Connect' | 'Pending' | 'Accept' | 'Connected' | 'Disconnected';

const UserConnectButton = () => {
  const [state, setState] = useState<ConnectState>('Connect');
  const timerRef = useRef<any>(null);

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
      activeOpacity={0.8}
    >
      <Text style={[styles.connectBtnText, overrides.text]}>{state}</Text>
    </TouchableOpacity>
  );
};

export default function SearchBuddyScreen() {
  const router = useRouter();
  const [selectedChips, setSelectedChips] = useState<string[]>(['All']);

  const filterChips = [
    'All', 'Hobby', 'Habit', 'Profession', 'Study',
    'Weekend', 'City', 'MBTI'
  ];

  const toggleChip = (chip: string) => {
    if (chip === 'All') {
      setSelectedChips(['All']);
    } else {
      let updated: string[];
      if (selectedChips.includes(chip)) {
        updated = selectedChips.filter(c => c !== chip);
      } else {
        updated = [...selectedChips.filter(c => c !== 'All'), chip];
      }
      if (updated.length === 0) {
        updated = ['All'];
      }
      setSelectedChips(updated);
    }
  };

  const publicCommunities = [
    {
      id: 'alpine',
      title: 'Alpine Trail Buddies',
      desc: 'Easy trails, fresh air and good company. A welcoming space for weekend walks around Chamonix.',
      members: '1',
      image: require('../../../assets/images/Alpine.png'),
      tags: ['Hiking', 'Chamonix'],
      buttonText: 'View my community'
    },
    {
      id: 'c1',
      title: 'Photography Walk HCMC',
      desc: 'Explore the city together and capture beautiful moments',
      members: '1.2K',
      image: require('../../../assets/images/card.png'),
      tags: ['Photography', 'HCMC']
    },
    {
      id: 'c2',
      title: 'Study Buddy Circle',
      desc: 'Motivate each other, share study tips and achieve goals together!',
      members: '856',
      image: require('../../../assets/images/study.png'),
      tags: ['Study', 'Productivity']
    },
    {
      id: 'c3',
      title: 'Book & Coffee Club',
      desc: 'Good books, great conversations, brighter friendships.',
      members: '642',
      image: require('../../../assets/images/cafe.png'),
      tags: ['Books', 'Cafe']
    },
    {
      id: 'c4',
      title: 'Fitness & Wellness Club',
      desc: 'Stay healthy, stay strong — your fitness journey starts here',
      members: '328',
      image: require('../../../assets/images/sport.png'),
      tags: ['Fitness', 'Wellness']
    },
    {
      id: 'c5',
      title: 'Tech Innovators Hub',
      desc: 'Build, learn, and innovate together with fellow tech lovers',
      members: '512',
      image: require('../../../assets/images/cafe.png'),
      tags: ['Tech', 'AI']
    }
  ];

  const sharedInterestUsers = [
    {
      id: 'u1',
      name: 'Linh, 22',
      location: 'HCMC, Vietnam',
      avatar: require('../../../assets/images/avatar_linh_22.png'),
      tags: ['Photography', 'Travel']
    },
    {
      id: 'u2',
      name: 'Minh, 24',
      location: 'HCMC, Vietnam',
      avatar: require('../../../assets/images/avatar_minh_24.png'),
      tags: ['Tech', 'Hiking']
    },
    {
      id: 'u3',
      name: 'An, 21',
      location: 'HCMC, Vietnam',
      avatar: require('../../../assets/images/avatar_an_21.png'),
      tags: ['Books', 'Cafe']
    }
  ];

  return (
    <View style={styles.container}>
      {/* FIXED HEADER + SEARCH + FILTER SECTION */}
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

              {/* Active Setting / Filter Button: Yellow solid background with black sliders */}
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

        {/* Filter Chips (Multi-select, 2 rows wrapped) */}
        <View style={styles.chipsSection}>
          <View style={styles.chipsWrap}>
            {filterChips.map(chip => {
              const isActive = selectedChips.includes(chip);
              return (
                <TouchableOpacity 
                  key={chip} 
                  style={[styles.chip, isActive && styles.chipActive]}
                  onPress={() => toggleChip(chip)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                    {chip}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* SECTION 1: Public communities for you */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <Image source={require('../../../assets/images/users_group.png')} style={[styles.sectionIcon, { tintColor: '#111827' }]} resizeMode="contain" />
            <Text style={styles.sectionTitle}>Public communities for you</Text>
          </View>
          <TouchableOpacity 
            style={styles.seeAllBtn}
            onPress={() => router.push('/(tabs)/see-all-communities' as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>See all</Text>
            <Ionicons name="chevron-forward" size={rs(16)} color="#ea580c" />
          </TouchableOpacity>
        </View>

        {/* Public Communities Horizontal Carousel */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.communitiesScroll}
        >
          {publicCommunities.map(item => (
            <View key={item.id} style={styles.communityCard}>
              <View style={styles.communityImageContainer}>
                <Image source={item.image} style={styles.communityImage} />
                <View style={styles.memberBadge}>
                  <Ionicons name="people" size={rs(12)} color="#ffffff" />
                  <Text style={styles.memberBadgeText}>{item.members}</Text>
                </View>
                <View style={styles.yellowLine} />
              </View>

              <View style={styles.communityCardBody}>
                <Text style={styles.communityTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.communityDesc} numberOfLines={3}>{item.desc}</Text>
                
                <View style={styles.communityTagsRow}>
                  {item.tags.map(tag => (
                    <View key={tag} style={styles.communityTag}>
                      <Text style={styles.communityTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity 
                  style={styles.viewCommunityBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (item.id === 'alpine') {
                      router.push('/(tabs)/alpine-trail-buddies' as any);
                    } else if (item.id === 'c1') {
                      router.push('/(tabs)/photography-walk' as any);
                    } else if (item.id === 'c2') {
                      router.push('/(tabs)/study-buddy-circle' as any);
                    } else if (item.id === 'c3') {
                      router.push('/(tabs)/book-and-coffee-club' as any);
                    } else if (item.id === 'c4') {
                      router.push('/(tabs)/fitness-and-wellness-club' as any);
                    } else if (item.id === 'c5') {
                      router.push('/(tabs)/tech-innovators-hub' as any);
                    } else if (item.id === 'c6') {
                      router.push('/(tabs)/weekend-hikers' as any);
                    } else if (item.id === 'c7') {
                      router.push('/(tabs)/coding-coffee-club' as any);
                    } else if (item.id === 'c8') {
                      router.push('/(tabs)/pet-friends-saigon' as any);
                    }
                  }}
                >
                  <Text 
                    style={[
                      styles.viewCommunityBtnText,
                      item.buttonText ? { fontSize: rs(12) } : null
                    ]} 
                    numberOfLines={1}
                  >
                    {item.buttonText || 'View Community'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* SECTION 2: People with shared interests */}
        <View style={[styles.sectionHeaderRow, { marginTop: rs(28) }]}>
          <View style={styles.sectionHeaderLeft}>
            <Image source={require('../../../assets/images/user.png')} style={styles.sectionIcon} resizeMode="contain" />
            <Text style={styles.sectionTitle}>People with shared interests</Text>
          </View>
          <TouchableOpacity 
            style={styles.seeAllBtn}
            onPress={() => router.push({ pathname: '/(tabs)/see-all-communities', params: { tab: 'People' } } as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>See all</Text>
            <Ionicons name="chevron-forward" size={rs(16)} color="#ea580c" />
          </TouchableOpacity>
        </View>

        {/* User Cards Vertical List */}
        <View style={styles.usersList}>
          {sharedInterestUsers.map(user => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userCardLeft}>
                <Image source={user.avatar} style={styles.userAvatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userLocation}>{user.location}</Text>
                  <View style={styles.userTagsRow}>
                    {user.tags.map(tag => (
                      <View key={tag} style={styles.userTag}>
                        <Text style={styles.userTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <UserConnectButton />
            </View>
          ))}
        </View>

        {/* SECTION 3: More community features */}
        <View style={styles.moreFeaturesContainer}>
          <View style={styles.moreFeaturesHeader}>
            <View style={styles.lockIconCircle}>
              <Image source={require('../../../assets/images/lock_icon.png')} style={styles.lockIconImage} resizeMode="contain" />
            </View>
            <View style={styles.moreFeaturesHeaderText}>
              <Text style={styles.moreFeaturesTitle}>More community features</Text>
              <Text style={styles.moreFeaturesSub}>
                {"You're browsing as a guest. Some features require an account."}
              </Text>
            </View>
          </View>

          {/* Feature 1 */}
          <View style={styles.featureItem}>
            <View style={styles.featureItemLeft}>
              <Image source={require('../../../assets/images/users_group.png')} style={styles.featureIcon} resizeMode="contain" />
              <View>
                <Text style={styles.featureTitle}>Create a community</Text>
                <Text style={styles.featureSub}>Build your own group</Text>
              </View>
            </View>
            <Image source={require('../../../assets/images/lock_icon.png')} style={styles.featureLockIcon} resizeMode="contain" />
          </View>

          {/* Feature 2 */}
          <View style={styles.featureItem}>
            <View style={styles.featureItemLeft}>
              <Image source={require('../../../assets/images/zap.png')} style={styles.featureIcon} resizeMode="contain" />
              <View>
                <Text style={styles.featureTitle}>Advanced matching</Text>
                <Text style={styles.featureSub}>Find people more easily</Text>
              </View>
            </View>
            <Image source={require('../../../assets/images/lock_icon.png')} style={styles.featureLockIcon} resizeMode="contain" />
          </View>

          {/* Feature 3 */}
          <View style={styles.featureItem}>
            <View style={styles.featureItemLeft}>
              <Image source={require('../../../assets/images/shield_icon.png')} style={styles.featureIcon} resizeMode="contain" />
              <View>
                <Text style={styles.featureTitle}>Private groups</Text>
                <Text style={styles.featureSub}>Access exclusive groups</Text>
              </View>
            </View>
            <Image source={require('../../../assets/images/lock_icon.png')} style={styles.featureLockIcon} resizeMode="contain" />
          </View>
        </View>

        {/* SECTION 4: Membership Tier Banner */}
        <View style={styles.tierBanner}>
          {/* Free */}
          <View style={styles.tierCol}>
            <View style={[styles.tierIconBg, { backgroundColor: '#fef3c7' }]}>
              <Image source={require('../../../assets/images/star_icon.png')} style={styles.tierIcon} resizeMode="contain" />
            </View>
            <Text style={styles.tierName}>Free</Text>
            <Text style={styles.tierDesc}>Join & explore</Text>
          </View>

          {/* Explorer */}
          <View style={styles.tierCol}>
            <View style={[styles.tierIconBg, { backgroundColor: '#dcfce7' }]}>
              <Image source={require('../../../assets/images/check_circle_icon.png')} style={styles.tierIcon} resizeMode="contain" />
            </View>
            <Text style={styles.tierName}>Explorer</Text>
            <Text style={styles.tierDesc}>More search tools</Text>
          </View>

          {/* Buddy+ */}
          <View style={styles.tierCol}>
            <View style={[styles.tierIconBg, { backgroundColor: '#fce7f3' }]}>
              <Image source={require('../../../assets/images/heart_icon.png')} style={styles.tierIcon} resizeMode="contain" />
            </View>
            <Text style={styles.tierName}>Buddy+</Text>
            <Text style={styles.tierDesc}>Grow your circle</Text>
          </View>

          {/* Hive Pro */}
          <View style={styles.tierCol}>
            <View style={[styles.tierIconBg, { backgroundColor: '#fef3c7' }]}>
              <Image source={require('../../../assets/images/award_icon.png')} style={styles.tierIcon} resizeMode="contain" />
            </View>
            <Text style={styles.tierName}>Hive Pro</Text>
            <Text style={styles.tierDesc}>Full community access</Text>
          </View>
        </View>

      </ScrollView>

      {/* AISup mascot */}

      <TabBarMenu activeTab="discover" />

      <AISup isGuest={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fixedHeaderArea: {
    backgroundColor: '#ffffff',
    zIndex: 10,
    elevation: 3,
  },
  scrollContent: {
    paddingTop: rs(10),
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
  chipsSection: {
    paddingHorizontal: rs(20),
    marginBottom: rs(14),
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(8),
  },
  chip: {
    paddingHorizontal: rs(16),
    paddingVertical: rs(8),
    borderRadius: rs(20),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  chipActive: {
    backgroundColor: '#ffbb00',
    borderColor: '#ffbb00',
  },
  chipText: {
    fontFamily: 'Inter_500Medium',
    fontSize: rs(13),
    color: '#374151',
  },
  chipTextActive: {
    color: '#ffffff',
    fontFamily: 'Inter_500Medium',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    marginBottom: rs(14),
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: rs(20),
    height: rs(20),
    marginRight: rs(8),
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(18),
    color: '#111827',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(2),
  },
  seeAllText: {
    fontFamily: 'Inter_500Medium',
    fontSize: rs(14),
    color: '#ea580c',
  },
  communitiesScroll: {
    paddingHorizontal: rs(20),
    gap: rs(14),
    paddingBottom: rs(4),
  },
  communityCard: {
    width: rs(170),
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  communityImageContainer: {
    width: '100%',
    height: rs(110),
    position: 'relative',
  },
  communityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  memberBadge: {
    position: 'absolute',
    top: rs(8),
    left: rs(8),
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: rs(12),
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(11),
    color: '#ffffff',
    marginLeft: rs(4),
  },
  yellowLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: rs(3),
    backgroundColor: '#ffb800',
  },
  communityCardBody: {
    padding: rs(12),
    flex: 1,
    justifyContent: 'space-between',
  },
  communityTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(15),
    color: '#111827',
    marginBottom: rs(6),
    lineHeight: rs(19),
  },
  communityDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    lineHeight: rs(16),
    marginBottom: rs(10),
    minHeight: rs(48),
  },
  communityTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(6),
    marginBottom: rs(12),
  },
  communityTag: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: rs(8),
    paddingVertical: rs(4),
    borderRadius: rs(6),
  },
  communityTagText: {
    fontFamily: 'Inter_500Medium',
    fontSize: rs(11),
    color: '#b45309',
  },
  viewCommunityBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#ffb800',
    borderRadius: rs(20),
    paddingVertical: rs(8),
    alignItems: 'center',
  },
  viewCommunityBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(13),
    color: '#ffb800',
  },
  usersList: {
    paddingHorizontal: rs(20),
    gap: rs(12),
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    padding: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  userCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: rs(54),
    height: rs(54),
    borderRadius: rs(27),
    borderWidth: 2.5,
    borderColor: '#ffbb00',
    marginRight: rs(12),
    resizeMode: 'cover',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(16),
    color: '#111827',
    marginBottom: rs(2),
  },
  userLocation: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    marginBottom: rs(6),
  },
  userTagsRow: {
    flexDirection: 'row',
    gap: rs(6),
  },
  userTag: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    borderRadius: rs(6),
  },
  userTagText: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(11),
    color: '#b45309',
  },
  connectBtn: {
    backgroundColor: '#ffb800',
    paddingHorizontal: rs(16),
    paddingVertical: rs(8),
    borderRadius: rs(20),
    minWidth: rs(95),
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(13),
    color: '#ffffff',
  },
  moreFeaturesContainer: {
    paddingHorizontal: rs(20),
    marginTop: rs(32),
  },
  moreFeaturesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(16),
  },
  lockIconCircle: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(12),
  },
  lockIconImage: {
    width: rs(20),
    height: rs(20),
    tintColor: '#f59e0b',
  },
  moreFeaturesHeaderText: {
    flex: 1,
  },
  moreFeaturesTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(16),
    color: '#111827',
    marginBottom: rs(2),
  },
  moreFeaturesSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    lineHeight: rs(16),
  },
  featureItem: {
    backgroundColor: '#f9fafb',
    borderRadius: rs(14),
    padding: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(10),
  },
  featureItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: rs(22),
    height: rs(22),
    marginRight: rs(14),
    tintColor: '#9ca3af',
  },
  featureTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(15),
    color: '#111827',
    marginBottom: rs(2),
  },
  featureSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
  },
  featureLockIcon: {
    width: rs(16),
    height: rs(16),
    tintColor: '#9ca3af',
  },
  tierBanner: {
    marginHorizontal: rs(20),
    marginTop: rs(24),
    backgroundColor: '#fffdf5',
    borderWidth: 1.5,
    borderColor: '#fef08a',
    borderRadius: rs(20),
    paddingVertical: rs(16),
    paddingHorizontal: rs(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tierCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rs(2),
  },
  tierIconBg: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(6),
  },
  tierIcon: {
    width: rs(18),
    height: rs(18),
  },
  tierName: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(12),
    color: '#111827',
    marginBottom: rs(2),
    textAlign: 'center',
  },
  tierDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(10),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(13),
  },
});
