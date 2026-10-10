import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions, Platform, KeyboardAvoidingView, ImageBackground, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { rs } from '../../utils/scaling';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);

export default function UpPostScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [activePrivacy, setActivePrivacy] = useState('Everyone');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handlePostSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(55) }]}>
        <Image source={require('../../../assets/images/profile_overlay_new.png')} style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} resizeMode="cover" />
        <View style={[styles.headerTop, { paddingTop: rs(75), position: 'relative' }]}>
          <Image source={require('../../../assets/images/BrandLogo.png')} style={styles.logo} resizeMode="contain" />
          
          <View style={styles.headerRightActions}>
            <View style={[styles.searchWrapper, isSearchActive ? styles.searchWrapperExpanded : styles.searchWrapperCollapsed]}>
              {isSearchActive && (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor="#9ca3af"
                  autoFocus
                />
              )}
              <TouchableOpacity style={styles.searchIconButton} onPress={toggleSearch}>
                <Ionicons name="search" size={rs(18)} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(tabs)/notifications')}>
              <Ionicons name="notifications" size={rs(18)} color="#000" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.headerAvatarBtn} onPress={() => router.push('/profile-setting')}>
              <Image source={require('../../../assets/images/Avatar_Me.png')} style={styles.headerAvatar} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isSuccess ? (
        <View style={styles.successContainer}>
          <View style={styles.successCard}>
            <Image source={require('../../../assets/images/Mascot_Frame.png')} style={styles.successIcon} resizeMode="contain" />
            <Text style={styles.successTitle}>Post Successful!</Text>
            <Text style={styles.successSubtitle}>
              Your post has been uploaded and shared publicly.{'\n'}Have fun with your friends!
            </Text>
            
            <TouchableOpacity style={styles.beePointsBtn}>
              <Image source={require('../../../assets/images/star.png')} style={styles.starIcon} resizeMode="contain" />
              <Text style={styles.beePointsText}>Earn +10 BeePoints!</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.successActions}>
            <TouchableOpacity style={[styles.actionBtn, styles.primaryActionBtn]} onPress={() => router.push('/(tabs)/view-post')}>
               <Text style={styles.primaryActionBtnText}>View Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/home')}>
               <Text style={styles.actionBtnText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.stickyTitleContainer}>
          <Text style={styles.sectionLabel}>Post Title</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder="Write a title for your post..." placeholderTextColor="#9ca3af" />
          </View>
        </View>

        <ScrollView style={styles.scrollBody} contentContainerStyle={{ paddingBottom: rs(100) }} showsVerticalScrollIndicator={false}>
          <View style={[styles.cardGroup, { marginTop: rs(4) }]}>
            <View style={styles.mediaAccessCard}>
              <Text style={styles.mediaTitle}>Allow access to your Photos & Videos</Text>
              <Text style={styles.mediaDesc}>To upload photos and videos to your post, allow BeeBuddy to access your device library</Text>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Open Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.learnMoreRow}>
                <Text style={styles.learnMoreText}>Learn more</Text>
                <Ionicons name="chevron-down" size={rs(16)} color="#f59e0b" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.captionSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.iconOutline}>
                  <Ionicons name="image-outline" size={rs(18)} color="#f59e0b" />
                </View>
                <Text style={styles.sectionLabelInline}>Write a caption</Text>
              </View>
              <View style={[styles.inputContainer, styles.disabledInput]}>
                <TextInput style={styles.textInput} placeholder="Log in to write a caption..." placeholderTextColor="#9ca3af" editable={false} />
                <Ionicons name="lock-closed-outline" size={rs(16)} color="#f59e0b" style={{ marginRight: rs(10) }} />
              </View>
            </View>
          </View>

          <View style={[styles.cardGroup, { paddingVertical: rs(16) }]}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconOutline}>
                <Ionicons name="chatbubble-outline" size={rs(18)} color="#f59e0b" />
              </View>
              <Text style={styles.sectionLabelInline}>Who can see this post?</Text>
            </View>
            
            <View style={styles.privacyPills}>
              <TouchableOpacity style={[styles.privacyPill, activePrivacy === 'Everyone' && styles.privacyPillActive]} onPress={() => setActivePrivacy('Everyone')}>
                <Ionicons name="compass-outline" size={rs(16)} color={activePrivacy === 'Everyone' ? '#6b7280' : '#9ca3af'} />
                <Text style={[styles.privacyText, activePrivacy === 'Everyone' && styles.privacyTextActive]}>Everyone</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.privacyPill, activePrivacy === 'Friends' && styles.privacyPillActive]} onPress={() => setActivePrivacy('Friends')}>
                <Ionicons name="chatbox-outline" size={rs(16)} color={activePrivacy === 'Friends' ? '#6b7280' : '#9ca3af'} />
                <Text style={[styles.privacyText, activePrivacy === 'Friends' && styles.privacyTextActive]}>Friends</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.privacyPill, activePrivacy === 'Close Friends' && styles.privacyPillActive]} onPress={() => setActivePrivacy('Close Friends')}>
                <Ionicons name="lock-closed-outline" size={rs(16)} color={activePrivacy === 'Close Friends' ? '#6b7280' : '#9ca3af'} />
                <Text style={[styles.privacyText, activePrivacy === 'Close Friends' && styles.privacyTextActive]}>Close Friends</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.privacyDesc}>You'll be able to choose who can see your post after logging in.</Text>
          </View>

          <Text style={styles.sectionLabel}>Post Category</Text>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>Select a category...</Text>
            <Ionicons name="caret-down" size={rs(16)} color="#6b7280" />
          </View>

          <Text style={styles.sectionLabel}>Post Content</Text>
          <View style={styles.textAreaContainer}>
            <TextInput 
              style={styles.textArea} 
              placeholder="Write your post content..." 
              placeholderTextColor="#9ca3af" 
              multiline 
              textAlignVertical="top"
            />
          </View>

          <Text style={styles.sectionLabel}>Add Photos/Videos</Text>
          <TouchableOpacity style={styles.dashedUploadBtn}>
            <Ionicons name="images-outline" size={rs(24)} color="#4b5563" />
            <Text style={styles.uploadText}>Add Photos/Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitBtn} onPress={handlePostSubmit}>
            <Text style={styles.submitBtnText}>Post</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
      )}

      <Modal visible={isSubmitting} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.loadingCard}>
            <Image source={require('../../../assets/images/Spinner_Box.png')} style={styles.spinnerIcon} resizeMode="contain" />
            <Text style={styles.loadingText}>Posting...</Text>
            <Text style={styles.loadingSubtitle}>
              Please wait while your post is being{'\n'}uploaded...
            </Text>
          </View>
        </View>
      </Modal>

      <AISup />
      <TabBarMenu activeTab="up-post" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  headerTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    alignItems: 'center',
    marginTop: rs(10),
  },
  logo: {
    height: rs(46),
    width: rs(30),
  },
  headerRightActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: rs(40),
  },
  searchWrapperCollapsed: {
    width: rs(40),
    backgroundColor: 'transparent',
  },
  searchWrapperExpanded: {
    flex: 1,
    backgroundColor: '#fffcf2',
    borderRadius: rs(20),
    borderWidth: 1.5,
    borderColor: '#ffb703',
    marginLeft: rs(15),
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: rs(16),
    fontSize: rs(14),
    color: '#000',
    height: '100%',
  },
  searchIconButton: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rs(10),
  },
  notificationDot: {
    position: 'absolute',
    top: rs(10),
    right: rs(12),
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    backgroundColor: '#ef4444',
  },
  headerAvatarBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffb703',
    overflow: 'hidden',
    marginLeft: rs(10),
  },
  headerAvatar: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
  },
  stickyTitleContainer: {
    paddingHorizontal: rs(20),
    backgroundColor: '#f9fafb',
    paddingBottom: rs(10),
    zIndex: 1,
  },
  scrollBody: {
    flex: 1,
    paddingHorizontal: rs(20),
    paddingTop: rs(10),
  },
  sectionLabel: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
    color: '#111827',
    marginBottom: rs(8),
    marginTop: rs(16),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(8),
    backgroundColor: '#fff',
    height: rs(48),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: rs(16),
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#374151',
  },
  disabledInput: {
    backgroundColor: '#f9fafb',
  },
  cardGroup: {
    backgroundColor: '#fff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: rs(16),
    overflow: 'hidden',
  },
  mediaAccessCard: {
    padding: rs(20),
    alignItems: 'center',
  },
  mediaTitle: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(15),
    color: '#111827',
    marginBottom: rs(6),
    textAlign: 'center',
  },
  mediaDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: rs(16),
    lineHeight: rs(18),
  },
  primaryBtn: {
    backgroundColor: '#f59e0b',
    paddingVertical: rs(10),
    paddingHorizontal: rs(30),
    borderRadius: rs(20),
    width: '90%',
    alignItems: 'center',
    marginBottom: rs(10),
  },
  primaryBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#fff',
  },
  learnMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
  },
  learnMoreText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(13),
    color: '#f59e0b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    width: '100%',
  },
  captionSection: {
    padding: rs(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
    paddingHorizontal: rs(16),
  },
  iconOutline: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#fcd34d',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  sectionLabelInline: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#111827',
  },
  privacyPills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
    paddingHorizontal: rs(16),
    marginBottom: rs(12),
  },
  privacyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
    borderRadius: rs(20),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    gap: rs(6),
  },
  privacyPillActive: {
    backgroundColor: '#f9fafb',
    borderColor: '#d1d5db',
  },
  privacyText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(12),
    color: '#9ca3af',
  },
  privacyTextActive: {
    color: '#6b7280',
  },
  privacyDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    paddingHorizontal: rs(16),
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(8),
    backgroundColor: '#fff',
    height: rs(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
  },
  dropdownText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#111827',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(8),
    backgroundColor: '#fff',
    height: rs(200),
    padding: rs(16),
  },
  textArea: {
    flex: 1,
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#374151',
  },
  dashedUploadBtn: {
    borderWidth: 1.5,
    borderColor: '#f59e0b',
    borderStyle: 'dashed',
    borderRadius: rs(12),
    height: rs(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(24),
  },
  uploadText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(13),
    color: '#f59e0b',
    marginTop: rs(8),
  },
  submitBtn: {
    backgroundColor: '#f59e0b',
    height: rs(50),
    borderRadius: rs(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(40),
  },
  submitBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: '#fff',
    borderRadius: rs(24),
    paddingVertical: rs(40),
    paddingHorizontal: rs(30),
    alignItems: 'center',
    justifyContent: 'center',
    width: width - rs(80),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  spinnerIcon: {
    width: rs(80),
    height: rs(80),
    marginBottom: rs(20),
  },
  loadingText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(22),
    color: '#000',
    marginBottom: rs(8),
  },
  loadingSubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#8b8b8b',
    textAlign: 'center',
    lineHeight: rs(22),
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rs(20),
    paddingTop: rs(30),
  },
  successCard: {
    backgroundColor: '#fff',
    borderRadius: rs(24),
    borderWidth: 1,
    borderColor: '#fef08a',
    paddingVertical: rs(30),
    paddingHorizontal: rs(20),
    alignItems: 'center',
    width: '100%',
    marginBottom: rs(30),
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  successIcon: {
    width: rs(100),
    height: rs(100),
    marginBottom: rs(20),
  },
  successTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(28),
    color: '#000',
    marginBottom: rs(12),
  },
  successSubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#6b7280',
    marginBottom: rs(24),
    textAlign: 'center',
    lineHeight: rs(20),
  },
  beePointsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fcd34d',
    paddingVertical: rs(8),
    paddingHorizontal: rs(16),
    borderRadius: rs(20),
  },
  starIcon: {
    width: rs(20),
    height: rs(20),
    marginRight: rs(8),
  },
  beePointsText: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(16),
    color: '#f59e0b',
  },
  successActions: {
    width: '100%',
    gap: rs(12),
  },
  actionBtn: {
    width: '100%',
    height: rs(50),
    borderRadius: rs(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f59e0b',
    backgroundColor: '#fff',
  },
  actionBtnText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(18),
    color: '#f59e0b',
  },
  primaryActionBtn: {
    backgroundColor: '#f59e0b',
    borderWidth: 0,
  },
  primaryActionBtnText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(18),
    color: '#fff',
  },
});
