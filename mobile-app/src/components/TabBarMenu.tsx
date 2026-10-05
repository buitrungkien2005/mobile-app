import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rs } from '../utils/scaling';

const { width } = Dimensions.get('window');
const TABBAR_HEIGHT = 65;

interface TabBarMenuProps {
  activeTab?: 'home' | 'discover' | 'messages' | 'profile' | 'up-post' | 'none';
}

export default function TabBarMenu({ activeTab }: TabBarMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const adjustedHeight = TABBAR_HEIGHT + insets.bottom;

  const handleProfilePress = () => {
    // If we're already on the main profile screen, do nothing
    if (pathname === '/profile') return;
    // Otherwise, always go to the profile screen when this tab is tapped
    router.replace('/(tabs)/profile');
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/Background_tabar.png')} 
      style={[styles.tabbarContainer, { height: rs(adjustedHeight), paddingBottom: insets.bottom }]} 
      imageStyle={{ resizeMode: 'stretch', width: width, height: rs(adjustedHeight) }}
    >
      
      {/* Home Tab */}
      <TouchableOpacity style={styles.tabItem} onPress={() => activeTab !== 'home' && router.replace('/(tabs)/home')}>
        {activeTab === 'home' ? (
          <View style={styles.homeActiveContainer}>
            <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
          </View>
        ) : (
          <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
        )}
      </TouchableOpacity>
      
      {/* Discover Tab */}
      <TouchableOpacity style={styles.tabItem} onPress={() => activeTab !== 'discover' && router.replace('/(tabs)/discover')}>
        {activeTab === 'discover' ? (
          <View style={styles.homeActiveContainer}>
            <Image source={require('../../assets/images/compass.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
          </View>
        ) : (
          <Image source={require('../../assets/images/compass.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
        )}
      </TouchableOpacity>

      {/* Add Button */}
      <TouchableOpacity 
        style={styles.tabItemAdd} 
        onPress={() => activeTab !== 'up-post' && router.replace('/(tabs)/up-post')}
      >
        <View style={[styles.addBtn, activeTab === 'up-post' && { backgroundColor: '#ffb703' }]}>
          <Ionicons name="add" size={rs(38)} color={activeTab === 'up-post' ? '#000' : '#ffb703'} />
        </View>
      </TouchableOpacity>

      {/* Messages Tab */}
      <TouchableOpacity style={styles.tabItem}>
        <Image source={require('../../assets/images/message-square.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity style={styles.tabItem} onPress={handleProfilePress}>
        {activeTab === 'profile' ? (
          <View style={styles.profileActiveBorder}>
            <Image source={require('../../assets/images/TabItem-Profile.png')} style={{ width: rs(36), height: rs(36) }} resizeMode="contain" />
          </View>
        ) : (
          <Image source={require('../../assets/images/TabItem-Profile.png')} style={{ width: rs(36), height: rs(36) }} resizeMode="contain" />
        )}
      </TouchableOpacity>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  tabbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: TABBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: rs(10),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabItemAdd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  addBtn: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeActiveContainer: {
    width: rs(54),
    height: rs(34),
    backgroundColor: '#000',
    borderRadius: rs(17),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileActiveBorder: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }
});
