import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393); // Keep consistent with profile-info
const TABBAR_HEIGHT = 65;

export default function ChangePasswordSuccessScreen() {
  const router = useRouter();
  const scaleValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;
  const slideValue = useRef(new Animated.Value(50)).current;
  const buttonFadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      // 1. Checkmark spring
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 15,
        speed: 12,
      }),
      // 2. Card fade in
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // 3. Button slide up & fade in
      Animated.sequence([
        Animated.delay(200),
        Animated.parallel([
          Animated.timing(slideValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(buttonFadeValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        ])
      ])
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      {/* Header Overlay & Top Row */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={styles.overlay} 
          resizeMode="cover" 
        />
        {/* Header Top Row */}
        <View style={styles.headerTop}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={rs(28)} color="#111827" style={{ marginTop: rs(10) }} />
            <Text style={styles.headerTitle}>Change Password</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../../assets/images/BrandLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          
          <Animated.View style={[styles.card, { opacity: fadeValue }]}>
            {/* Checkmark Icon */}
            <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
              <Ionicons name="checkmark" size={rs(40)} color="#ffffff" />
            </Animated.View>

            {/* Success Text */}
            <Text style={styles.successTitle}>Password Updated!</Text>
            <Text style={styles.successDescription}>
              Your password has been changed successfully. You can now use your new credentials.
            </Text>
          </Animated.View>

          {/* Back to Settings Button */}
          <Animated.View style={{ opacity: buttonFadeValue, transform: [{ translateY: slideValue }] }}>
            <TouchableOpacity 
              style={styles.buttonWrapper}
              onPress={() => router.push('/(tabs)/profile-setting')}
            >
              <LinearGradient
                colors={['#ffbb00', '#ff7b00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Back to Settings</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

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
    opacity: 0.2, // matching design
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    height: OVERLAY_HEIGHT + 90,
    width: '100%',
    },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  headerTop: {
    paddingTop: rs(85),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    
  },
  headerTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(36),
    color: '#000',
    marginTop: rs(15),
  },
  logo: {
    width: rs(35),
    height: rs(50),
  },
  contentContainer: {
    paddingHorizontal: rs(20),
    paddingTop: rs(10),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    paddingHorizontal: rs(24),
    paddingVertical: rs(40),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: rs(30),
    alignItems: 'center',
  },
  iconContainer: {
    width: rs(80),
    height: rs(80),
    borderRadius: rs(40),
    backgroundColor: '#ffbb00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(24),
    // Shadow
    shadowColor: '#ffbb00',
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  successTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(22),
    color: '#111827',
    marginBottom: rs(12),
    textAlign: 'center',
  },
  successDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: rs(14),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(22),
    paddingHorizontal: rs(10),
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: rs(18),
    overflow: 'hidden',
    // Shadow
    shadowColor: '#ff7b00',
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    width: '100%',
    height: rs(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(28),
    color: '#ffffff',
    marginTop: rs(6),
  },
});


