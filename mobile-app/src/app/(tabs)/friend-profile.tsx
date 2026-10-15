<<<<<<< HEAD
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
=======
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
>>>>>>> 277c38f (Fix giao dien app)
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
<<<<<<< HEAD
    avatar: require('../../../assets/images/Avatar_MinhTran.png'),
    mutualAvatars: [
      require('../../../assets/images/Jake.png'),
      require('../../../assets/images/Priya.png'),
      require('../../../assets/images/MinTran.png'),
=======
    avatar: require('../../../assets/images/Priya_Sharma.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
>>>>>>> 277c38f (Fix giao dien app)
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
<<<<<<< HEAD
    avatar: require('../../../assets/images/Avatar_SoraPark.png'),
    mutualAvatars: [
      require('../../../assets/images/Jake.png'),
      require('../../../assets/images/Priya.png'),
      require('../../../assets/images/MinTran.png'),
=======
    avatar: require('../../../assets/images/Jake_Miller.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  '3': {
    name: 'Linh Nguyen',
    status: 'Online',
    statusColor: '#10b981',
    connections: '24',
    mutual: '12',
    events: '8',
    mutualFriendsText: '+9 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: true,
    avatar: require('../../../assets/images/LinhNguyen.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  '4': {
    name: 'Minh Tran',
    status: 'Active now',
    statusColor: '#10b981',
    connections: '28',
    mutual: '15',
    events: '6',
    mutualFriendsText: '+15 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: true,
    isCloseCircle: true,
    avatarBorderColor: '#ffb800',
    avatar: require('../../../assets/images/MinhTran_Avatar.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'n2': {
    name: 'Elena Rostova',
    status: 'Active 5m ago',
    statusColor: '#f59e0b',
    connections: '14',
    mutual: '9',
    events: '2',
    mutualFriendsText: '+9 mutual friends',
    interests: ['iOS Development', 'Tech Mixers', 'Design'],
    isConnected: false,
    isRequestSent: true,
    avatar: require('../../../assets/images/Elena.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'n3': {
    name: 'Marcus Aurelius',
    status: 'Active now',
    statusColor: '#10b981',
    connections: '42',
    mutual: '14',
    events: '5',
    mutualFriendsText: '+14 mutual friends',
    interests: ['Philosophy', 'Writing', 'Tech Mixers'],
    isConnected: false,
    hasReceivedRequest: true,
    avatar: require('../../../assets/images/Marcus.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'a1': {
    name: 'Sophia Martinez',
    status: 'Last seen yesterday',
    statusColor: '#9ca3af',
    connections: '22',
    mutual: '6',
    events: '4',
    mutualFriendsText: '+6 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: false,
    isAttendee: true,
    avatarBorderColor: '#ffb800',
    avatar: require('../../../assets/images/Sophia_Martinez.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'a2': {
    name: 'Kenji Sato',
    status: 'Last seen yesterday',
    statusColor: '#9ca3af',
    connections: '22',
    mutual: '6',
    events: '4',
    mutualFriendsText: '+6 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: false,
    isAttendee: true,
    avatarBorderColor: '#ffb800',
    avatar: require('../../../assets/images/Kenji_Sato.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'a7': {
    name: 'Siddharth Sen',
    status: 'Last seen yesterday',
    statusColor: '#9ca3af',
    connections: '22',
    mutual: '6',
    events: '4',
    mutualFriendsText: '+6 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: false,
    isAttendee: true,
    avatarBorderColor: '#ffb800',
    avatar: require('../../../assets/images/Siddharth_Sen.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'r1': {
    name: 'Amina Mansoor',
    status: 'Online',
    statusColor: '#10b981',
    connections: '24',
    mutual: '12',
    events: '8',
    mutualFriendsText: '+9 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: true,
    avatar: require('../../../assets/images/Amina_Mansoor.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'r2': {
    name: 'David Chen',
    status: 'Active 1d ago',
    statusColor: '#f59e0b',
    connections: '15',
    mutual: '3',
    events: '2',
    mutualFriendsText: '+3 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: false,
    isMessageRequest: true,
    avatarBorderColor: '#ffb800',
    avatar: require('../../../assets/images/David_Chen.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'r3': {
    name: 'Sonia Petrova',
    status: 'Active 1d ago',
    statusColor: '#f59e0b',
    connections: '15',
    mutual: '3',
    events: '2',
    mutualFriendsText: '+3 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: false,
    isMessageRequest: true,
    avatarBorderColor: '#ffb800',
    avatar: require('../../../assets/images/Sonia_Petrova.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'alex': {
    name: 'Alex Kim',
    status: 'Online',
    statusColor: '#10b981',
    connections: '24',
    mutual: '12',
    events: '8',
    mutualFriendsText: '+9 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: true,
    avatar: require('../../../assets/images/Avatar_AlexKim.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'd1': {
    name: 'Alex Kim',
    status: 'Online',
    statusColor: '#10b981',
    connections: '24',
    mutual: '12',
    events: '8',
    mutualFriendsText: '+9 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: true,
    avatar: require('../../../assets/images/Avatar_AlexKim.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'sora': {
    name: 'Sora Park',
    status: 'Online',
    statusColor: '#10b981',
    connections: '20',
    mutual: '10',
    events: '5',
    mutualFriendsText: '+8 mutual friends',
    interests: ['Design', 'Reading', 'Yoga'],
    isConnected: true,
    avatar: require('../../../assets/images/Avatar_SoraPark.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'd3': {
    name: 'Sora Park',
    status: 'Online',
    statusColor: '#10b981',
    connections: '20',
    mutual: '10',
    events: '5',
    mutualFriendsText: '+8 mutual friends',
    interests: ['Design', 'Reading', 'Yoga'],
    isConnected: true,
    avatar: require('../../../assets/images/Avatar_SoraPark.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'yuki': {
    name: 'Yuki Tanaka',
    status: 'Online',
    statusColor: '#10b981',
    connections: '22',
    mutual: '7',
    events: '4',
    mutualFriendsText: '+7 mutual friends',
    interests: ['Film', 'Cooking', 'Travel'],
    isConnected: true,
    avatar: require('../../../assets/images/Avatar_YukiTanaka.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'd4': {
    name: 'Yuki Tanaka',
    status: 'Online',
    statusColor: '#10b981',
    connections: '22',
    mutual: '7',
    events: '4',
    mutualFriendsText: '+7 mutual friends',
    interests: ['Film', 'Cooking', 'Travel'],
    isConnected: true,
    avatar: require('../../../assets/images/Avatar_YukiTanaka.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'minh': {
    name: 'Minh Tran',
    status: 'Active now',
    statusColor: '#10b981',
    connections: '28',
    mutual: '15',
    events: '6',
    mutualFriendsText: '+15 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: true,
    isCloseCircle: true,
    avatarBorderColor: '#ffb800',
    avatar: require('../../../assets/images/MinhTran_Avatar.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
    ],
  },
  'd2': {
    name: 'Minh Tran',
    status: 'Active now',
    statusColor: '#10b981',
    connections: '28',
    mutual: '15',
    events: '6',
    mutualFriendsText: '+15 mutual friends',
    interests: ['Design', 'Tech Mixers', 'Honeys'],
    isConnected: true,
    isCloseCircle: true,
    avatarBorderColor: '#ffb800',
    avatar: require('../../../assets/images/MinhTran_Avatar.png'),
    mutualAvatars: [
      require('../../../assets/images/Mutual_Friends_1.png'),
      require('../../../assets/images/Mutual_Friends_2.png'),
      require('../../../assets/images/Mutual_Friends_3.png'),
>>>>>>> 277c38f (Fix giao dien app)
    ],
  }
};

export default function FriendProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
<<<<<<< HEAD
  
  const userData = MOCK_DB[id as string] || MOCK_DB['1'];
=======
  const [isBlockModalVisible, setBlockModalVisible] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [hasReceivedRequest, setHasReceivedRequest] = useState(false);
  const [isMessageRequestState, setIsMessageRequestState] = useState(false);
  const [isRemovedFromCloseCircle, setRemovedFromCloseCircle] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const userData = MOCK_DB[id as string] || MOCK_DB['1'];
  const isActuallyCloseCircle = userData.isCloseCircle && !isRemovedFromCloseCircle;

  useEffect(() => {
    setIsRequestSent(userData.isRequestSent || false);
    setHasReceivedRequest(userData.hasReceivedRequest || false);
    setIsMessageRequestState(userData.isMessageRequest || false);
    setIsConnected(userData.isConnected || false);
  }, [id, userData]);

  const getHeaderTitle = () => {
    if (isActuallyCloseCircle) return 'Close Circle';
    if (hasReceivedRequest) return 'Connection Request';
    if (isMessageRequestState) return 'Message Request';
    if (userData.isAttendee) return 'Event Attendee';
    if (isConnected) return 'Friend Profile';
    return 'User Profile';
  };
>>>>>>> 277c38f (Fix giao dien app)

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
<<<<<<< HEAD
          <Text style={styles.headerTitle}>{userData.isConnected ? 'Friend Profile' : 'User Profile'}</Text>
          <View style={{ width: rs(24) }} />
=======
          <Text style={styles.headerTitle}>
            {getHeaderTitle()}
          </Text>
>>>>>>> 277c38f (Fix giao dien app)
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
<<<<<<< HEAD
          <View style={styles.avatarWrapper}>
=======
          <View style={[styles.avatarWrapper, (userData.avatarBorderColor && (isActuallyCloseCircle || userData.isAttendee || isMessageRequestState)) && { borderColor: userData.avatarBorderColor, borderWidth: 4 }]}>
>>>>>>> 277c38f (Fix giao dien app)
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
<<<<<<< HEAD
          {userData.isConnected ? (
=======
          {isActuallyCloseCircle ? (
            <>
              <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/chat', params: { id: id as string } })}>
                <LinearGradient
                  colors={['#ffb800', '#ff9800']}
                  style={styles.primaryBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.primaryBtnText}>Message {userData.name.split(' ')[0]}</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: '#f59e0b' }]} onPress={() => setRemovedFromCloseCircle(true)}>
                <Text style={[styles.secondaryBtnText, { color: '#f59e0b' }]}>Remove from Close Circle</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: '#ef4444' }]}>
                <Text style={[styles.secondaryBtnText, { color: '#ef4444' }]}>Remove Connection</Text>
              </TouchableOpacity>
            </>
          ) : isConnected ? (
>>>>>>> 277c38f (Fix giao dien app)
            <>
              <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/chat', params: { id: id as string } })}>
                <LinearGradient
                  colors={['#ffb800', '#ff9800']}
                  style={styles.primaryBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="chatbubble-outline" size={rs(20)} color="#fff" style={{ marginRight: rs(8) }} />
<<<<<<< HEAD
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
=======
                  <Text style={styles.primaryBtnText}>Message {userData.name.split(' ')[0]}</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: '#ef4444' }]} onPress={() => setIsConnected(false)}>
                <Text style={[styles.secondaryBtnText, { color: '#ef4444' }]}>Remove Friend</Text>
              </TouchableOpacity>
            </>
          ) : isMessageRequestState ? (
            <>
              <TouchableOpacity 
                style={[styles.primaryBtn, { backgroundColor: '#10b981' }]}
                onPress={() => {
                  setIsMessageRequestState(false);
                  setIsConnected(true);
                }}
              >
                <Text style={styles.primaryBtnText}>Accept Connection</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.secondaryBtn, { borderColor: '#ef4444' }]} 
                onPress={() => setIsMessageRequestState(false)}
              >
                <Text style={[styles.secondaryBtnText, { color: '#ef4444' }]}>Decline</Text>
              </TouchableOpacity>
            </>
          ) : hasReceivedRequest ? (
            <>
              <TouchableOpacity 
                style={[styles.primaryBtn, { backgroundColor: '#10b981' }]}
                onPress={() => { setHasReceivedRequest(false); setIsConnected(true); }}
              >
                <Text style={styles.primaryBtnText}>Accept</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.secondaryBtn, { borderColor: '#ef4444' }]} 
                onPress={() => setHasReceivedRequest(false)}
              >
                <Text style={[styles.secondaryBtnText, { color: '#ef4444' }]}>Decline</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.secondaryBtn, { borderColor: '#f59e0b' }]} 
                onPress={() => router.push({ pathname: '/(tabs)/chat', params: { id: id as string } })}
              >
                <Text style={[styles.secondaryBtnText, { color: '#f59e0b' }]}>Message</Text>
              </TouchableOpacity>
            </>
          ) : isRequestSent ? (
            <>
              <View style={[styles.primaryBtn, { backgroundColor: '#e2e8f0' }]}>
                <Text style={[styles.primaryBtnText, { color: '#94a3b8' }]}>Request Sent</Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.secondaryBtn, { borderColor: '#ef4444' }]} 
                onPress={() => setIsRequestSent(false)}
              >
                <Text style={[styles.secondaryBtnText, { color: '#ef4444' }]}>Cancel Request</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => setIsRequestSent(true)}>
>>>>>>> 277c38f (Fix giao dien app)
                <LinearGradient
                  colors={['#ffb800', '#ff9800']}
                  style={styles.primaryBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.primaryBtnText}>Connect</Text>
                </LinearGradient>
              </TouchableOpacity>
              
<<<<<<< HEAD
              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: '#f59e0b' }]}>
=======
              <TouchableOpacity 
                style={[styles.secondaryBtn, { borderColor: '#f59e0b' }]}
                onPress={() => router.push({ pathname: '/(tabs)/chat', params: { id: id as string } })}
              >
>>>>>>> 277c38f (Fix giao dien app)
                <Text style={[styles.secondaryBtnText, { color: '#f59e0b' }]}>Send Message Request</Text>
              </TouchableOpacity>
            </>
          )}

