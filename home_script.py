import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const OVERLAY_HEIGHT = width * (195 / 430); 
const LOGO_HEIGHT = width * (42 / 393);
const TABBAR_HEIGHT = 65; 

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      {/* Background with hexagons could go here */}
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Overlay */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../../assets/images/top_overlay.png')} 
            style={styles.overlay} 
            resizeMode="cover" 
          />
          
          <View style={styles.headerTop}>
            {/* Logo and Public Badge */}
            <View style={styles.logoAndBadge}>
              <Image 
                source={require('../../../assets/images/logo_color.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />
              <View style={styles.publicBadge}>
                <Text style={styles.publicBadgeText}>Public</Text>
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content can go here */}
        <View style={{ flex: 1, minHeight: 400 }}></View>
      </ScrollView>

      {/* Floating Bee AI */}
      <View style={styles.floatingBee} pointerEvents="box-none">
        <Image
          source={require('../../../assets/images/ai_login.png')}
          style={styles.floatingBeeImg}
          resizeMode="contain"
        />
      </View>

      {/* TabBar Coded UI */}
      <View style={styles.tabbarContainer}>
        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.homeActiveContainer}>
            <Ionicons name="home-outline" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="compass-outline" size={28} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItemAdd}>
          <View style={styles.addBtn}>
            <Ionicons name="add" size={32} color="#ffbb00" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={26} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)/profile')}>
          <View style={styles.profileInactiveBorder}>
            <Image 
              source={require('../../../assets/images/avatar_v2_0.png')} 
              style={styles.profileAvatar} 
              resizeMode="contain" 
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerTop: {
    position: 'absolute',
    top: OVERLAY_HEIGHT * 0.4,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  logoAndBadge: {
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 32,
    marginBottom: 10,
  },
  publicBadge: {
    backgroundColor: '#ffb703',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  publicBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 44,
    height: 44,
    backgroundColor: '#ffb703',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  floatingBee: {
    position: 'absolute',
    bottom: TABBAR_HEIGHT + 20,
    left: 10,
  },
  floatingBeeImg: {
    width: 80,
    height: 80,
  },
  tabbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: TABBAR_HEIGHT,
    backgroundColor: '#ffb703', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 15,
  },
  tabItemAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 15,
  },
  addBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#000',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeActiveContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInactiveBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  }
});
