import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');

const OVERLAY_HEIGHT = width * (67 / 393); // Lớp phủ mới
const LOGO_HEIGHT = width * (42 / 393);
const TABBAR_HEIGHT = 65; // Cố định chiều cao thanh tabbar

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Overlay */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../../assets/images/profile_overlay_new.png')} 
            style={styles.overlay} 
            resizeMode="cover" 
          />
        </View>

        {/* Brand Logo */}
        <View style={styles.logoWrapper}>
          <Image 
            source={require('../../../assets/images/BrandLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        {/* Thông tin Profile */}
        <View style={styles.profileSection}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              <Image 
                source={require('../../../assets/images/AvatarOuter.png')}
                style={styles.avatarImage}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity style={styles.cameraBtn}>
              <Ionicons name="camera" size={rs(16)} color="#fff" style={{ opacity: 0 }} />
            </TouchableOpacity>
          </View>

          {/* Tên & Username */}
          <Text style={styles.nameText}>Buzzy</Text>
          <Text style={styles.usernameText}>@buzzy_bee</Text>

          {/* Thống kê */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>350</Text>
              <Text style={styles.statLabel}>Hive Points</Text>
            </View>
          </View>

          {/* Nút thao tác */}
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/profile-setting')}>
            <Text style={styles.actionBtnText}>Settings</Text>
          </TouchableOpacity>

          {/* Bio */}
          <View style={styles.bioCard}>
            <Text style={styles.bioTitle}>My Buzzing Bio</Text>
            <Text style={styles.bioText}>
              Just a busy bee making sweet memories in BeeBuddy! Love sharing honey tips and making flower connections.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bee AI */}
      <AISup />

      {/* TabBar Coded UI */}
      <TabBarMenu activeTab="profile" />
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
    height: OVERLAY_HEIGHT,
    width: '100%',
    },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logoWrapper: {
    paddingHorizontal: rs(24),
    marginTop: rs(10),
    alignItems: 'flex-start',
  },
  logo: {
    width: rs(27),
    height: rs(42),
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: rs(24),
    marginTop: rs(15),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: rs(12),
  },
  avatarBorder: {
    width: rs(116),
    height: rs(118),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: rs(116),
    height: rs(118),
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  nameText: {
    fontSize: rs(22),
    fontWeight: 'bold',
    color: '#111827',
  },
  usernameText: {
    fontSize: rs(14),
    color: '#6b7280',
    marginTop: rs(4),
    marginBottom: rs(24),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: rs(24),
  },
  statBox: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    paddingVertical: rs(16),
    width: '31%',
    alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statNumber: {
    fontSize: rs(18),
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: rs(11),
    color: '#6b7280',
    marginTop: rs(4),
  },
  actionBtn: {
    width: '100%',
    height: rs(48),
    borderRadius: rs(24),
    borderWidth: 1.5,
    borderColor: '#ff7b00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  actionBtnText: {
    color: '#ff7b00',
    fontSize: rs(15),
    fontWeight: 'bold',
  },
  bioCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    padding: rs(20),
    marginTop: rs(8),
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  bioTitle: {
    color: '#ff7b00',
    fontSize: rs(15),
    fontWeight: 'bold',
    marginBottom: rs(10),
  },
  bioText: {
    fontSize: rs(14),
    color: '#374151',
    lineHeight: rs(22),
  }
});


