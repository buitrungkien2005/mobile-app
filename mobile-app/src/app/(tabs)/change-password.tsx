import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';


const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393); // Keep consistent with profile-info
const TABBAR_HEIGHT = 65;

export default function ChangePasswordScreen() {
  const router = useRouter();
  
  // States for password inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleBackToSettings = () => {
    router.back();
  };

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
            <Ionicons name="chevron-back" size={rs(12)} color="#111827" style={{ marginTop: rs(12), marginRight: rs(6) }} />
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
          
          <Animated.View style={styles.card} layout={LinearTransition.duration(400)}>
            {!isSuccess ? (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                {/* Current Password */}
                <Text style={styles.inputLabel}>Current Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    value={currentPassword} 
                    onChangeText={setCurrentPassword} 
                    secureTextEntry={true}
                    placeholder="....................."
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                {/* New Password */}
                <Text style={styles.inputLabel}>New Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    value={newPassword} 
                    onChangeText={setNewPassword} 
                    secureTextEntry={true}
                    placeholder="....................."
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                {/* Confirm New Password */}
                <Text style={styles.inputLabel}>Confirm New Password</Text>
                <View style={[styles.inputWrapper, { marginBottom: 0 }]}>
                  <TextInput 
                    style={styles.input} 
                    value={confirmPassword} 
                    onChangeText={setConfirmPassword} 
                    secureTextEntry={true}
                    placeholder="....................."
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </Animated.View>
            ) : (
              <Animated.View style={styles.successContainer} entering={FadeIn.duration(400)} exiting={FadeOut}>
                {/* Checkmark Icon */}
                <Animated.View entering={ZoomIn.duration(400).delay(200)} style={styles.iconContainer}>
                  <Ionicons name="checkmark" size={rs(40)} color="#ffffff" />
                </Animated.View>

                {/* Success Text */}
                <Text style={styles.successTitle}>Password Updated!</Text>
                <Text style={styles.successDescription}>
                  Your password has been changed successfully. You can now use your new credentials.
                </Text>
              </Animated.View>
            )}
          </Animated.View>

          {/* Action Button */}
          <Animated.View layout={LinearTransition.duration(400)}>
            <TouchableOpacity 
              style={styles.updateButtonWrapper}
              onPress={isSuccess ? handleBackToSettings : handleUpdate}
              disabled={isUpdating}
            >
              <LinearGradient
                colors={['#ffbb00', '#ff7b00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.updateButtonGradient}
              >
                {isUpdating ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Animated.Text 
                    key={isSuccess ? 'success' : 'update'} 
                    entering={FadeIn} 
                    exiting={FadeOut} 
                    style={styles.updateButtonText}
                  >
                    {isSuccess ? 'Back to Settings' : 'Update Password'}
                  </Animated.Text>
                )}
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
    opacity: 0.2, // Very subtle, matching design
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
    padding: rs(24),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: rs(30),
  },
  inputLabel: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(28),
    color: '#111827',
    marginBottom: -4,
    marginTop: -8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(16),
    height: rs(48),
    justifyContent: 'center',
    paddingHorizontal: rs(16),
    marginBottom: rs(24),
  },
  input: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(20),
    color: '#111827',
    height: '100%',
  },
  updateButtonWrapper: {
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
  updateButtonGradient: {
    width: '100%',
    height: rs(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(28),
    color: '#ffffff',
    marginTop: rs(6),
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: rs(16),
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
});

