import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
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

export default function GuestAddScreen() {
  const router = useRouter();
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
            {/* Top Row: Logo & Search Button */}
            <View style={styles.topRow}>
              <Image 
                source={require('../../../assets/images/logo.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />

              <TouchableOpacity 
                style={styles.searchBtn} 
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Ionicons name="search" size={rs(22)} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Cards */}
        <View style={styles.cardsContainer}>

          {/* === CARD 1: Log in to continue === */}
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
                <Text style={styles.loginBannerDesc}>You need to log in to create post</Text>
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

          {/* === CARD 2: Write a caption === */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="image-outline" size={rs(18)} color="#f59e0b" />
              </View>
              <Text style={styles.cardTitle}>Write a caption</Text>
            </View>

            <TouchableOpacity 
              style={styles.captionInputBox}
              onPress={openSignInModal}
              activeOpacity={0.8}
            >
              <Text style={styles.captionPlaceholder}>Log in to write a caption...</Text>
              <View style={styles.smallLockBadge}>
                <Ionicons name="lock-closed" size={rs(12)} color="#f59e0b" />
              </View>
            </TouchableOpacity>
          </View>

          {/* === CARD 3: Photos & Videos === */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="image-outline" size={rs(18)} color="#f59e0b" />
              </View>
              <Text style={styles.cardTitle}>Photos & Videos</Text>
            </View>

            {/* Sub-card 1: Locked */}
            <TouchableOpacity 
              style={styles.lockedBox}
              onPress={openSignInModal}
              activeOpacity={0.8}
            >
              <View style={styles.warningCircle}>
                <Ionicons name="warning-outline" size={rs(24)} color="#f97316" />
              </View>
              <Text style={styles.lockedTitle}>Locked</Text>
              <Text style={styles.lockedDesc}>
                Log in to share your photos and videos with the{'\n'}BeeBuddy community
              </Text>
            </TouchableOpacity>

            {/* Sub-card 2: Allow access */}
            <View style={styles.accessBox}>
              <Text style={styles.accessTitle}>Allow access to your Photos & Videos</Text>
              <Text style={styles.accessDesc}>
                To upload photos and videos to your post, allow{'\n'}BeeBuddy to access your device library
              </Text>

              <TouchableOpacity 
                style={styles.openSettingsBtn}
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Text style={styles.openSettingsBtnText}>Open Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.learnMoreRow}
                onPress={openSignInModal}
                activeOpacity={0.7}
              >
                <Text style={styles.learnMoreText}>Learn more</Text>
                <Ionicons name="chevron-down" size={rs(14)} color="#f59e0b" style={{ marginLeft: rs(4) }} />
              </TouchableOpacity>
            </View>

            {/* Row: Share library and data */}
            <View style={styles.settingRow}>
              <Text style={styles.settingRowText}>Share library and data</Text>
              <TouchableOpacity 
                style={styles.settingsBtnOutline}
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Text style={styles.settingsBtnText}>Settings</Text>
                <Ionicons name="arrow-forward" size={rs(13)} color="#f59e0b" style={{ marginLeft: rs(4) }} />
              </TouchableOpacity>
            </View>

            {/* Row: Allow library access */}
            <View style={styles.settingRow}>
              <Text style={styles.settingRowText}>Allow library access</Text>
              <TouchableOpacity 
                style={styles.settingsBtnOutline}
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Text style={styles.settingsBtnText}>Settings</Text>
                <Ionicons name="arrow-forward" size={rs(13)} color="#f59e0b" style={{ marginLeft: rs(4) }} />
              </TouchableOpacity>
            </View>

            {/* Sub-card 3: Guest Access - Limited Permissions */}
            <View style={styles.guestAccessBox}>
              <Text style={styles.guestAccessTitle}>Guest Access - Limited Permissions</Text>
              <Text style={styles.guestAccessDesc}>
                Guests have limited access. Sign up to unlock full photo and video sharing.
              </Text>

              <TouchableOpacity 
                style={styles.guestSettingsBtn}
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Text style={styles.guestSettingsBtnText}>Guest Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.learnMoreRow}
                onPress={openSignInModal}
                activeOpacity={0.7}
              >
                <Text style={styles.learnMoreText}>Learn more</Text>
                <Ionicons name="chevron-down" size={rs(14)} color="#f59e0b" style={{ marginLeft: rs(4) }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* === CARD 4: Who can see this post? === */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="chatbubble-outline" size={rs(18)} color="#f59e0b" />
              </View>
              <Text style={styles.cardTitle}>Who can see this post?</Text>
            </View>

            {/* Audience Pills */}
            <View style={styles.audiencePillsRow}>
              <TouchableOpacity 
                style={styles.audiencePill}
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Ionicons name="compass-outline" size={rs(14)} color="#9ca3af" />
                <Text style={styles.audiencePillText}>Everyone</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.audiencePill}
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Ionicons name="people-outline" size={rs(14)} color="#9ca3af" />
                <Text style={styles.audiencePillText}>Friends</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.audiencePill}
                onPress={openSignInModal}
                activeOpacity={0.8}
              >
                <Ionicons name="lock-closed-outline" size={rs(14)} color="#9ca3af" />
                <Text style={styles.audiencePillText}>Close Friends</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.audienceHintText}>
              You'll be able to choose who can see your post after logging in.
            </Text>
          </View>

          {/* === CARD 5: Bottom Alert Card (As a guest...) === */}
          <View style={styles.guestAlertCard}>
            <View style={styles.alertHeaderRow}>
              <View style={styles.alertExclamationCircle}>
                <Text style={styles.alertExclamationText}>!</Text>
              </View>
              <Text style={styles.alertTitle}>As a guest, you can't create posts yet.</Text>
            </View>
            <Text style={styles.alertBody}>
              Browse or sign up to share your moments, connect with others, and be part of BeeBuddy!
            </Text>
          </View>

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

      {/* Guest TabBar with Add Active */}
      <GuestTabBarMenu activeTab="add" />

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

  /* Cards Section */
  cardsContainer: {
    paddingHorizontal: rs(16),
    marginTop: rs(16),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    padding: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  /* Card 1: Log in to continue */
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

  /* Card Header common */
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
  },
  iconBox: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(10),
    borderWidth: 1.2,
    borderColor: '#fde047',
    backgroundColor: '#fffbeb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  cardTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16.5),
    color: '#111827',
  },

  /* Card 2: Write a caption */
  captionInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: rs(14),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    height: rs(48),
    paddingHorizontal: rs(14),
  },
  captionPlaceholder: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13.5),
    color: '#9ca3af',
    flex: 1,
  },
  smallLockBadge: {
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: '#fde047',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Card 3: Photos & Videos */
  lockedBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(18),
    backgroundColor: '#ffffff',
    paddingVertical: rs(24),
    paddingHorizontal: rs(16),
    alignItems: 'center',
  },
  warningCircle: {
    width: rs(50),
    height: rs(50),
    borderRadius: rs(25),
    borderWidth: 1,
    borderColor: '#fed7aa',
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#111827',
    marginTop: rs(10),
  },
  lockedDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(17),
    marginTop: rs(4),
  },
  accessBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(18),
    backgroundColor: '#ffffff',
    padding: rs(16),
    marginTop: rs(12),
    alignItems: 'center',
  },
  accessTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#111827',
    textAlign: 'center',
  },
  accessDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(16),
    marginTop: rs(4),
  },
  openSettingsBtn: {
    width: '100%',
    height: rs(44),
    borderRadius: rs(22),
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rs(12),
  },
  openSettingsBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#ffffff',
  },
  learnMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(10),
  },
  learnMoreText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    color: '#f59e0b',
  },

  /* Setting rows */
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rs(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginTop: rs(4),
  },
  settingRowText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(14),
    color: '#111827',
  },
  settingsBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#f59e0b',
    borderRadius: rs(16),
    paddingHorizontal: rs(12),
    paddingVertical: rs(5),
  },
  settingsBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(12.5),
    color: '#f59e0b',
  },

  /* Guest Access Box */
  guestAccessBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(18),
    backgroundColor: '#ffffff',
    padding: rs(16),
    marginTop: rs(14),
    alignItems: 'center',
  },
  guestAccessTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#111827',
    textAlign: 'center',
  },
  guestAccessDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(16),
    marginTop: rs(4),
  },
  guestSettingsBtn: {
    width: '100%',
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rs(12),
  },
  guestSettingsBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14.5),
    color: '#ffffff',
  },

  /* Card 4: Who can see this post? */
  audiencePillsRow: {
    flexDirection: 'row',
    gap: rs(8),
    marginBottom: rs(12),
  },
  audiencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: rs(20),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: rs(10),
    paddingVertical: rs(6),
  },
  audiencePillText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(12),
    color: '#9ca3af',
    marginLeft: rs(4),
  },
  audienceHintText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#6b7280',
    lineHeight: rs(17),
  },

  /* Card 5: Guest Alert Card */
  guestAlertCard: {
    backgroundColor: '#fefce8',
    borderRadius: rs(20),
    borderWidth: 1.2,
    borderColor: '#fde047',
    padding: rs(16),
    marginBottom: rs(20),
  },
  alertHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertExclamationCircle: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(10),
    backgroundColor: '#eab308',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(8),
  },
  alertExclamationText: {
    color: '#ffffff',
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    lineHeight: rs(15),
  },
  alertTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
    color: '#111827',
    flex: 1,
  },
  alertBody: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#4b5563',
    lineHeight: rs(18),
    marginTop: rs(8),
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
