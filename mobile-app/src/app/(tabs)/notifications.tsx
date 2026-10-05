import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { rs } from '../../utils/scaling';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);

const NOTIFICATIONS = [
  {
    id: 1,
    name: 'Linh Nguyen',
    action: 'wants to connect with you',
    time: '2m ago',
    unread: true,
    avatar: require('../../../assets/images/Avatar_LinhNguyen.png'),
    hasConnectBtn: true,
  },
  {
    id: 2,
    name: 'Minh Tran',
    action: 'commented on your photo post',
    time: '1h ago',
    unread: true,
    avatar: require('../../../assets/images/Avatar_MinhTran2.png'),
  },
  {
    id: 3,
    name: 'Weekend Hikers',
    action: 'approved your join request',
    time: '4h ago',
    unread: false,
    avatar: require('../../../assets/images/Avatar_WeekendHikers.png'), // placeholder
  },
  {
    id: 4,
    name: 'Photography Walk',
    action: 'starts in 1 hour! Meet at post office',
    time: '5h ago',
    unread: false,
    isIcon: true,
  },
  {
    id: 5,
    name: 'Jake Miller',
    action: "liked your post 'First day hiking Ba Den'",
    time: '1d ago',
    unread: false,
    avatar: require('../../../assets/images/Avatar_JakeMiller.png'), // Jake Miller placeholder
  }
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isEmpty, setIsEmpty] = useState(false);

  const NotificationItem = ({ item }: any) => (
    <View style={[styles.notificationCard, item.unread && styles.unreadCard]}>
      {item.unread && <View style={styles.unreadStrip} />}
      
      <View style={styles.cardContent}>
        <View style={styles.avatarWrapper}>
          {item.isIcon ? (
            <View style={styles.iconAvatar}>
              <Ionicons name="notifications" size={rs(20)} color="#fff" />
            </View>
          ) : (
            <Image source={item.avatar} style={styles.avatarImg} resizeMode="cover" />
          )}
        </View>
        
        <View style={styles.textContent}>
          <Text style={styles.notificationText}>
            <Text style={styles.boldName}>{item.name}</Text> {item.action}
          </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        {item.hasConnectBtn && (
          <TouchableOpacity style={styles.connectBtn}>
            <Text style={styles.connectBtnText}>Connect</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background Wave */}
      <ImageBackground 
        source={require('../../../assets/images/profile_overlay_new.png')}
        style={[styles.topOverlay, { height: OVERLAY_HEIGHT }]}
        imageStyle={{ resizeMode: 'cover' }}
      />
      
      <ScrollView 
        style={styles.scrollBody} 
        contentContainerStyle={{ paddingTop: OVERLAY_HEIGHT + rs(10), paddingBottom: rs(100) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Row */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Notifications</Text>
          {!isEmpty && (
            <TouchableOpacity onPress={() => setIsEmpty(true)}>
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {!isEmpty ? (
          <>
            {/* Filter Pills */}
            <View style={styles.filtersRow}>
              {['All', 'Activity', 'Updates'].map((filter) => (
                <TouchableOpacity 
                  key={filter}
                  style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Notifications List */}
            <View style={styles.listContainer}>
              {NOTIFICATIONS.map(item => (
                <NotificationItem key={item.id} item={item} />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Image source={require('../../../assets/images/empty_notifications.gif')} style={styles.emptyGif} resizeMode="contain" />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtext}>
              When you get updates, connection alerts,{"\n"}and reminders, they will appear here!
            </Text>
          </View>
        )}
      </ScrollView>

      <AISup />
      <TabBarMenu activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0,
  },
  scrollBody: {
    flex: 1,

  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    marginBottom: rs(20),
  },
  pageTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(24),
    color: '#111827',
  },
  markReadText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
    color: '#f59e0b',
    textDecorationLine: 'underline',
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: rs(20),
    marginBottom: rs(20),
    gap: rs(10),
  },
  filterPill: {
    paddingHorizontal: rs(16),
    paddingVertical: rs(8),
    borderRadius: rs(20),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterPillActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  filterText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: rs(20),
    gap: rs(12),
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  unreadCard: {
    backgroundColor: '#fffcf2',
    borderColor: '#fef3c7',
  },
  unreadStrip: {
    width: rs(4),
    backgroundColor: '#f59e0b',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    padding: rs(16),
    paddingLeft: rs(20),
    alignItems: 'center',
  },
  avatarWrapper: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    overflow: 'hidden',
    marginRight: rs(12),
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  iconAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  notificationText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
    color: '#374151',
    lineHeight: rs(20),
    marginBottom: rs(4),
  },
  boldName: {
    fontFamily: 'AfacadFlux_600SemiBold',
    color: '#111827',
  },
  timeText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(12),
    color: '#9ca3af',
  },
  connectBtn: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: rs(16),
    paddingVertical: rs(6),
    borderRadius: rs(6),
    marginLeft: rs(10),
  },
  connectBtnText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(13),
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: rs(40),
    marginTop: rs(30),
  },
  emptyGif: {
    width: rs(400),
    height: rs(300),
    marginBottom: rs(20),
  },
  emptyTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(20),
    color: '#111827',
    marginBottom: rs(10),
  },
  emptySubtext: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(22),
  },
});
