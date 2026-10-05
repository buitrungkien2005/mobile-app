import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import CustomSwitch from '../../components/CustomSwitch';
import { rs } from '../../utils/scaling';


const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function PrivacySafetyScreen() {
  const router = useRouter();

  // Privacy States
  const [isPrivateAccount, setIsPrivateAccount] = useState(true);
  const [isShowOnlineStatus, setIsShowOnlineStatus] = useState(false);
  const [isAllowDiscovery, setIsAllowDiscovery] = useState(true);

  // Safety States
  const [isBlockInappropriate, setIsBlockInappropriate] = useState(true);
  const [isTwoFactor, setIsTwoFactor] = useState(false);
  const [isLoginAlerts, setIsLoginAlerts] = useState(true);

  const renderSwitchRow = (
    iconName: keyof typeof Ionicons.glyphMap,
    label: string,
    value: boolean,
    onValueChange: (val: boolean) => void,
    isLast: boolean = false
  ) => (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.rowLeft}>
        <Ionicons name={iconName} size={rs(24)} color="#ff7b00" />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <CustomSwitch value={value} onValueChange={onValueChange} />
    </View>
  );

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
        {/* Header Top Row */}
        <View style={styles.headerTop}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={rs(12)} color="#111827" style={{ marginTop: rs(12), marginRight: rs(6) }} />
            <Text style={styles.headerTitle}>Privacy & Safety</Text>
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
          
          {/* Privacy Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy</Text>
            <View style={styles.card}>
              {renderSwitchRow('lock-closed-outline', 'Private Account', isPrivateAccount, setIsPrivateAccount)}
              {renderSwitchRow('pulse-outline', 'Show Online Status', isShowOnlineStatus, setIsShowOnlineStatus)}
              {renderSwitchRow('search-outline', 'Allow Profile Discovery', isAllowDiscovery, setIsAllowDiscovery, true)}
            </View>
          </View>

          {/* Safety Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Safety</Text>
            <View style={styles.card}>
              {renderSwitchRow('shield-outline', 'Block Inappropriate Content', isBlockInappropriate, setIsBlockInappropriate)}
              {renderSwitchRow('key-outline', 'Two-Factor Authentication', isTwoFactor, setIsTwoFactor)}
              {renderSwitchRow('notifications-outline', 'Login Alerts', isLoginAlerts, setIsLoginAlerts, true)}
            </View>
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
  section: {
    marginBottom: rs(30),
  },
  sectionTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(20),
    color: '#111827',
    marginBottom: rs(12),
    marginLeft: rs(4),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rs(16),
    paddingHorizontal: rs(20),
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#111827',
    marginLeft: rs(16),
  },
});

