import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { rs } from '../../utils/scaling';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

const MOCK_DB: Record<string, any> = {
  '1': {
    name: 'Priya Sharma',
    status: 'Online',
    statusColor: '#10b981',
    connections: '24',
    mutual: '12',
    events: '8',
    mutualFriendsText: '+9 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: true,
    avatar: require('../../../assets/images/Avatar_MinhTran.png'),
    mutualAvatars: [
      require('../../../assets/images/Jake.png'),
      require('../../../assets/images/Priya.png'),
      require('../../../assets/images/MinTran.png'),
    ],
  },
  '2': {
    name: 'Jake Miller',
    status: 'Active 2h ago',
    statusColor: '#f59e0b',
    connections: '18',
    mutual: '4',
    events: '3',
    mutualFriendsText: '+4 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: false,
    avatar: require('../../../assets/images/Avatar_SoraPark.png'),
    mutualAvatars: [
      require('../../../assets/images/Jake.png'),
      require('../../../assets/images/Priya.png'),
      require('../../../assets/images/MinTran.png'),
    ],
  }
};

export default function FriendProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const userData = MOCK_DB[id as string] || MOCK_DB['1'];

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(65) }]}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} 
          resizeMode="cover" 
        />
        <View style={[styles.headerTop, { paddingTop: rs(75), position: 'relative' }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={rs(24)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{userData.isConnected ? 'Friend Profile' : 'User Profile'}</Text>
          <View style={{ width: rs(24) }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image source={userData.avatar} style={styles.avatarLarge} />
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: userData.statusColor }]} />
            <Text style={styles.statusText}>{userData.status}</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statValue}>{userData.connections}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statValue}>{userData.mutual}</Text>
            <Text style={styles.statLabel}>Mutual</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statValue}>{userData.events}</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mutual Connections</Text>
          <View style={styles.mutualRow}>
            <View style={styles.mutualAvatars}>
              {userData.mutualAvatars.map((img: any, idx: number) => (
                <Image 
                  key={idx} 
                  source={img} 
                  style={[styles.mutualAvatar, { marginLeft: idx > 0 ? -rs(12) : 0, zIndex: 10 - idx }]} 
                />
              ))}
            </View>
            <Text style={styles.mutualText}>{userData.mutualFriendsText}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shared Interests</Text>
          <View style={styles.interestsRow}>
            {userData.interests.map((interest: string, idx: number) => (
              <View key={idx} style={styles.interestPill}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionsSection}>
          {userData.isConnected ? (
            <>
              <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/chat', params: { id: id as string } })}>
                <LinearGradient
                  colors={['#ffb800', '#ff9800']}
                  style={styles.primaryBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="chatbubble-outline" size={rs(20)} color="#fff" style={{ marginRight: rs(8) }} />
                  <Text style={styles.primaryBtnText}>Message Priya</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: '#ef4444' }]}>
                <Text style={[styles.secondaryBtnText, { color: '#ef4444' }]}>Remove Friend</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#ffb800', '#ff9800']}
                  style={styles.primaryBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.primaryBtnText}>Connect</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: '#f59e0b' }]}>
                <Text style={[styles.secondaryBtnText, { color: '#f59e0b' }]}>Send Message Request</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.blockLink}>
            <Text style={styles.blockText}>Block User</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <AISup isGuest={false} />
      <TabBarMenu activeTab="messages" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    width: width,
    zIndex: 10,
  },
  overlay: {
    width: width,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rs(20),
  },
  backButton: {
    padding: rs(4),
  },
  headerTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(36),
    color: '#111827',
    marginTop: rs(8),
  },
  scrollContent: {
    paddingTop: rs(20),
    paddingBottom: TABBAR_HEIGHT + rs(100),
    paddingHorizontal: rs(20),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: rs(24),
  },
  avatarWrapper: {
    width: rs(100),
    height: rs(100),
    borderRadius: rs(50),
    marginBottom: rs(12),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fef08a',
  },
  avatarLarge: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(24),
    color: '#111827',
    marginBottom: rs(4),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: rs(10),
    height: rs(10),
    borderRadius: rs(5),
    marginRight: rs(6),
  },
  statusText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#6b7280',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: rs(16),
    marginBottom: rs(24),
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  statValue: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#111827',
    marginBottom: rs(4),
  },
  statLabel: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#9ca3af',
  },
  section: {
    marginBottom: rs(24),
  },
  sectionTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(28),
    color: '#111827',
    marginBottom: rs(8),
  },
  mutualRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mutualAvatars: {
    flexDirection: 'row',
    marginRight: rs(12),
  },
  mutualAvatar: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  mutualText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#6b7280',
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(8),
  },
  interestPill: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: rs(16),
    paddingVertical: rs(8),
    borderRadius: rs(8),
  },
  interestText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
    color: '#92400e',
  },
  actionsSection: {
    marginTop: rs(10),
    alignItems: 'center',
    gap: rs(16),
  },
  primaryBtn: {
    width: width - rs(40),
    height: rs(50),
    borderRadius: rs(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#ffffff',
  },
  secondaryBtn: {
    width: width - rs(40),
    height: rs(50),
    borderRadius: rs(25),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  secondaryBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
  },
  blockLink: {
    marginTop: rs(16),
  },
  blockText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#9ca3af',
    textDecorationLine: 'underline',
  }
});
