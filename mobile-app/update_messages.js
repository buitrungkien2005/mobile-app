const fs = require('fs');
const path = require('path');

const newContent = `import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

const allConnections = [
  { id: '1', name: 'Priya Sharma', status: 'Active 5m ago', mutual: '12 mutual connections', avatar: require('../../../assets/images/Avatar_MinhTran.png'), hasFlag: false },
  { id: '2', name: 'Jake Miller', status: 'Active 2h ago', mutual: '4 mutual connections', avatar: require('../../../assets/images/Avatar_SoraPark.png'), hasFlag: false },
  { id: '3', name: 'Linh Nguyen', status: 'Active yesterday', mutual: '8 mutual connections', avatar: require('../../../assets/images/Avatar_YukiTanaka.png'), hasFlag: false },
  { id: '4', name: 'Minh Tran', status: 'Active now', mutual: '15 mutual connections', avatar: require('../../../assets/images/MinhTran_Avatar.png'), hasFlag: true }
];

const closeCircleData = [
  { id: 'c1', name: 'Priya Sharma', handle: '@priya_sharma', status: 'Active 5m ago', mutual: '11 mutual connections', avatar: require('../../../assets/images/Priya.png') },
  { id: 'c2', name: 'Minh Tran', handle: '@minh_saigon', status: 'Active now', mutual: '15 mutual connections', avatar: require('../../../assets/images/MinTran.png'), hasFlag: true },
  { id: 'c3', name: 'Jake Miller', handle: '@jake_m', status: 'Active 2h ago', mutual: '4 mutual connections', avatar: require('../../../assets/images/Jake.png') }
];

const connectData = [
  { id: 'n1', name: 'Jake Miller', title: 'UI/UX Designer', status: 'Active 2h ago', mutual: '4 mutual connections', avatar: require('../../../assets/images/Jake2.png'), action: 'Connect' },
  { id: 'n2', name: 'Elena Rostova', title: 'iOS Developer', status: 'Active 5m ago', mutual: '9 mutual connections', avatar: require('../../../assets/images/Elena.png'), action: 'Requested' },
  { id: 'n3', name: 'Marcus Aurelius', title: 'Philosopher & Writer', status: 'Active now', mutual: '14 mutual connections', avatar: require('../../../assets/images/Marcus.png'), action: 'Accept' }
];

const attendeesData = [
  { id: 'a1', name: 'Sophia Martinez', desc: 'Tech Honey Mixer', date: 'Oct 12, 2026', avatar: require('../../../assets/images/Sophia.png'), statusType: 'date' },
  { id: 'a2', name: 'Kenji Sato', desc: 'Product Beehive Workshop', date: 'Oct 10, 2026', avatar: require('../../../assets/images/Kenji.png'), statusType: 'date' },
  { id: 'a3', name: 'Priya Sharma', desc: '@priyasharma', badge: 'Going', avatar: require('../../../assets/images/Avatar_MinhTran.png'), statusType: 'badge' },
  { id: 'a4', name: 'Jake Miller', desc: '@jakemiller', badge: 'Maybe', avatar: require('../../../assets/images/Avatar_SoraPark.png'), statusType: 'badge' },
  { id: 'a5', name: 'Linh Nguyen', desc: '@linhnguyen', badge: 'Going', avatar: require('../../../assets/images/Avatar_YukiTanaka.png'), statusType: 'badge' },
  { id: 'a6', name: 'Minh Tran', hasFlag: true, desc: '@minhtran🇻🇳', badge: 'Going', avatar: require('../../../assets/images/MinhTran_Avatar.png'), statusType: 'badge' },
  { id: 'a7', name: 'Siddharth Sen', desc: '@siddharthsen', badge: "Can\\'t Go", avatar: require('../../../assets/images/Sidd.png'), statusType: 'badge' }
];

const messageRequestsData = [
  { id: 'r1', name: 'Amina Mansoor', time: '2h ago', message: 'Hey! Saw you at the design workshop last night. Let\\'s exch...', avatar: require('../../../assets/images/Amina.png') },
  { id: 'r2', name: 'David Chen', time: '1d ago', message: 'Hi Priya! I am also in your close circle through Jake. Let\\'s ca...', avatar: require('../../../assets/images/David.png') },
  { id: 'r3', name: 'Sonia Petrova', time: '3d ago', message: 'Hey, do you know if there are any slots left for the Honey-Ta...', avatar: require('../../../assets/images/Sonia.png') },
];

const onlineFriendsData = [
  { id: 'o1', name: 'Priya\\nSharma', status: 'Active\\nnow', avatar: require('../../../assets/images/Avatar_MinhTran.png') },
  { id: 'o2', name: 'Minh\\nTran', hasFlag: true, status: 'Active\\nnow', avatar: require('../../../assets/images/MinhTran_Avatar.png') },
];

const offlineFriendsData = [
  { id: 'f1', name: 'Jake\\nMiller', status: 'Last seen\\n2h ago', avatar: require('../../../assets/images/Avatar_SoraPark.png') },
  { id: 'f2', name: 'Linh\\nNguyen', status: 'Last seen\\nyesterday', avatar: require('../../../assets/images/Avatar_YukiTanaka.png') },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [activeChip, setActiveChip] = useState('Attendees'); // Set Attendees as default for testing, user can change
  
  const chips = [
    { label: 'All', count: 24 },
    { label: 'Close Circle', count: 8 },
    { label: 'Connect', count: 16 },
    { label: 'Attendees', count: null },
    { label: 'Message Requests', count: null },
    { label: 'View Activity', count: null }
  ];

  const getHeaderTitle = () => {
    if (activeChip === 'Close Circle') return 'Close Circle';
    if (activeChip === 'Connect') return 'Connect';
    if (activeChip === 'Attendees') return 'Attendees';
    if (activeChip === 'Message Requests') return 'Message Requests';
    if (activeChip === 'View Activity') return 'View Activity';
    return 'My Connections';
  };

  const renderAll = () => (
    <View style={styles.connectionsList}>
      {allConnections.map(user => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.userInfoLeft}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.userDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{user.name}</Text>
                {user.hasFlag && <Text style={styles.flag}>🇻🇳</Text>}
              </View>
              <Text style={styles.userStatus}>{user.status}</Text>
              <Text style={styles.userMutual}>{user.mutual}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.messageBtn}>
            <Ionicons name="chatbubble-outline" size={rs(16)} color="#ff9800" style={{ marginRight: rs(4) }} />
            <Text style={styles.messageBtnText}>Message</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderCloseCircle = () => (
    <View style={styles.connectionsList}>
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>What is Close Circle?</Text>
        <Text style={styles.infoCardText}>
          Friends in your Close Circle can see your Close Circle posts. They will see a special green ring around your profile picture.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Members (3)</Text>

      {closeCircleData.map(user => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.userInfoLeft}>
            <Image source={user.avatar} style={styles.avatarGreenRing} />
            <View style={styles.userDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{user.name}</Text>
                {user.hasFlag && <Text style={styles.flag}>🇻🇳</Text>}
              </View>
              <Text style={styles.userHandle}>{user.handle}</Text>
              <Text style={styles.userStatus}>{user.status}</Text>
              <Text style={styles.userMutual}>{user.mutual}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.messageBtn}>
            <Ionicons name="chatbubble-outline" size={rs(16)} color="#ff9800" style={{ marginRight: rs(4) }} />
            <Text style={styles.messageBtnText}>Message</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addCloseCircleWrapper}>
        <LinearGradient
          colors={['#ffb800', '#ff9800']}
          style={styles.addCloseCircleBtn}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.addCloseCircleText}>+ Add to Close Circle</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderConnect = () => (
    <View style={styles.connectionsList}>
      {connectData.map(user => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.userInfoLeft}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStatus}>{user.status}</Text>
              <Text style={styles.userMutual}>{user.mutual}</Text>
              <View style={styles.jobBadge}>
                <Text style={styles.jobBadgeText}>{user.title}</Text>
              </View>
            </View>
          </View>
          <View style={styles.actionCol}>
            {user.action === 'Connect' && (
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSolid]}>
                <Text style={[styles.actionBtnText, styles.actionBtnTextSolid]}>Connect</Text>
              </TouchableOpacity>
            )}
            {user.action === 'Requested' && (
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutlineGray]}>
                <Text style={[styles.actionBtnText, styles.actionBtnTextGray]}>Requested</Text>
              </TouchableOpacity>
            )}
            {user.action === 'Accept' && (
              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSolid, { flex: 1, marginRight: rs(4) }]}>
                  <Text style={[styles.actionBtnText, styles.actionBtnTextSolid]}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutlineGray, { flex: 1, marginLeft: rs(4) }]}>
                  <Text style={[styles.actionBtnText, styles.actionBtnTextGray]}>Decline</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderAttendees = () => (
    <View style={styles.connectionsList}>
      <View style={styles.attendeesStatsRow}>
        <View style={styles.attendeesStatBox}>
          <Text style={[styles.attendeesStatNumber, { color: '#22c55e' }]}>12</Text>
          <Text style={styles.attendeesStatLabel}>Going</Text>
        </View>
        <View style={styles.attendeesStatBox}>
          <Text style={[styles.attendeesStatNumber, { color: '#f59e0b' }]}>5</Text>
          <Text style={styles.attendeesStatLabel}>Maybe</Text>
        </View>
        <View style={styles.attendeesStatBox}>
          <Text style={[styles.attendeesStatNumber, { color: '#ef4444' }]}>2</Text>
          <Text style={styles.attendeesStatLabel}>Can\\'t Go</Text>
        </View>
      </View>

      <View style={styles.attendeesGrid}>
        <View style={[styles.attendeesGridBox, { backgroundColor: '#eff6ff' }]}>
          <View style={styles.attendeesGridHeader}>
            <Image source={require('../../../assets/images/users2.png')} style={styles.attendeesGridIcon} />
            <Text style={styles.attendeesGridLabel}>Total</Text>
          </View>
          <Text style={styles.attendeesGridValue}>24</Text>
        </View>
        <View style={[styles.attendeesGridBox, { backgroundColor: '#fff1f2' }]}>
          <View style={styles.attendeesGridHeader}>
            <Image source={require('../../../assets/images/heart.png')} style={styles.attendeesGridIcon} />
            <Text style={styles.attendeesGridLabel}>Close Circle</Text>
          </View>
          <Text style={styles.attendeesGridValue}>8</Text>
        </View>
        <View style={[styles.attendeesGridBox, { backgroundColor: '#f0fdf4' }]}>
          <View style={styles.attendeesGridHeader}>
            <Image source={require('../../../assets/images/clock.png')} style={styles.attendeesGridIcon} />
            <Text style={styles.attendeesGridLabel}>Pending</Text>
          </View>
          <Text style={styles.attendeesGridValue}>5</Text>
        </View>
        <View style={[styles.attendeesGridBox, { backgroundColor: '#fffbeb' }]}>
          <View style={styles.attendeesGridHeader}>
            <Image source={require('../../../assets/images/award.png')} style={styles.attendeesGridIcon} />
            <Text style={styles.attendeesGridLabel}>Events</Text>
          </View>
          <Text style={styles.attendeesGridValue}>12</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Event Attendees</Text>

      {attendeesData.map(user => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.userInfoLeft}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.userDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.attendeeName}>{user.name}</Text>
                {user.hasFlag && <Text style={styles.flag}>🇻🇳</Text>}
              </View>
              <Text style={styles.attendeeDesc}>{user.desc}</Text>
            </View>
          </View>
          {user.statusType === 'date' ? (
            <Text style={styles.attendeeDate}>{user.date}</Text>
          ) : (
            <View style={[
              styles.attendeeBadge,
              user.badge === 'Going' ? styles.badgeGoing : 
              user.badge === 'Maybe' ? styles.badgeMaybe : styles.badgeCantGo
            ]}>
              <Text style={[
                styles.attendeeBadgeText,
                user.badge === 'Going' ? styles.badgeTextGoing : 
                user.badge === 'Maybe' ? styles.badgeTextMaybe : styles.badgeTextCantGo
              ]}>{user.badge}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderMessageRequests = () => (
    <View style={styles.connectionsList}>
      <View style={styles.requestBanner}>
        <Text style={styles.requestBannerText}>
          These people aren\\'t in your connections yet. Accepting a request lets them message you.
        </Text>
      </View>

      {messageRequestsData.map(user => (
        <View key={user.id} style={styles.requestCard}>
          <View style={styles.requestHeader}>
            <View style={styles.requestHeaderLeft}>
              <Image source={user.avatar} style={styles.requestAvatar} />
              <View>
                <Text style={styles.requestName}>{user.name}</Text>
                <Text style={styles.requestSubtext}>Sent a message request</Text>
              </View>
            </View>
            <Text style={styles.requestTime}>{user.time}</Text>
          </View>
          
          <View style={styles.requestPreview}>
            <Text style={styles.requestPreviewText} numberOfLines={1}>{user.message}</Text>
          </View>

          <View style={styles.requestActions}>
            <TouchableOpacity style={[styles.reqBtn, styles.reqBtnAccept]}>
              <Text style={styles.reqBtnTextAccept}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.reqBtn, styles.reqBtnDecline]}>
              <Text style={styles.reqBtnTextDecline}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderViewActivity = () => (
    <View style={styles.connectionsList}>
      <Text style={styles.sectionTitle}>Online Friends (6)</Text>
      
      {onlineFriendsData.map(user => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.activityInfoLeft}>
            <View style={styles.avatarContainer}>
              <Image source={user.avatar} style={styles.activityAvatar} />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.activityUserDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.activityUserName}>{user.name}</Text>
                {user.hasFlag && <Text style={styles.flagActivity}>🇻🇳</Text>}
              </View>
              <Text style={styles.activityUserStatus}>{user.status}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.activityMessageBtn}>
            <Image source={require('../../../assets/images/message-circle.png')} style={styles.activityMessageIcon} />
            <Text style={styles.activityMessageBtnText}>Message</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Offline Friends</Text>
      
      {offlineFriendsData.map(user => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.activityInfoLeft}>
            <View style={styles.avatarContainer}>
              <Image source={user.avatar} style={styles.activityAvatar} />
              <View style={styles.offlineDot} />
            </View>
            <View style={styles.activityUserDetails}>
              <Text style={styles.activityUserName}>{user.name}</Text>
              <Text style={styles.activityUserStatusGray}>{user.status}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.activityMessageBtn}>
            <Image source={require('../../../assets/images/message-circle.png')} style={styles.activityMessageIcon} />
            <Text style={styles.activityMessageBtnText}>Message</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(65) }]}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} 
          resizeMode="cover" 
        />
        <View style={[styles.headerTop, { paddingTop: rs(75), position: 'relative' }]}>
          <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
          <Image source={require('../../../assets/images/BrandLogo.png')} style={styles.logo} resizeMode="contain" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search connections..."
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.chipsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
            {chips.map(chip => {
              const isActive = activeChip === chip.label;
              const displayText = chip.count !== null ? \`\${chip.label} (\${chip.count})\` : chip.label;
              return (
                <TouchableOpacity
                  key={chip.label}
                  style={[styles.chip, isActive && styles.chipActive]}
                  onPress={() => setActiveChip(chip.label)}
                >
                  <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                    {displayText}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {activeChip === 'Close Circle' ? renderCloseCircle() :
         activeChip === 'Connect' ? renderConnect() :
         activeChip === 'Attendees' ? renderAttendees() :
         activeChip === 'Message Requests' ? renderMessageRequests() :
         activeChip === 'View Activity' ? renderViewActivity() :
         renderAll()}

      </ScrollView>

      <AISup isGuest={false} />
      <TabBarMenu activeTab="messages" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  headerContainer: { width: width, zIndex: 10 },
  overlay: { width: width },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: rs(20) },
  headerTitle: { fontFamily: 'Dongle_700Bold', fontSize: rs(42), color: '#111827', marginTop: rs(15) },
  logo: { width: rs(35), height: rs(35) },
  scrollContent: { paddingTop: rs(10), paddingBottom: TABBAR_HEIGHT + rs(40) },
  searchContainer: { paddingHorizontal: rs(20), marginBottom: rs(20) },
  searchInput: { height: rs(48), borderWidth: 1, borderColor: '#e5e7eb', borderRadius: rs(12), paddingHorizontal: rs(16), fontFamily: 'AfacadFlux_400Regular', fontSize: rs(16), color: '#111827', backgroundColor: '#ffffff' },
  chipsWrapper: { marginBottom: rs(20) },
  chipsContainer: { paddingHorizontal: rs(20), gap: rs(10) },
  chip: { paddingHorizontal: rs(16), paddingVertical: rs(4), backgroundColor: '#f3f4f6', borderRadius: rs(12), justifyContent: 'center', alignItems: 'center' },
  chipActive: { backgroundColor: '#ffb800' },
  chipText: { fontFamily: 'Dongle_700Bold', fontSize: rs(24), color: '#6b7280', marginTop: rs(2) },
  chipTextActive: { color: '#ffffff' },
  connectionsList: { paddingHorizontal: rs(20), gap: rs(16) },
  userCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: rs(16), backgroundColor: '#ffffff', borderRadius: rs(16), borderWidth: 1, borderColor: '#f3f4f6' },
  userInfoLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: rs(50), height: rs(50), borderRadius: rs(25), marginRight: rs(16) },
  avatarGreenRing: { width: rs(50), height: rs(50), borderRadius: rs(25), marginRight: rs(16), borderWidth: 2, borderColor: '#22c55e' },
  userDetails: { flex: 1, paddingRight: rs(10) },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: rs(2) },
  userName: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(17), color: '#111827', marginBottom: rs(2) },
  userHandle: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(13), color: '#9ca3af', marginBottom: rs(2) },
  userStatus: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(13), color: '#9ca3af', marginBottom: rs(4) },
  userMutual: { fontFamily: 'AfacadFlux_600SemiBold', fontSize: rs(12), color: '#d97706' },
  flag: { marginLeft: rs(4), fontSize: rs(14) },
  messageBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: rs(14), paddingVertical: rs(6), borderRadius: rs(20), borderWidth: 1, borderColor: '#ff9800', backgroundColor: '#ffffff' },
  messageBtnText: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(14), color: '#ff9800' },
  infoCard: { backgroundColor: '#fffcf4', padding: rs(16), borderRadius: rs(16), borderWidth: 1, borderColor: '#ffedc2', marginBottom: rs(4) },
  infoCardTitle: { fontFamily: 'AfacadFlux_600SemiBold', fontSize: rs(16), color: '#d97706', marginBottom: rs(6) },
  infoCardText: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(14), color: '#374151', lineHeight: rs(20) },
  sectionTitle: { fontFamily: 'Dongle_700Bold', fontSize: rs(28), color: '#111827', marginTop: rs(8), marginBottom: -rs(4) },
  addCloseCircleWrapper: { marginTop: rs(8), marginBottom: rs(20) },
  addCloseCircleBtn: { paddingVertical: rs(14), borderRadius: rs(24), alignItems: 'center', justifyContent: 'center' },
  addCloseCircleText: { fontFamily: 'AfacadFlux_600SemiBold', fontSize: rs(16), color: '#ffffff' },
  jobBadge: { backgroundColor: '#f3f4f6', paddingHorizontal: rs(8), paddingVertical: rs(4), borderRadius: rs(6), alignSelf: 'flex-start', marginTop: rs(4) },
  jobBadgeText: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(11), color: '#6b7280' },
  actionCol: { width: rs(100), alignItems: 'center' },
  actionBtn: { width: '100%', paddingVertical: rs(6), borderRadius: rs(20), alignItems: 'center', justifyContent: 'center', marginBottom: rs(8) },
  actionBtnSolid: { backgroundColor: '#ffb800' },
  actionBtnTextSolid: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(13), color: '#ffffff' },
  actionBtnOutlineGray: { borderWidth: 1, borderColor: '#9ca3af', backgroundColor: '#ffffff' },
  actionBtnTextGray: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(13), color: '#9ca3af' },
  actionRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  
  // Attendees specifics
  attendeesStatsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: rs(10) },
  attendeesStatBox: { flex: 1, backgroundColor: '#ffffff', borderRadius: rs(12), borderWidth: 1, borderColor: '#f3f4f6', paddingVertical: rs(12), alignItems: 'center' },
  attendeesStatNumber: { fontFamily: 'Dongle_700Bold', fontSize: rs(28), marginBottom: -rs(8) },
  attendeesStatLabel: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(13), color: '#6b7280' },
  attendeesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: rs(10), marginTop: rs(4) },
  attendeesGridBox: { width: (width - rs(50)) / 2, borderRadius: rs(16), padding: rs(16) },
  attendeesGridHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: rs(10) },
  attendeesGridIcon: { width: rs(18), height: rs(18), marginRight: rs(6), resizeMode: 'contain' },
  attendeesGridLabel: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(14), color: '#374151' },
  attendeesGridValue: { fontFamily: 'Dongle_700Bold', fontSize: rs(36), color: '#111827', marginTop: -rs(10), marginBottom: -rs(10) },
  attendeeName: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(16), color: '#111827' },
  attendeeDesc: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(13), color: '#6b7280' },
  attendeeDate: { fontFamily: 'AfacadFlux_600SemiBold', fontSize: rs(13), color: '#d97706' },
  attendeeBadge: { paddingHorizontal: rs(12), paddingVertical: rs(4), borderRadius: rs(20) },
  badgeGoing: { backgroundColor: '#dcfce7' },
  badgeTextGoing: { fontFamily: 'AfacadFlux_600SemiBold', fontSize: rs(12), color: '#166534' },
  badgeMaybe: { backgroundColor: '#fef3c7' },
  badgeTextMaybe: { fontFamily: 'AfacadFlux_600SemiBold', fontSize: rs(12), color: '#92400e' },
  badgeCantGo: { backgroundColor: '#fee2e2' },
  badgeTextCantGo: { fontFamily: 'AfacadFlux_600SemiBold', fontSize: rs(12), color: '#b91c1c' },
  
  // Message Requests specifics
  requestBanner: { backgroundColor: '#fffbeb', padding: rs(12), borderRadius: rs(8), marginBottom: rs(4) },
  requestBannerText: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(14), color: '#b45309', lineHeight: rs(20) },
  requestCard: { padding: rs(16), backgroundColor: '#ffffff', borderRadius: rs(16), borderWidth: 1, borderColor: '#f3f4f6' },
  requestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: rs(12) },
  requestHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  requestAvatar: { width: rs(40), height: rs(40), borderRadius: rs(20), marginRight: rs(12) },
  requestName: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(16), color: '#111827' },
  requestSubtext: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(13), color: '#6b7280' },
  requestTime: { fontFamily: 'AfacadFlux_600SemiBold', fontSize: rs(13), color: '#9ca3af' },
  requestPreview: { backgroundColor: '#f3f4f6', padding: rs(12), borderRadius: rs(8), marginBottom: rs(16) },
  requestPreviewText: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(14), color: '#374151' },
  requestActions: { flexDirection: 'row', justifyContent: 'space-between', gap: rs(12) },
  reqBtn: { flex: 1, paddingVertical: rs(10), borderRadius: rs(24), alignItems: 'center', justifyContent: 'center' },
  reqBtnAccept: { backgroundColor: '#ffb800' },
  reqBtnTextAccept: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(15), color: '#ffffff' },
  reqBtnDecline: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#9ca3af' },
  reqBtnTextDecline: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(15), color: '#9ca3af' },

  // View Activity specifics
  avatarContainer: { position: 'relative', marginRight: rs(16) },
  activityAvatar: { width: rs(54), height: rs(54), borderRadius: rs(27) },
  onlineDot: { position: 'absolute', top: 0, right: 0, width: rs(14), height: rs(14), borderRadius: rs(7), backgroundColor: '#10b981', borderWidth: 2, borderColor: '#ffffff' },
  offlineDot: { position: 'absolute', top: 0, right: 0, width: rs(14), height: rs(14), borderRadius: rs(7), backgroundColor: '#9ca3af', borderWidth: 2, borderColor: '#ffffff' },
  activityInfoLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  activityUserDetails: { flex: 1, justifyContent: 'center' },
  activityUserName: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(17), color: '#111827', lineHeight: rs(22) },
  flagActivity: { marginLeft: rs(4), fontSize: rs(14), marginTop: rs(2) },
  activityUserStatus: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(14), color: '#6b7280', lineHeight: rs(20) },
  activityUserStatusGray: { fontFamily: 'AfacadFlux_400Regular', fontSize: rs(14), color: '#9ca3af', lineHeight: rs(20) },
  activityMessageBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: rs(16), paddingVertical: rs(8), borderRadius: rs(24), borderWidth: 1, borderColor: '#ffb800', backgroundColor: '#ffffff' },
  activityMessageIcon: { width: rs(16), height: rs(16), marginRight: rs(6), resizeMode: 'contain', tintColor: '#ffb800' },
  activityMessageBtnText: { fontFamily: 'AfacadFlux_700Bold', fontSize: rs(15), color: '#ffb800' },
});
`;

fs.writeFileSync('src/app/(tabs)/messages.tsx', newContent);
console.log('Successfully updated messages.tsx');
