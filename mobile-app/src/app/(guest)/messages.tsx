import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  TextInput,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import GuestTabBarMenu from '../../components/GuestTabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 55;

export default function GuestMessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

  const openSignInModal = () => setIsSignInModalVisible(true);
  const closeSignInModal = () => setIsSignInModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <Image 
        source={require('../../../assets/images/hex_bg.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header Wave Overlay */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../../assets/images/Lop_phu_tren_profiel.png')} 
            style={styles.overlay} 
            resizeMode="cover" 
          />
          
          <View style={styles.headerContent}>
            {/* Top Row: Logo & Filter */}
            <View style={styles.topRow}>
              <Image 
                source={require('../../../assets/images/logo.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />

              <TouchableOpacity 
                style={styles.filterBtn} 
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Ionicons name="options-outline" size={rs(22)} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Title: Messages */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Messages</Text>
        </View>

        {/* Search Bar Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={rs(20)} color="#ffbb00" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search contacts" 
              placeholderTextColor="#9ca3af" 
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Card: Log in to continue */}
        <View style={styles.bannerContainer}>
          <View style={styles.card}>
            <View style={styles.loginBannerHeader}>
              {/* Vòng tròn ổ khóa Linear Gradient Cam */}
              <LinearGradient
                colors={['#ffb703', '#ff7a00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.lockCircle}
              >
                <Ionicons name="lock-closed" size={rs(24)} color="#ffffff" />
              </LinearGradient>

              <View style={styles.loginBannerText}>
                <Text style={styles.loginBannerTitle}>Log in to continue</Text>
                <Text style={styles.loginBannerDesc}>You need to log in to connect</Text>
              </View>
            </View>

            <View style={styles.authButtonsRow}>
              {/* Nút Log in Linear Gradient Cam */}
              <TouchableOpacity 
                style={styles.loginBtnWrapper}
                onPress={() => router.replace('/(auth)/login')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#ffb703', '#ff7a00']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginBtn}
                >
                  <Text style={styles.loginBtnText}>Log in</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.signUpBtn}
                onPress={() => router.replace('/(auth)/login')}
                activeOpacity={0.8}
              >
                <Text style={styles.signUpBtnText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Mascot Illustration & Description */}
        <View style={styles.emptyStateContainer}>
          <Image 
            source={require('../../../assets/images/guest_messages_mascot.gif')} 
            style={styles.mascotGif} 
            resizeMode="contain" 
          />

          <Text style={styles.emptyTitle}>Log in to enjoy the connection</Text>
          <Text style={styles.emptySubtitle}>
            Log in to unlock messages and start chatting with the community.
          </Text>
        </View>
      </ScrollView>

      {/* Sign In Required Modal (Chuẩn theo Sign_In_Request.png) */}
      <Modal
        visible={isSignInModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSignInModal}
      >
        <TouchableWithoutFeedback onPress={closeSignInModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.signInCard}>
                <Text style={styles.signInTitle}>Sign in required</Text>
                <Text style={styles.signInDesc}>
                  Log in or create an account{'\n'}to comment and share.
                </Text>
                <TouchableOpacity
                  style={styles.signInBtn}
                  onPress={() => {
                    closeSignInModal();
                    router.replace('/(auth)/login');
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signInBtnText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Guest TabBar with Messages Active */}
      <GuestTabBarMenu activeTab="messages" />

      {/* Floating Bee AI (TOPMOST LAYER) */}
      <AISup isGuest={true} />
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
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT + rs(60),
    marginBottom: rs(0),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  headerContent: {
    paddingHorizontal: rs(20),
    paddingTop: rs(75),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rs(48),
  },
  logo: {
    width: rs(32),
    height: rs(50),
  },
  filterBtn: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(14),
    backgroundColor: '#ffffff',
    borderWidth: 1.2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(1) },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  /* Title Section */
  titleSection: {
    paddingHorizontal: rs(20),
    marginTop: rs(14),
  },
  screenTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(26),
    color: '#111827',
  },

  /* Search Section */
  searchSection: {
    paddingHorizontal: rs(16),
    marginTop: rs(14),
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    borderWidth: 1.2,
    borderColor: '#ffbb00',
    height: rs(46),
    paddingHorizontal: rs(16),
  },
  searchIcon: {
    marginRight: rs(10),
  },
  searchInput: {
    flex: 1,
    fontSize: rs(15),
    color: '#111827',
    fontFamily: 'AfacadFlux_400Regular',
    height: '100%',
  },

  /* Card: Log in to continue */
  bannerContainer: {
    paddingHorizontal: rs(16),
    marginTop: rs(16),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    padding: rs(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  loginBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockCircle: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBannerText: {
    marginLeft: rs(14),
    flex: 1,
  },
  loginBannerTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(19.5),
    color: '#ff9500',
  },
  loginBannerDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#6b7280',
    marginTop: rs(2),
  },
  authButtonsRow: {
    flexDirection: 'row',
    gap: rs(12),
    marginTop: rs(14),
  },
  loginBtnWrapper: {
    flex: 1,
  },
  loginBtn: {
    height: rs(40),
    borderRadius: rs(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14.5),
    color: '#ffffff',
  },
  signUpBtn: {
    flex: 1,
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#ff9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14.5),
    color: '#ff9500',
  },

  /* Empty State / Mascot */
  emptyStateContainer: {
    alignItems: 'center',
    marginTop: rs(24),
    paddingHorizontal: rs(20),
  },
  mascotGif: {
    width: rs(250),
    height: rs(210),
  },
  emptyTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#ff9500',
    textAlign: 'center',
    marginTop: -rs(14),
  },
  emptySubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(18),
    marginTop: rs(6),
    maxWidth: rs(290),
  },

  /* Sign In Required Modal Styles (Sign_In_Request.png) */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInCard: {
    width: rs(230),
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    paddingVertical: rs(18),
    paddingHorizontal: rs(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  signInTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17.5),
    color: '#ffaa00',
    marginBottom: rs(6),
  },
  signInDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: rs(17),
    marginBottom: rs(14),
  },
  signInBtn: {
    backgroundColor: '#ffb703',
    paddingVertical: rs(6),
    paddingHorizontal: rs(28),
    borderRadius: rs(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
    color: '#000000',
  },
});
