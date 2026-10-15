import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rs } from '../utils/scaling';

const { width } = Dimensions.get('window');
const TABBAR_HEIGHT = 55;

interface GuestTabBarMenuProps {
  activeTab?: 'home' | 'discover' | 'messages' | 'profile' | 'up-post' | 'add' | 'none';
}

export default function GuestTabBarMenu({ activeTab }: GuestTabBarMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const adjustedHeight = TABBAR_HEIGHT + insets.bottom;

  const isAddActive = activeTab === 'up-post' || activeTab === 'add';

  return (
    <ImageBackground 
      source={require('../../assets/images/Background_tabar.png')} 
      style={[styles.tabbarContainer, { height: rs(adjustedHeight), paddingBottom: insets.bottom }]} 
      imageStyle={{ resizeMode: 'stretch', width: width, height: rs(adjustedHeight) }}
    >
      
      {/* Home Tab */}
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => pathname !== '/(guest)/home' && activeTab !== 'home' && router.replace('/(guest)/home')}
      >
        {activeTab === 'home' ? (
          <View style={styles.homeActiveContainer}>
            <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
          </View>
        ) : (
          <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
        )}
      </TouchableOpacity>
      
      {/* Discover Tab */}
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => pathname !== '/(guest)/discover' && activeTab !== 'discover' && router.replace('/(guest)/discover')}
      >
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
        onPress={() => !isAddActive && router.replace('/(guest)/add')}
      >
        <View style={isAddActive ? styles.addBtnActive : styles.addBtn}>
          <Ionicons name="add" size={isAddActive ? rs(22) : rs(26)} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Messages Tab */}
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => pathname !== '/(guest)/messages' && activeTab !== 'messages' && router.replace('/(guest)/messages')}
      >
        {activeTab === 'messages' ? (
          <View style={styles.homeActiveContainer}>
            <Image source={require('../../assets/images/message-square.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
          </View>
        ) : (
          <Image source={require('../../assets/images/message-square.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
        )}
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => pathname !== '/(guest)/profile' && activeTab !== 'profile' && router.replace('/(guest)/profile')}
      >
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
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnActive: {
    width: rs(48),
    height: rs(30),
    borderRadius: rs(15),
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
