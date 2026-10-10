import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function AboutBeeBuddyScreen() {
  const router = useRouter();

  const renderMenuRow = (
    iconSource: any,
    label: string,
    isLast: boolean = false
  ) => (
    <TouchableOpacity style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.rowLeft}>
        <Image source={iconSource} style={styles.menuIcon} resizeMode="contain" />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
    </TouchableOpacity>
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
            <Text style={styles.headerTitle}>About BeeBuddy</Text>
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
          
          {/* Avatar & Info */}
          <View style={styles.heroSection}>
            <Image 
              source={require('../../../assets/images/BeeMascotCircle.png')} 
              style={styles.avatar} 
              resizeMode="contain" 
            />
            {/* The title uses Dongle_700Bold as requested */}
            <Text style={styles.appTitle}>BeeBuddy</Text>
            <Text style={styles.appVersion}>Version 2.1.0</Text>
          </View>

          {/* Links Card */}
          <View style={styles.card}>
            {renderMenuRow(require('../../../assets/images/doc.png'), 'Terms of Service')}
            {renderMenuRow(require('../../../assets/images/privacy.png'), 'Privacy Policy')}
            {renderMenuRow(require('../../../assets/images/open_src.png'), 'Open Source Licenses')}
            {renderMenuRow(require('../../../assets/images/rate.png'), 'Rate BeeBuddy', true)}
          </View>

          {/* Footer & Socials */}
          <View style={styles.footerSection}>
            <Text style={styles.copyrightText}>© 2025 BeeBuddy Inc. All rights reserved.</Text>
            <View style={styles.socialRow}>
              <TouchableOpacity>
                <Image source={require('../../../assets/images/instagram_about.png')} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../../assets/images/twitter_about.png')} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../../assets/images/facebook_about.png')} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>
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
    paddingBottom: TABBAR_HEIGHT + 60,
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
  heroSection: {
    alignItems: 'center',
    marginBottom: rs(30),
  },
  avatar: {
    width: rs(120),
    height: rs(120),
    marginBottom: rs(10),
  },
  appTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(50),
    color: '#000000',
    lineHeight: rs(50), // prevent clipping of large Dongle text
  },
  appVersion: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#6b7280',
    marginTop: -rs(5),
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
    marginBottom: rs(40),
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
  menuIcon: {
    width: rs(20),
    height: rs(20),
  },
  rowLabel: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(16),
    color: '#111827',
    marginLeft: rs(16),
  },
  footerSection: {
    alignItems: 'center',
    marginBottom: rs(20),
  },
  copyrightText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#9ca3af',
    marginBottom: rs(15),
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(20),
  },
  socialIcon: {
    width: rs(24),
    height: rs(24),
  },
});