<<<<<<< HEAD
          <TouchableOpacity style={styles.blockLink}>
=======
          <TouchableOpacity style={styles.blockLink} onPress={() => setBlockModalVisible(true)}>
>>>>>>> 277c38f (Fix giao dien app)
            <Text style={styles.blockText}>Block User</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

<<<<<<< HEAD
      <AISup isGuest={false} />
      <TabBarMenu activeTab="messages" />
=======
      <Modal visible={isBlockModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconPlaceholder} />
            <Text style={styles.modalTitle}>Remove Connection?</Text>
            <Text style={styles.modalDescription}>
              This will remove them from your connections. You can reconnect later by sending a new request.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setBlockModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalRemoveBtn} onPress={() => setBlockModalVisible(false)}>
                <Text style={styles.modalRemoveText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TabBarMenu activeTab="messages" />

      <AISup isGuest={false} />
>>>>>>> 277c38f (Fix giao dien app)
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
<<<<<<< HEAD
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rs(20),
=======
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    gap: rs(12),
>>>>>>> 277c38f (Fix giao dien app)
  },
  backButton: {
    padding: rs(4),
  },
  headerTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(36),
    color: '#111827',
<<<<<<< HEAD
    marginTop: rs(8),
=======
>>>>>>> 277c38f (Fix giao dien app)
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
<<<<<<< HEAD
=======
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rs(24),
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    padding: rs(24),
    alignItems: 'center',
    width: '100%',
    maxWidth: rs(340),
  },
  modalIconPlaceholder: {
    width: rs(60),
    height: rs(60),
    borderRadius: rs(30),
    backgroundColor: '#fef08a',
    marginBottom: rs(16),
  },
  modalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(22),
    color: '#111827',
    marginBottom: rs(12),
    textAlign: 'center',
  },
  modalDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(16),
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: rs(24),
    lineHeight: rs(22),
  },
  modalButtons: {
    flexDirection: 'row',
    gap: rs(12),
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    height: rs(48),
    borderRadius: rs(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(16),
    color: '#6b7280',
  },
  modalRemoveBtn: {
    flex: 1,
    backgroundColor: '#ef4444',
    height: rs(48),
    borderRadius: rs(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRemoveText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(16),
    color: '#ffffff',
>>>>>>> 277c38f (Fix giao dien app)
  }
});
