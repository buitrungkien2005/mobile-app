import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GuestTabBarMenu from '../../components/GuestTabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = 160;
const TABBAR_HEIGHT = 65;

export default function GuestHomeScreen() {
  return (
    <View style={styles.container}>
      
      {/* Hexagon Background Pattern */}
      <Image 
        source={require('../../../assets/images/hex_bg.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../../assets/images/top_overlay.png')} 
            style={styles.overlay} 
            resizeMode="cover" 
          />
          
          <View style={styles.headerContent}>
            {/* Top Row: Logo & Search */}
            <View style={styles.topRow}>
              <Image 
                source={require('../../../assets/images/logo_color.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />
              <TouchableOpacity style={styles.searchBtn}>
                <Ionicons name="search" size={rs(24)} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Public Badge */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Public</Text>
            </View>
          </View>
        </View>
        
        {/* Guest content area (can add more later) */}
        <View style={styles.mainContent}>
        </View>

      </ScrollView>

      {/* Floating Bee AI */}
      <AISup isGuest={true} />

      {/* TabBar Coded UI */}
      <GuestTabBarMenu activeTab="home" />
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
    top: rs(100),
    left: 0,
    width: '100%',
    height: rs(400),
    opacity: 0.5,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerContent: {
    paddingHorizontal: rs(20),
    paddingTop: rs(50), // Avoid safe area notch
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: rs(32),
    height: rs(48),
  },
  searchBtn: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeContainer: {
    marginTop: rs(15),
    backgroundColor: '#ffb703',
    paddingVertical: rs(6),
    paddingHorizontal: rs(16),
    borderRadius: rs(12),
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: rs(14),
  },
  mainContent: {
    flex: 1,
  }
});
