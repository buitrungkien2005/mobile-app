import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { rs } from '../../utils/scaling';


const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393); // Match profile.tsx
const TABBAR_HEIGHT = 65;

export default function ProfileSettingScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Basic navigation back to login (or index)
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Hexagon Background Pattern */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../../assets/images/profile_overlay_new.png')} 
            style={styles.overlay} 
            resizeMode="cover" 
          />
          
          <Image 
            source={require('../../../assets/images/BrandLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        {/* Settings Content */}
        <View style={styles.contentContainer}>
          
          {/* Account Group */}
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => router.push('/(tabs)/profile-info')}
            >
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/user.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <Text style={styles.menuText}>Account Info</Text>
              </View>
              <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/change-password')}
            >
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/lock.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <Text style={styles.menuText}>Change Password</Text>
              </View>
              <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
            </TouchableOpacity>
            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/privacy-safety')}
            >
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/eye.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <Text style={styles.menuText}>Privacy & Safety</Text>
              </View>
              <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Preferences Group */}
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/notifications')}
            >
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/bell.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <Text style={styles.menuText}>Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/language')}
            >
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/globe.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <Text style={styles.menuText}>Language</Text>
              </View>
              <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
            </TouchableOpacity>
            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/theme')}
            >
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/moon.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <Text style={styles.menuText}>Theme</Text>
              </View>
              <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Support Group */}
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/help-center')}
            >
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/help-circle.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <Text style={styles.menuText}>Help Center</Text>
              </View>
              <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/info.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <Text style={styles.menuText}>About BeeBuddy</Text>
              </View>
              <Ionicons name="chevron-forward" size={rs(18)} color="#9ca3af" />
            </TouchableOpacity>
            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuLeft}>
                <Image source={require('../../../assets/images/log-out.png')} style={{ width: rs(20), height: rs(20) }} resizeMode="contain" />
                <MaskedView
                  style={{ height: rs(24), justifyContent: 'center' }}
                  maskElement={
                    <Text style={[styles.menuText, { fontFamily: 'Inter_700Bold' }]}>Log Out</Text>
                  }
                >
                  <LinearGradient
                    colors={['#ffbb00', '#ff7b00']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, width: rs(100) }} // Ensure width covers text
                  />
                </MaskedView>
              </View>
            </TouchableOpacity>
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
    opacity: 0.3,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 20,
  },
  headerContainer: {
    height: OVERLAY_HEIGHT,
    width: '100%',
    },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  logo: {
    position: 'absolute',
    top: rs(85),
    
    left: rs(20),
    width: rs(40),
    height: rs(60),
  },
  contentContainer: {
    paddingHorizontal: rs(20),
    paddingTop: rs(70),
  },
  sectionTitle: {
    fontSize: rs(24),
    color: '#ffbb00',
    marginBottom: rs(5),
    marginTop: rs(20),
    fontFamily: 'Dongle_700Bold',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rs(16),
    paddingHorizontal: rs(16),
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: rs(16),
    color: '#111827',
    marginLeft: rs(12),
    fontFamily: 'AfacadFlux_600SemiBold',
  },
  divider: {
    height: rs(1),
    backgroundColor: '#f3f4f6',
    width: '100%',
  }
});


