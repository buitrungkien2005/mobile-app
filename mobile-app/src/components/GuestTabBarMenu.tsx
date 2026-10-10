import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { rs } from '../utils/scaling';

const { width } = Dimensions.get('window');
const TABBAR_HEIGHT = 55;

interface GuestTabBarMenuProps {
  activeTab?: 'home' | 'discover' | 'messages' | 'profile' | 'none';
}

export default function GuestTabBarMenu({ activeTab }: GuestTabBarMenuProps) {
  const router = useRouter();

  return (
    <View style={styles.tabbarContainer}>
      
      {/* Home Tab */}
      <TouchableOpacity style={styles.tabItem} onPress={() => activeTab !== 'home' && router.replace('/(guest)/home')}>
        {activeTab === 'home' ? (
          <View style={styles.homeActiveContainer}>
            <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26), tintColor: '#fff' }} resizeMode="contain" />
          </View>
        ) : (
          <Image source={require('../../assets/images/TabItem-Home.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
        )}
      </TouchableOpacity>
      
      {/* Discover Tab */}
      <TouchableOpacity style={styles.tabItem}>
        <Image source={require('../../assets/images/compass.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
      </TouchableOpacity>

      {/* Add Button */}
      <TouchableOpacity style={styles.tabItemAdd}>
        <View style={styles.addBtn}>
          <Ionicons name="add" size={rs(38)} color="#ffb703" />
        </View>
      </TouchableOpacity>

      {/* Messages Tab */}
      <TouchableOpacity style={styles.tabItem}>
        <Image source={require('../../assets/images/message-square.png')} style={{ width: rs(26), height: rs(26) }} resizeMode="contain" />
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity style={styles.tabItem}>
        {activeTab === 'profile' ? (
          <View style={styles.profileActiveBorder}>
            <Image source={require('../../assets/images/icon_guest.png')} style={{ width: rs(36), height: rs(36) }} resizeMode="contain" />
          </View>
        ) : (
          <Image source={require('../../assets/images/icon_guest.png')} style={{ width: rs(36), height: rs(36) }} resizeMode="contain" />
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
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
