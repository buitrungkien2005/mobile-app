import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';


const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function HelpCenterScreen() {
  const router = useRouter();

  const helpTopics = [
    { id: '1', title: 'Getting Started', icon: require('../../../assets/images/icon-frame.png') },
    { id: '2', title: 'Account & Profile', icon: require('../../../assets/images/user1.png') },
    { id: '3', title: 'Connections & Friends', icon: require('../../../assets/images/user2.png') },
    { id: '4', title: 'Posts & Content', icon: require('../../../assets/images/picture.png') },
    { id: '5', title: 'Privacy & Security', icon: require('../../../assets/images/lock2.png') },
    { id: '6', title: 'Notifications', icon: require('../../../assets/images/bell2.png') },
    { id: '7', title: 'Troubleshooting', icon: require('../../../assets/images/kit.png') },
  ];

  return (
    <View style={styles.container}>
      {/* Background */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      {/* Header Overlay & Top Row */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={styles.overlay} 
          resizeMode="cover" 
        />
        <View style={styles.headerTop}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={rs(12)} color="#111827" style={{ marginTop: rs(12), marginRight: rs(6) }} />
            <Text style={styles.headerTitle}>Help Center</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../../assets/images/BrandLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={rs(18)} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search help topics..."
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Topics List Card */}
          <View style={styles.card}>
            {helpTopics.map((topic, index) => (
              <View key={topic.id} style={styles.rowWrapper}>
                <TouchableOpacity style={styles.row} activeOpacity={0.6}>
                  <View style={styles.rowLeft}>
                    <Image source={topic.icon} style={styles.topicIcon} resizeMode="contain" />
                    <Text style={styles.rowLabel}>{topic.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={rs(16)} color="#9ca3af" />
                </TouchableOpacity>
                {/* Divider (except last item) */}
                {index < helpTopics.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* Floating AI Bee */}
      <AISup isGuest={false} />

      {/* TabBar */}
      <TabBarMenu activeTab="profile" />
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
    opacity: 0.2,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    height: OVERLAY_HEIGHT + 90,
    width: '100%',
    },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  headerTop: {
    paddingTop: rs(85),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    
  },
  headerTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(36),
    color: '#000',
    marginTop: rs(15),
  },
  logo: {
    width: rs(35),
    height: rs(50),
  },
  contentContainer: {
    paddingHorizontal: rs(20),
    paddingTop: rs(10),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: rs(10),
    paddingHorizontal: rs(14),
    paddingVertical: rs(8),
    marginBottom: rs(24),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: rs(8),
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#111827',
    paddingVertical: rs(2),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  rowWrapper: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rs(18),
    paddingHorizontal: rs(20),
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicIcon: {
    width: rs(20),
    height: rs(20),
  },
  rowLabel: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#111827',
    marginLeft: rs(16),
  },
  divider: {
    height: rs(1),
    backgroundColor: '#f3f4f6',
    width: '100%',
  },
});

