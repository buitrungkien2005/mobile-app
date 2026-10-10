import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { rs } from '../../utils/scaling';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);

export default function EditPostScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
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

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.sectionLabel}>Post Title</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.textInput} 
              defaultValue="Weekend memories with BeeBuddy 🐝" 
              placeholderTextColor="#9ca3af" 
            />
          </View>

          <Text style={styles.sectionLabel}>Post Content</Text>
          <View style={styles.textAreaContainer}>
            <TextInput 
              style={styles.textArea} 
              defaultValue="Today was an amazing experience with friends in the study club..." 
              placeholderTextColor="#9ca3af" 
              multiline 
              textAlignVertical="top"
            />
          </View>

          <Text style={styles.sectionLabel}>Add Photos/Videos</Text>
          <View style={styles.imageEditContainer}>
            <View style={styles.imageWrapper}>
              <Image source={require('../../../assets/images/Forest_Image.png')} style={styles.postImage} resizeMode="cover" />
              
              <TouchableOpacity style={styles.changePhotoPill}>
                <Image source={require('../../../assets/images/camera.png')} style={styles.cameraIcon} />
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.changePhotoBtn}>
              <Text style={styles.changePhotoLinkText}>Change photo/video</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>Post Category</Text>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>Study & Research</Text>
            <Ionicons name="caret-down" size={rs(16)} color="#6b7280" />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={() => router.push('/(tabs)/home')}>
            <LinearGradient
              colors={['#f59e0b', '#fbbf24']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveBtnGradient}
            >
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      <AISup />
      <TabBarMenu activeTab="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
  },
  overlay: {
    width: '100%',
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
    paddingLeft: rs(12),
  },
  searchInput: {
    flex: 1,
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#000',
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
    marginLeft: rs(8),
  },
  notificationDot: {
    position: 'absolute',
    top: rs(10),
    right: rs(10),
    width: rs(8),
    height: rs(8),
    backgroundColor: '#ef4444',
    borderRadius: rs(4),
    borderWidth: 1,
    borderColor: '#fff',
  },
  headerAvatarBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rs(10),
    borderWidth: 2,
    borderColor: '#ffb703',
    overflow: 'hidden',
  },
  headerAvatar: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
  },
  scrollContent: {
    paddingHorizontal: rs(20),
    paddingTop: rs(10),
    paddingBottom: rs(120),
  },
  sectionLabel: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#1f2937',
    marginBottom: rs(10),
  },
  inputContainer: {
    width: '100%',
    height: rs(50),
    backgroundColor: '#FFFDF2',
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: '#EFEBE4',
    justifyContent: 'center',
    paddingHorizontal: rs(16),
    marginBottom: rs(24),
  },
  textInput: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#1E1810',
  },
  textAreaContainer: {
    width: '100%',
    height: rs(140),
    backgroundColor: '#FFFDF2',
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: '#EFEBE4',
    padding: rs(16),
    marginBottom: rs(24),
  },
  textArea: {
    flex: 1,
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#1E1810',
  },
  imageEditContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: rs(16),
    borderWidth: 2,
    borderColor: '#fbbf24',
    padding: rs(8),
    marginBottom: rs(24),
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: rs(200),
    borderRadius: rs(12),
    position: 'relative',
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  changePhotoPill: {
    position: 'absolute',
    top: rs(12),
    left: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: rs(6),
    paddingHorizontal: rs(12),
    borderRadius: rs(20),
  },
  cameraIcon: {
    width: rs(16),
    height: rs(16),
    marginRight: rs(6),
    tintColor: '#fff',
  },
  changePhotoText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(12),
    color: '#fff',
  },
  changePhotoBtn: {
    paddingVertical: rs(12),
  },
  changePhotoLinkText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
    color: '#f59e0b',
  },
  dropdownContainer: {
    width: '100%',
    height: rs(50),
    backgroundColor: '#FFFDF2',
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: '#EFEBE4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    marginBottom: rs(40),
  },
  dropdownText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#1E1810',
  },
  saveBtn: {
    width: '100%',
    height: rs(50),
    borderRadius: rs(25),
    overflow: 'hidden',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  saveBtnGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(18),
    color: '#fff',
  },
});
