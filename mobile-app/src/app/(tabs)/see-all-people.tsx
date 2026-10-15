import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const GradientHeart = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Defs>
      <SvgLinearGradient id="orangeHeartGradPeople" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#ff5e00" />
        <Stop offset="50%" stopColor="#ff8c00" />
        <Stop offset="100%" stopColor="#ffae00" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="url(#orangeHeartGradPeople)"
    />
  </Svg>
);

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function SeeAllPeopleScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  type ConnectStatus = 'connect' | 'pending' | 'accept' | 'connected';
  const [connectStatusMap, setConnectStatusMap] = useState<Record<string, ConnectStatus>>({});
  const [selectedTagsMap, setSelectedTagsMap] = useState<Record<string, boolean>>({});
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({ p1: true });
  const connectTimers = useRef<Record<string, ReturnType<typeof setTimeout>[]>>({});

  useEffect(() => {
    return () => {
      Object.values(connectTimers.current).forEach(timers => {
        timers.forEach(clearTimeout);
      });
    };
  }, []);

  const handleConnectPress = (personId: string) => {
    const current = connectStatusMap[personId] || 'connect';

    if (connectTimers.current[personId]) {
      connectTimers.current[personId].forEach(clearTimeout);
      connectTimers.current[personId] = [];
    }

    if (current === 'connected') {
      setConnectStatusMap(prev => ({ ...prev, [personId]: 'connect' }));
      return;
    }

    if (current === 'accept') {
      setConnectStatusMap(prev => ({ ...prev, [personId]: 'connected' }));
      return;
    }

    setConnectStatusMap(prev => ({ ...prev, [personId]: 'pending' }));

    const t1 = setTimeout(() => {
      setConnectStatusMap(prev => ({ ...prev, [personId]: 'accept' }));

      const t2 = setTimeout(() => {
        setConnectStatusMap(prev => ({ ...prev, [personId]: 'connected' }));
      }, 1500);

      if (connectTimers.current[personId]) {
        connectTimers.current[personId].push(t2);
      }
    }, 1500);

    connectTimers.current[personId] = [t1];
  };

  const togglePersonTag = (personId: string, tag: string) => {
    const key = `${personId}_${tag}`;
    setSelectedTagsMap(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleHeart = (personId: string) => {
    setLikedMap(prev => ({
      ...prev,
      [personId]: !prev[personId],
    }));
  };

  const allPeople = [
    {
      id: 'p1',
      name: 'Priya Sharma',
      flag: '🇮🇳',
      location: 'Bangalore, India',
      status: 'Active 5m ago',
      bio: 'Avid reader of fiction, amateur photographer, and filter coffee lover. Looking for local book clubs!',
      tags: ['Books', 'Coffee', 'Photography'],
      avatar: require('../../../assets/images/Avatar_Priya.png'),
    },
    {
      id: 'p2',
      name: 'Minh Tran',
      flag: '🇻🇳',
      location: 'Ho Chi Minh City, Vietnam',
      status: 'Active 10m ago',
      bio: "Exploring local food gems and practicing landscape sketching. Let's grab a hot bowl of Pho!",
      tags: ['Food', 'Sketching', 'Coffee'],
      avatar: require('../../../assets/images/Avatar_Minh.png'),
    },
    {
      id: 'p3',
      name: 'Sarah Jenkins',
      flag: '🇬🇧',
      location: 'London, UK',
      status: 'Active 1h ago',
      bio: 'UX Designer & dog enthusiast. Love exploring secret city spots and hiking on weekends.',
      tags: ['Design', 'Hiking', 'Dogs'],
      avatar: require('../../../assets/images/Avatar_Sarah.png'),
    },
  ];

  const filteredPeople = allPeople.filter(person => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      person.name.toLowerCase().includes(q) ||
      person.location.toLowerCase().includes(q) ||
      person.bio.toLowerCase().includes(q) ||
      person.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <View style={styles.container}>
      {/* Background Hexagon Pattern */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      {/* FIXED TOP HEADER, SEARCH BAR & SUB-NAVIGATION */}
      <View style={styles.fixedHeaderArea}>
        {/* Top Header Wave & Brand Logo */}
        <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(65) }]}>
          <Image 
            source={require('../../../assets/images/profile_overlay_new.png')} 
            style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} 
            resizeMode="cover" 
          />
          <View style={[styles.headerTop, { paddingTop: rs(75), position: 'relative' }]}>
            <Image 
              source={require('../../../assets/images/BrandLogo.png')} 
              style={styles.logoImage} 
              resizeMode="contain" 
            />
            
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Sub-Navigation Bar: < Communities | People | Interests */}
        <View style={styles.subNavContainer}>
          <TouchableOpacity 
            style={styles.subBackButton} 
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={rs(18)} color="#ffbb00" />
          </TouchableOpacity>

          <View style={styles.subTabsRow}>
            {/* Communities Tab */}
            <TouchableOpacity 
              style={styles.subTabItem} 
              onPress={() => router.replace('/(tabs)/see-all-communities')}
              activeOpacity={0.8}
            >
              <Image 
                source={require('../../../assets/images/users.png')} 
                style={[styles.subTabIcon, { tintColor: '#6b7280' }]} 
                resizeMode="contain" 
              />
              <Text style={styles.subTabText}>
                Communities
              </Text>
            </TouchableOpacity>

            {/* People Tab (ACTIVE) */}
            <TouchableOpacity 
              style={[styles.subTabItem, styles.subTabItemActive]} 
              activeOpacity={0.8}
            >
              <Image 
                source={require('../../../assets/images/user.png')} 
                style={[styles.subTabIcon, { tintColor: '#ffbb00' }]} 
                resizeMode="contain" 
              />
              <Text style={[styles.subTabText, styles.subTabTextActive]}>
                People
              </Text>
            </TouchableOpacity>

            {/* Interests Tab */}
            <TouchableOpacity 
              style={styles.subTabItem} 
              onPress={() => router.replace({ pathname: '/(tabs)/see-all-communities', params: { tab: 'Interests' } })}
              activeOpacity={0.8}
            >
              <Image 
                source={require('../../../assets/images/hash.png')} 
                style={[styles.subTabIcon, { tintColor: '#6b7280' }]} 
                resizeMode="contain" 
              />
              <Text style={styles.subTabText}>
                Interests
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section Header: See All People */}
        <View style={styles.peopleSectionHeader}>
          <View style={styles.peopleHeaderRow}>
            <View style={styles.peopleHeaderLeft}>
              <Image 
                source={require('../../../assets/images/user.png')} 
                style={styles.peopleSectionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.peopleSectionTitle}>See All People</Text>
            </View>
            <TouchableOpacity style={styles.peopleSortByBtn} activeOpacity={0.7}>
              <Text style={styles.peopleSortByText}>Sort by: Online first</Text>
              <Ionicons name="caret-down" size={rs(12)} color="#4b5563" style={{ marginLeft: rs(3) }} />
            </TouchableOpacity>
          </View>
          <Text style={styles.peopleSectionSubtitle}>
            Explore profiles and find your next study, photography, food buddy.
          </Text>
        </View>

        {/* Profiles Container (Matching ProfilesContainer.png exactly) */}
        <View style={styles.peopleContainer}>
          {filteredPeople.map(person => {
            const status = connectStatusMap[person.id] || 'connect';
            const isHeartActive = !!likedMap[person.id];

            return (
              <View key={person.id} style={styles.personCard}>
                {/* Top Row: Avatar + Info (Name, Location) + Active Status Pill */}
                <View style={styles.personCardTop}>
                  <View style={styles.personAvatarWrap}>
                    <Image source={person.avatar} style={styles.personAvatar} resizeMode="cover" />
                  </View>

                  <View style={styles.personInfoWrap}>
                    <View style={styles.personNameRow}>
                      <Text style={styles.personName}>{person.name}</Text>
                      <Text style={styles.personFlag}>{person.flag}</Text>
                      <Image 
                        source={require('../../../assets/images/Vector.png')} 
                        style={styles.vectorIcon} 
                        resizeMode="contain" 
                      />
                    </View>
                    <Text style={styles.personLocationText}>{person.location}</Text>
                  </View>

                  <View style={styles.personStatusPill}>
                    <Text style={styles.personStatusText}>
                      {person.status}
                    </Text>
                  </View>
                </View>

                {/* Bio */}
                <Text style={styles.personBio}>{person.bio}</Text>

                {/* Tags */}
                <View style={styles.personTagsRow}>
                  {person.tags.map(tag => {
                    const isTagOn = !!selectedTagsMap[`${person.id}_${tag}`];
                    return (
                      <TouchableOpacity 
                        key={tag} 
                        style={[styles.personTag, isTagOn && styles.personTagActive]}
                        activeOpacity={0.75}
                        onPress={() => togglePersonTag(person.id, tag)}
                      >
                        <Text style={[styles.personTagText, isTagOn && styles.personTagTextActive]}>
                          {tag}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Bottom Action Row: Heart on left, Connect on right */}
                <View style={styles.personActionRow}>
                  <TouchableOpacity
                    style={styles.heartBtn}
                    activeOpacity={0.7}
                    onPress={() => toggleHeart(person.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    {isHeartActive ? (
                      <GradientHeart size={rs(19)} />
                    ) : (
                      <Ionicons name="heart-outline" size={rs(19)} color="#78716c" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[
                      styles.connectBtn,
                      status === 'pending' && styles.connectBtnPending,
                      status === 'accept' && styles.connectBtnAccept,
                      status === 'connected' && styles.connectBtnConnected,
                    ]} 
                    activeOpacity={0.85}
                    onPress={() => handleConnectPress(person.id)}
                  >
                    <Text 
                      style={[
                        styles.connectBtnText,
                        status === 'pending' && styles.connectBtnTextPending,
                        status === 'accept' && styles.connectBtnTextAccept,
                        status === 'connected' && styles.connectBtnTextConnected,
                      ]}
                    >
                      {status === 'pending' 
                        ? 'Pending' 
                        : status === 'accept' 
                          ? 'Accept' 
                          : status === 'connected' 
                            ? 'Connected' 
                            : 'Connect'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Bottom padding for TabBar and Floating Mascot */}
        <View style={{ height: TABBAR_HEIGHT + rs(75) }} />
      </ScrollView>

      {/* BOTTOM TABBAR */}
      <TabBarMenu activeTab="discover" />

      {/* FLOATING AISUP MASCOT (TOPMOST LAYER) */}
      <AISup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f4f0',
  },
  hexBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.15,
  },

  /* Fixed Top Header */
  fixedHeaderArea: {
    backgroundColor: '#ffffff',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  overlay: {
    width: '100%',
    zIndex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    zIndex: 2,
  },
  logoImage: {
    width: rs(105),
    height: rs(35),
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
  },
  iconButton: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: rs(7),
    right: rs(7),
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    backgroundColor: '#ef4444',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  headerAvatarBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#ffbb00',
  },
  headerAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  filterBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBtnActive: {
    backgroundColor: '#ffbb00',
    borderColor: '#ffbb00',
  },

  /* Search Bar */
  searchSection: {
    paddingHorizontal: rs(16),
    paddingTop: rs(10),
    paddingBottom: rs(10),
    backgroundColor: '#ffffff',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    borderWidth: 1.5,
    borderColor: '#ffbb00',
    paddingHorizontal: rs(14),
    height: rs(42),
  },
  searchIcon: {
    marginRight: rs(8),
  },
  searchInput: {
    flex: 1,
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13.5),
    color: '#111827',
    paddingVertical: 0,
  },

  /* Sub-Navigation Bar */
  subNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  subBackButton: {
    paddingVertical: rs(10),
    paddingRight: rs(8),
  },
  subTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  subTabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rs(10),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  subTabItemActive: {
    borderBottomColor: '#ffbb00',
  },
  subTabIcon: {
    width: rs(16),
    height: rs(16),
    marginRight: rs(5),
  },
  subTabText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13.5),
    color: '#6b7280',
  },
  subTabTextActive: {
    fontFamily: 'AfacadFlux_700Bold',
    color: '#ffbb00',
  },

  /* Scroll Content */
  scrollContent: {
    paddingTop: 0,
    backgroundColor: '#f5f4f0',
  },

  /* People Section Header */
  peopleSectionHeader: {
    paddingHorizontal: rs(16),
    paddingTop: rs(14),
    paddingBottom: rs(6),
  },
  peopleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  peopleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  peopleSectionIcon: {
    width: rs(18),
    height: rs(18),
    tintColor: '#1e1810',
    marginRight: rs(6),
  },
  peopleSectionTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#1e1810',
  },
  peopleSortByBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(16),
    paddingVertical: rs(4.5),
    paddingHorizontal: rs(10),
  },
  peopleSortByText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(12),
    color: '#4b5563',
  },
  peopleSectionSubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    marginTop: rs(4),
  },

  /* Profiles Container */
  peopleContainer: {
    paddingTop: rs(10),
    paddingBottom: rs(10),
  },
  personCard: {
    marginHorizontal: rs(8),
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#efeae0',
    padding: rs(16),
    paddingBottom: rs(14),
    marginBottom: rs(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  personCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  personAvatarWrap: {
    marginRight: rs(12),
  },
  personAvatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
  },
  personInfoWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  personNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(2),
  },
  personName: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#1e1810',
  },
  personFlag: {
    fontSize: rs(14),
    marginLeft: rs(5),
  },
  vectorIcon: {
    width: rs(13),
    height: rs(13),
    marginLeft: rs(5),
  },
  personLocationText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#78716c',
  },
  personStatusPill: {
    backgroundColor: '#f5f2ea',
    borderRadius: rs(12),
    paddingVertical: rs(3),
    paddingHorizontal: rs(8),
    alignSelf: 'flex-start',
  },
  personStatusText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(11),
    color: '#78716c',
  },
  personBio: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#44403c',
    lineHeight: rs(19),
    marginTop: rs(12),
    marginBottom: rs(14),
  },
  personTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: rs(6),
  },
  personTag: {
    backgroundColor: '#f5f2ea',
    borderRadius: rs(12),
    paddingVertical: rs(4.5),
    paddingHorizontal: rs(12),
    marginRight: rs(6),
    marginBottom: rs(6),
  },
  personTagActive: {
    backgroundColor: '#FFF3B3',
  },
  personTagText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(11.5),
    color: '#57534e',
  },
  personTagTextActive: {
    color: '#1e1810',
    fontFamily: 'AfacadFlux_600SemiBold',
  },
  personActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rs(8),
    paddingTop: rs(10),
    borderTopWidth: 1,
    borderTopColor: '#f1ede4',
  },
  heartBtn: {
    padding: rs(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectBtn: {
    backgroundColor: '#ffbb00',
    borderRadius: rs(16),
    paddingVertical: rs(6.5),
    paddingHorizontal: rs(18),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: rs(86),
  },
  connectBtnPending: {
    backgroundColor: '#18181b',
  },
  connectBtnAccept: {
    backgroundColor: '#18181b',
  },
  connectBtnConnected: {
    backgroundColor: '#18181b',
  },
  connectBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    color: '#ffffff',
  },
  connectBtnTextPending: {
    color: '#ffffff',
  },
  connectBtnTextAccept: {
    color: '#22c55e',
  },
  connectBtnTextConnected: {
    color: '#22c55e',
  },
});
