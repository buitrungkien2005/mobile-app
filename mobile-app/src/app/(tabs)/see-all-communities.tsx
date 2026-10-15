import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const GradientHeart = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Defs>
      <SvgLinearGradient id="orangeHeartGrad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#ff5e00" />
        <Stop offset="50%" stopColor="#ff8c00" />
        <Stop offset="100%" stopColor="#ffae00" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="url(#orangeHeartGrad)"
    />
  </Svg>
);

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;
const CARD_WIDTH = (width - rs(40) - rs(12)) / 2;

export default function SeeAllCommunitiesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string }>();
  const [selectedChips, setSelectedChips] = useState<string[]>(['All']);
  const [activeTab, setActiveTab] = useState<'Communities' | 'People' | 'Interests'>(
    params.tab === 'People' ? 'People' : params.tab === 'Interests' ? 'Interests' : 'Communities'
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (params.tab === 'People') {
      setActiveTab('People');
    } else if (params.tab === 'Communities') {
      setActiveTab('Communities');
    } else if (params.tab === 'Interests') {
      setActiveTab('Interests');
    }
  }, [params.tab]);

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

  const allPublicCommunities = [
    {
      id: 'c1',
      title: 'Photography Walk HCMC',
      desc: 'Explore the city together and capture beautiful moments',
      members: '1.2K',
      image: require('../../../assets/images/card.png'),
      tags: ['Photography', 'HCMC'],
      route: '/(tabs)/photography-walk'
    },
    {
      id: 'c2',
      title: 'Study Buddy Circle',
      desc: 'Motivate each other, share study tips and achieve goals together!',
      members: '856',
      image: require('../../../assets/images/study.png'),
      tags: ['Study', 'Productivity'],
      route: '/(tabs)/study-buddy-circle'
    },
    {
      id: 'c3',
      title: 'Book & Coffee Club',
      desc: 'Good books, great conversations, brighter friendships.',
      members: '642',
      image: require('../../../assets/images/CoverPhoto_Coffee.png'),
      tags: ['Books', 'Cafe'],
      route: '/(tabs)/book-and-coffee-club'
    },
    {
      id: 'c4',
      title: 'Fitness & Wellness Club',
      desc: 'Stay healthy, stay strong — your fitness journey starts here',
      members: '328',
      image: require('../../../assets/images/Fitness.png'),
      tags: ['Fitness', 'Wellness'],
      route: '/(tabs)/fitness-and-wellness-club'
    },
    {
      id: 'c5',
      title: 'Tech Innovators Hub',
      desc: 'Build, learn, and innovate together with fellow tech lovers',
      members: '512',
      image: require('../../../assets/images/Tech.png'),
      tags: ['Tech', 'AI'],
      route: '/(tabs)/tech-innovators-hub'
    },
    {
      id: 'c6',
      title: 'Weekend Hikers',
      desc: 'Discover new trails, welcome new friends, less screen time',
      members: '5.8K',
      image: require('../../../assets/images/CoverPhoto-Hiker.png'),
      tags: ['Hiking', 'Weekend', 'Outdoors'],
      route: '/(tabs)/weekend-hikers'
    },
    {
      id: 'c7',
      title: 'Coding Coffee Club',
      desc: 'Code together, learn together, grow together',
      members: '423',
      image: require('../../../assets/images/CoverPhoto-Coding.png'),
      tags: ['Coding', 'Tech', 'Coffee'],
      route: '/(tabs)/coding-coffee-club'
    },
    {
      id: 'c8',
      title: 'Pet Friends Saigon',
      desc: 'For pet lovers to share tips, find playdates and make friends',
      members: '1.1K',
      image: require('../../../assets/images/CoverPhoto-Pet.png'),
      tags: ['Pets', 'City', 'Hobby'],
      route: '/(tabs)/pet-friends-saigon'
    }
  ];

  const filteredCommunities = allPublicCommunities.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q));
  });

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

    // Clear any pending timers for this person
    if (connectTimers.current[personId]) {
      connectTimers.current[personId].forEach(clearTimeout);
      connectTimers.current[personId] = [];
    }

    if (current === 'connected') {
      // Click again toggles back to connect
      setConnectStatusMap(prev => ({ ...prev, [personId]: 'connect' }));
      return;
    }

    if (current === 'accept') {
      // Clicking during accept immediately confirms connected
      setConnectStatusMap(prev => ({ ...prev, [personId]: 'connected' }));
      return;
    }

    // Connect -> Pending (nền đen chữ trắng)
    setConnectStatusMap(prev => ({ ...prev, [personId]: 'pending' }));

    // Sau 1.5s -> Accept (nền đen chữ xanh)
    const t1 = setTimeout(() => {
      setConnectStatusMap(prev => ({ ...prev, [personId]: 'accept' }));

      // Sau 1.5s tiếp theo -> Connected (nền đen chữ xanh)
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

  const [selectedTraits, setSelectedTraits] = useState<Record<string, boolean>>({
    Extrovert: true,
    Funny: true,
    Passionate: true,
    Sensitive: true,
    Optimistic: true,
    Travel: true,
    Cooking: true,
    Photography: true,
    Gaming: true,
    'Night Owl': true,
    Meditation: true,
    'Coffee Addict': true,
    'Pet Lover': true,
    Urban: true,
    Adventurous: true,
  });

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => ({
      ...prev,
      [trait]: !prev[trait],
    }));
  };

  const traitCategories = [
    {
      id: 'personality',
      name: 'Personality',
      traits: ['Extrovert', 'Introvert', 'Funny', 'Calm', 'Passionate', 'Sensitive', 'Decisive', 'Optimistic'],
    },
    {
      id: 'interests',
      name: 'Interests',
      traits: ['Travel', 'Music', 'Cooking', 'Reading', 'Sports', 'Photography', 'Gaming', 'Art'],
    },
    {
      id: 'habits',
      name: 'Habits',
      traits: ['Early Bird', 'Night Owl', 'Gym Lover', 'Meditation', 'Coffee Addict', 'Vegan', 'Journaling'],
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      traits: ['Pet Lover', 'Nature', 'Urban', 'Minimalist', 'Adventurous', 'Family', 'Independent'],
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
              style={[styles.subTabItem, activeTab === 'Communities' && styles.subTabItemActive]} 
              onPress={() => setActiveTab('Communities')}
              activeOpacity={0.8}
            >
              <Image 
                source={require('../../../assets/images/users.png')} 
                style={[
                  styles.subTabIcon, 
                  { tintColor: activeTab === 'Communities' ? '#ffbb00' : '#6b7280' }
                ]} 
                resizeMode="contain" 
              />
              <Text style={[styles.subTabText, activeTab === 'Communities' && styles.subTabTextActive]}>
                Communities
              </Text>
            </TouchableOpacity>

            {/* People Tab */}
            <TouchableOpacity 
              style={[styles.subTabItem, activeTab === 'People' && styles.subTabItemActive]} 
              onPress={() => setActiveTab('People')}
              activeOpacity={0.8}
            >
              <Image 
                source={require('../../../assets/images/user.png')} 
                style={[
                  styles.subTabIcon, 
                  { tintColor: activeTab === 'People' ? '#ffbb00' : '#6b7280' }
                ]} 
                resizeMode="contain" 
              />
              <Text style={[styles.subTabText, activeTab === 'People' && styles.subTabTextActive]}>
                People
              </Text>
            </TouchableOpacity>

            {/* Interests Tab */}
            <TouchableOpacity 
              style={[styles.subTabItem, activeTab === 'Interests' && styles.subTabItemActive]} 
              onPress={() => setActiveTab('Interests')}
              activeOpacity={0.8}
            >
              <Image 
                source={require('../../../assets/images/hash.png')} 
                style={[
                  styles.subTabIcon, 
                  { tintColor: activeTab === 'Interests' ? '#ffbb00' : '#6b7280' }
                ]} 
                resizeMode="contain" 
              />
              <Text style={[styles.subTabText, activeTab === 'Interests' && styles.subTabTextActive]}>
                Interests
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView 
        style={[activeTab === 'People' && { backgroundColor: '#f5f4f0' }]} 
        contentContainerStyle={[styles.scrollContent, activeTab === 'People' && { backgroundColor: '#f5f4f0' }]} 
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'Communities' && (
          <>
            {/* Welcome back! Section */}
            <LinearGradient
              colors={['#FEF7DB', '#FFF3C5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.welcomeSection}
            >
              <Text style={styles.welcomeTitle}>Welcome back!</Text>
              <Text style={styles.welcomeSub}>
                Explore communities, post, and connect with everyone.
              </Text>
              <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.85}>
                <Text style={styles.exploreBtnText}>Explore</Text>
                <Ionicons name="arrow-forward" size={rs(14)} color="#ffffff" />
              </TouchableOpacity>
            </LinearGradient>

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

            {/* Section Header: All public communities */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionHeaderLeft}>
                <Image 
                  source={require('../../../assets/images/users2.png')} 
                  style={styles.sectionIcon} 
                  resizeMode="contain" 
                />
                <Text style={styles.sectionTitle}>All public communities</Text>
              </View>
              <TouchableOpacity style={styles.sortByBtn} activeOpacity={0.7}>
                <Text style={styles.sortByText}>Sort by: Popular</Text>
                <Ionicons name="caret-forward" size={rs(12)} color="#4b5563" style={{ marginLeft: rs(3) }} />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionSubtitle}>
              These communities are visible to everyone.{' '}
              <Text style={styles.sectionSubtitleBold}>Log in to join</Text>, post, and connect.
            </Text>

            {/* Guest Card: More community features */}
            <View style={styles.moreFeaturesCard}>
              <View style={styles.moreFeaturesHeader}>
                <View style={styles.lockIconCircle}>
                  <Image 
                    source={require('../../../assets/images/lock.png')} 
                    style={styles.lockIconImage} 
                    resizeMode="contain" 
                  />
                </View>
                <View style={styles.moreFeaturesHeaderText}>
                  <Text style={styles.moreFeaturesTitle}>More community features</Text>
                  <Text style={styles.moreFeaturesSub}>
                    {"You're browsing as a guest. Some features require an account."}
                  </Text>
                </View>
              </View>

              {/* Feature 1 */}
              <View style={styles.featureItemBox}>
                <Image 
                  source={require('../../../assets/images/users2.png')} 
                  style={styles.featureItemIcon} 
                  resizeMode="contain" 
                />
                <View style={styles.featureItemTextWrap}>
                  <Text style={styles.featureItemTitle}>Create a community</Text>
                  <Text style={styles.featureItemSub}>Build your own group</Text>
                </View>
                <Ionicons name="lock-closed-outline" size={rs(16)} color="#cbd5e1" />
              </View>

              {/* Feature 2 */}
              <View style={styles.featureItemBox}>
                <Image 
                  source={require('../../../assets/images/zap.png')} 
                  style={styles.featureItemIcon} 
                  resizeMode="contain" 
                />
                <View style={styles.featureItemTextWrap}>
                  <Text style={styles.featureItemTitle}>Advanced matching</Text>
                  <Text style={styles.featureItemSub}>Find people more easily</Text>
                </View>
                <Ionicons name="lock-closed-outline" size={rs(16)} color="#cbd5e1" />
              </View>

              {/* Feature 3 */}
              <View style={styles.featureItemBox}>
                <Image 
                  source={require('../../../assets/images/shield.png')} 
                  style={styles.featureItemIcon} 
                  resizeMode="contain" 
                />
                <View style={styles.featureItemTextWrap}>
                  <Text style={styles.featureItemTitle}>Private groups</Text>
                  <Text style={styles.featureItemSub}>Access exclusive groups</Text>
                </View>
                <Ionicons name="lock-closed-outline" size={rs(16)} color="#cbd5e1" />
              </View>

              {/* Upgrade Button */}
              <TouchableOpacity 
                style={styles.upgradeBtn} 
                activeOpacity={0.85}
                onPress={() => router.push('/(tabs)/update-explorer')}
              >
                <Text style={styles.upgradeBtnText}>Upgrade to Explorer</Text>
                <Ionicons name="arrow-forward" size={rs(16)} color="#ffffff" style={{ marginLeft: rs(6) }} />
              </TouchableOpacity>
            </View>

            {/* 2-Column Grid of All Public Communities */}
            <View style={styles.communityGrid}>
              {filteredCommunities.map(item => (
                <View key={item.id} style={styles.gridCard}>
                  <View style={styles.cardImageContainer}>
                    <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                    <View style={styles.memberBadge}>
                      <Ionicons name="people" size={rs(11)} color="#ffffff" />
                      <Text style={styles.memberBadgeText}>{item.members}</Text>
                    </View>
                    <View style={styles.yellowLine} />
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.cardDesc} numberOfLines={2}>
                      {item.desc}
                    </Text>

                    <View style={styles.cardTagsRow}>
                      {item.tags.map(tag => (
                        <View key={tag} style={styles.cardTag}>
                          <Text style={styles.cardTagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity 
                        style={styles.viewBtn}
                        activeOpacity={0.8}
                        onPress={() => router.push(item.route as any)}
                      >
                        <Text style={styles.viewBtnText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.loginJoinBtn}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.loginJoinBtnText} numberOfLines={1}>Log in to join</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {activeTab === 'People' && (
          <>
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

            {/* People Cards Container */}
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
          </>
        )}

        {activeTab === 'Interests' && (
          <View style={styles.interestsContainer}>
            {/* Header: Choose Your Traits */}
            <View style={styles.traitsHeader}>
              <Text style={styles.traitsTitle}>Choose Your Traits</Text>
              <Text style={styles.traitsSubtitle}>
                Set up your personality, interests & habits to find your best match!
              </Text>
            </View>

            {/* 4 Trait Categories */}
            {traitCategories.map(category => {
              const q = searchQuery.trim().toLowerCase();
              const filteredTraits = q
                ? category.traits.filter(t => t.toLowerCase().includes(q) || category.name.toLowerCase().includes(q))
                : category.traits;

              if (q && filteredTraits.length === 0) return null;

              return (
                <View key={category.id} style={styles.traitCategorySection}>
                  {/* Category Title with Yellow Bullet */}
                  <View style={styles.traitCategoryHeader}>
                    <View style={styles.traitYellowDot} />
                    <Text style={styles.traitCategoryTitle}>{category.name}</Text>
                  </View>

                  {/* Chips Row */}
                  <View style={styles.traitChipsRow}>
                    {filteredTraits.map(trait => {
                      const isSelected = !!selectedTraits[trait];
                      return (
                        <TouchableOpacity
                          key={trait}
                          style={[styles.traitChip, isSelected && styles.traitChipActive]}
                          activeOpacity={0.7}
                          onPress={() => toggleTrait(trait)}
                        >
                          <View style={[styles.traitChipDot, isSelected && styles.traitChipDotActive]} />
                          <Text style={[styles.traitChipText, isSelected && styles.traitChipTextActive]}>
                            {trait}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}

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
  fixedHeaderArea: {
    backgroundColor: '#ffffff',
    zIndex: 10,
    elevation: 3,
  },
  headerContainer: {
    width: '100%',
    zIndex: 1,
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
    width: rs(44),
    height: rs(44),
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(10),
  },
  iconButton: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffbb00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: rs(7),
    right: rs(8),
    width: rs(7),
    height: rs(7),
    borderRadius: rs(4),
    backgroundColor: '#ff4d6d',
  },
  headerAvatarBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffb703',
    borderWidth: 2,
    borderColor: '#ffb703',
    alignItems: 'center',
    justifyContent: 'center',
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
  searchSection: {
    paddingHorizontal: rs(20),
    marginTop: rs(12),
    marginBottom: rs(10),
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
    fontSize: rs(14),
    color: '#111827',
    fontFamily: 'AfacadFlux_400Regular',
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
  },

  /* Welcome back! */
  welcomeSection: {
    paddingHorizontal: rs(20),
    paddingTop: rs(14),
    paddingBottom: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: '#fcd34d',
    marginBottom: rs(14),
  },
  welcomeTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(22),
    color: '#111827',
  },
  welcomeSub: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13),
    color: '#4b5563',
    marginTop: rs(4),
    marginBottom: rs(12),
  },
  exploreBtn: {
    backgroundColor: '#ffbb00',
    borderRadius: rs(20),
    paddingVertical: rs(8),
    paddingHorizontal: rs(18),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    color: '#ffffff',
    marginRight: rs(4),
  },

  /* Filter Chips */
  chipsSection: {
    paddingHorizontal: rs(20),
    marginBottom: rs(16),
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
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    color: '#374151',
  },
  chipTextActive: {
    color: '#ffffff',
  },

  /* Section Header */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    marginBottom: rs(4),
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: rs(20),
    height: rs(20),
    tintColor: '#111827',
    marginRight: rs(8),
  },
  sectionTitle: {
    fontSize: rs(17),
    fontFamily: 'AfacadFlux_700Bold',
    color: '#111827',
  },
  sortByBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    fontSize: rs(12),
    fontFamily: 'AfacadFlux_500Medium',
    color: '#6b7280',
  },
  sectionSubtitle: {
    paddingHorizontal: rs(20),
    fontSize: rs(12),
    fontFamily: 'AfacadFlux_400Regular',
    color: '#6b7280',
    marginBottom: rs(16),
  },
  sectionSubtitleBold: {
    fontFamily: 'AfacadFlux_600SemiBold',
    color: '#374151',
  },

  /* Guest Promo Card */
  moreFeaturesCard: {
    marginHorizontal: rs(20),
    backgroundColor: '#ffffff',
    borderRadius: rs(20),
    padding: rs(16),
    marginBottom: rs(20),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  moreFeaturesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
  },
  lockIconCircle: {
    width: rs(38),
    height: rs(38),
    borderRadius: rs(19),
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(12),
  },
  lockIconImage: {
    width: rs(20),
    height: rs(20),
  },
  moreFeaturesHeaderText: {
    flex: 1,
  },
  moreFeaturesTitle: {
    fontSize: rs(15),
    fontFamily: 'AfacadFlux_700Bold',
    color: '#111827',
  },
  moreFeaturesSub: {
    fontSize: rs(11),
    fontFamily: 'AfacadFlux_400Regular',
    color: '#6b7280',
    marginTop: rs(2),
  },
  featureItemBox: {
    backgroundColor: '#f9fafb',
    borderRadius: rs(12),
    paddingVertical: rs(10),
    paddingHorizontal: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(8),
  },
  featureItemIcon: {
    width: rs(18),
    height: rs(18),
    tintColor: '#6b7280',
    marginRight: rs(12),
  },
  featureItemTextWrap: {
    flex: 1,
  },
  featureItemTitle: {
    fontSize: rs(13),
    fontFamily: 'AfacadFlux_700Bold',
    color: '#1f2937',
  },
  featureItemSub: {
    fontSize: rs(11),
    fontFamily: 'AfacadFlux_400Regular',
    color: '#9ca3af',
    marginTop: rs(1),
  },
  upgradeBtn: {
    backgroundColor: '#ffbb00',
    borderRadius: rs(24),
    paddingVertical: rs(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: rs(6),
  },
  upgradeBtnText: {
    fontSize: rs(15),
    fontFamily: 'AfacadFlux_700Bold',
    color: '#ffffff',
  },

  /* 2-Column Community Grid */
  communityGrid: {
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: rs(14),
  },
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardImageContainer: {
    width: '100%',
    height: rs(105),
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  memberBadge: {
    position: 'absolute',
    top: rs(8),
    left: rs(8),
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: rs(12),
    paddingHorizontal: rs(7),
    paddingVertical: rs(3),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
  },
  memberBadgeText: {
    color: '#ffffff',
    fontSize: rs(10),
    fontFamily: 'AfacadFlux_600SemiBold',
  },
  yellowLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: rs(3),
    backgroundColor: '#ffbb00',
  },
  cardBody: {
    padding: rs(10),
    justifyContent: 'space-between',
    flex: 1,
  },
  cardTitle: {
    fontSize: rs(13),
    fontFamily: 'AfacadFlux_700Bold',
    color: '#111827',
    marginBottom: rs(3),
  },
  cardDesc: {
    fontSize: rs(11),
    fontFamily: 'AfacadFlux_400Regular',
    color: '#6b7280',
    lineHeight: rs(15),
    marginBottom: rs(6),
  },
  cardTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(4),
    marginBottom: rs(10),
  },
  cardTag: {
    backgroundColor: '#fffbeb',
    borderRadius: rs(6),
    paddingHorizontal: rs(6),
    paddingVertical: rs(2),
  },
  cardTagText: {
    fontSize: rs(10),
    fontFamily: 'AfacadFlux_500Medium',
    color: '#d97706',
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(5),
    marginTop: rs(4),
  },
  viewBtn: {
    borderWidth: 1.2,
    borderColor: '#ffbb00',
    borderRadius: rs(16),
    paddingVertical: rs(5),
    paddingHorizontal: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  viewBtnText: {
    fontSize: rs(11),
    fontFamily: 'AfacadFlux_600SemiBold',
    color: '#ffbb00',
  },
  loginJoinBtn: {
    flex: 1,
    backgroundColor: '#ffbb00',
    borderRadius: rs(16),
    paddingVertical: rs(5.5),
    paddingHorizontal: rs(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginJoinBtnText: {
    fontSize: rs(10.5),
    fontFamily: 'AfacadFlux_600SemiBold',
    color: '#ffffff',
    textAlign: 'center',
  },

  /* People Tab Styles */
  peopleSectionHeader: {
    paddingHorizontal: rs(12),
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
  peopleContainer: {
    backgroundColor: '#f5f4f0',
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

  /* Interests (Choose Your Traits) */
  interestsContainer: {
    paddingHorizontal: rs(20),
    paddingTop: rs(16),
    backgroundColor: '#ffffff',
  },
  traitsHeader: {
    marginBottom: rs(20),
  },
  traitsTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(22),
    color: '#18181b',
    marginBottom: rs(6),
  },
  traitsSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(13),
    color: '#6b7280',
    lineHeight: rs(19),
  },
  traitCategorySection: {
    marginBottom: rs(20),
  },
  traitCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  traitYellowDot: {
    width: rs(12),
    height: rs(12),
    borderRadius: rs(6),
    backgroundColor: '#ffbb00',
    marginRight: rs(8),
  },
  traitCategoryTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(15.5),
    color: '#18181b',
  },
  traitChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  traitChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: rs(20),
    paddingVertical: rs(6.5),
    paddingHorizontal: rs(13),
    marginRight: rs(8),
    marginBottom: rs(10),
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  traitChipActive: {
    backgroundColor: '#fffbeb',
    borderColor: '#ffbb00',
  },
  traitChipDot: {
    width: rs(6),
    height: rs(6),
    borderRadius: rs(3),
    backgroundColor: '#9ca3af',
    marginRight: rs(6),
  },
  traitChipDotActive: {
    backgroundColor: '#b45309',
  },
  traitChipText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(13),
    color: '#374151',
  },
  traitChipTextActive: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(13),
    color: '#92400e',
  },
});
