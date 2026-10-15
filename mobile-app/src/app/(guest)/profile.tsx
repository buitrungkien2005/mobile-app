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
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import GuestTabBarMenu from '../../components/GuestTabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 55;

export default function GuestProfileScreen() {
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
            {/* Top Row: Logo */}
            <View style={styles.topRow}>
              <Image 
                source={require('../../../assets/images/logo.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />
            </View>
          </View>
        </View>

        {/* Mascot Illustration */}
        <View style={styles.mascotContainer}>
          <Image 
            source={require('../../../assets/images/guest_messages_mascot.gif')} 
            style={styles.mascotGif} 
            resizeMode="contain" 
          />
        </View>

        {/* Headings */}
        <View style={styles.headingSection}>
          <Text style={styles.mainTitle}>Log in to enjoy your profile</Text>
          <Text style={styles.subTitle}>
            Save your info, connect with others, and{'\n'}personalize your BeeBuddy experience.
          </Text>
        </View>

        {/* 3 Feature Cards */}
        <View style={styles.featureCardsContainer}>
          {/* Card 1: View and edit your profile */}
          <TouchableOpacity 
            style={styles.featureCard} 
            onPress={openSignInModal}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('../../../assets/images/user234.png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <View style={styles.featureTextWrapper}>
              <Text style={styles.featureTitle}>View and edit your profile</Text>
              <Text style={styles.featureDesc}>
                Add a photo, write a bio, and tell the community about you.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Card 2: Save your interests and preferences */}
          <TouchableOpacity 
            style={styles.featureCard} 
            onPress={openSignInModal}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('../../../assets/images/heart23.png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <View style={styles.featureTextWrapper}>
              <Text style={styles.featureTitle}>Save your interests and preferences</Text>
              <Text style={styles.featureDesc}>
                Get a more personalized experience with content you love.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Card 3: See your connections and activity */}
          <TouchableOpacity 
            style={styles.featureCard} 
            onPress={openSignInModal}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('../../../assets/images/users234.png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <View style={styles.featureTextWrapper}>
              <Text style={styles.featureTitle}>See your connections and activity</Text>
              <Text style={styles.featureDesc}>
                Find and keep in touch with friends in the BeeBuddy community.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Call to action italic text */}
        <Text style={styles.ctaText}>
          Log in to unlock your profile and start connecting with{'\n'}the community.
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* Log in Button with Orange Linear Gradient */}
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

          {/* Sign up Button */}
          <TouchableOpacity 
            style={styles.signUpBtn}
            onPress={() => router.replace('/(auth)/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpBtnText}>Sign up</Text>
          </TouchableOpacity>
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

      {/* Guest TabBar with Profile Active */}
      <GuestTabBarMenu activeTab="profile" />

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
    height: OVERLAY_HEIGHT + rs(55),
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
    alignItems: 'center',
    height: rs(48),
  },
  logo: {
    width: rs(32),
    height: rs(50),
  },

  /* Mascot Section */
  mascotContainer: {
    alignItems: 'center',
    marginTop: -rs(55),
  },
  mascotGif: {
    width: rs(260),
    height: rs(220),
  },

  /* Headings Section */
  headingSection: {
    alignItems: 'center',
    paddingHorizontal: rs(24),
    marginTop: -rs(40),
  },
  mainTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(22),
    color: '#111827',
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13.5),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(18),
    marginTop: rs(8),
  },

  /* 3 Feature Cards */
  featureCardsContainer: {
    paddingHorizontal: rs(16),
    marginTop: rs(20),
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(20),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    padding: rs(14),
    marginBottom: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(1) },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    backgroundColor: '#fffbeb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(14),
  },
  featureIcon: {
    width: rs(22),
    height: rs(22),
  },
  featureTextWrapper: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#111827',
  },
  featureDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    lineHeight: rs(16),
    marginTop: rs(2),
  },

  /* Call to action italic text */
  ctaText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    fontStyle: 'italic',
    color: '#b45309',
    textAlign: 'center',
    lineHeight: rs(18),
    marginTop: rs(8),
    marginBottom: rs(14),
    paddingHorizontal: rs(24),
  },

  /* Action Buttons */
  actionsContainer: {
    paddingHorizontal: rs(16),
  },
  loginBtnWrapper: {
    width: '100%',
  },
  loginBtn: {
    height: rs(48),
    borderRadius: rs(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#ffffff',
  },
  signUpBtn: {
    width: '100%',
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#ffaa00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rs(10),
  },
  signUpBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#ff9500',
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
