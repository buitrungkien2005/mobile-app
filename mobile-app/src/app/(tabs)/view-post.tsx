import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { rs } from '../../utils/scaling';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);

export default function ViewPostScreen() {
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={require('../../../assets/images/avatar_v3_Buzzy.png')} style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.authorName}>Buzzy</Text>
                <Image source={require('../../../assets/images/check-circle.png')} style={styles.verifiedIcon} />
              </View>
              <Text style={styles.timeText}>3h ago</Text>
            </View>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.postText}>
              Found a magical little spot today ✨ Some places just feel like home...
            </Text>
          </View>

          <Image source={require('../../../assets/images/Forest_Image.png')} style={styles.postImage} resizeMode="cover" />

          <View style={styles.interactionsRow}>
            <View style={styles.interactionLeft}>
              <TouchableOpacity style={styles.interactionBtn}>
                <Ionicons name="heart-outline" size={rs(24)} color="#6b7280" />
                <Text style={styles.interactionText}>128</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactionBtn}>
                <Ionicons name="chatbubble-outline" size={rs(24)} color="#6b7280" />
                <Text style={styles.interactionText}>24</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactionBtn}>
                <Ionicons name="paper-plane-outline" size={rs(24)} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/(tabs)/edit-post')}>
          <Text style={styles.editBtnText}>Edit Post</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Delete Post</Text>
        </TouchableOpacity>
      </ScrollView>

      <AISup />
      <TabBarMenu activeTab="up-post" />
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
    paddingTop: rs(20),
    paddingBottom: rs(120),
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: rs(24),
    padding: rs(16),
    borderWidth: 1,
    borderColor: '#fef08a',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: rs(30),
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(16),
  },
  authorAvatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    marginRight: rs(12),
  },
  authorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#000',
    marginRight: rs(6),
  },
  verifiedIcon: {
    width: rs(16),
    height: rs(16),
  },
  timeText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#9ca3af',
  },
  contentBox: {
    backgroundColor: '#fef6e4',
    padding: rs(16),
    borderRadius: rs(16),
    marginBottom: rs(16),
  },
  postText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#374151',
    lineHeight: rs(22),
  },
  postImage: {
    width: '100%',
    height: rs(200),
    borderRadius: rs(16),
    marginBottom: rs(16),
  },
  interactionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rs(20),
  },
  interactionText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
    color: '#6b7280',
    marginLeft: rs(6),
  },
  editBtn: {
    width: '100%',
    height: rs(50),
    borderRadius: rs(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f59e0b',
    marginBottom: rs(12),
  },
  editBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#000',
  },
  deleteBtn: {
    width: '100%',
    height: rs(50),
    borderRadius: rs(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  deleteBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#ef4444',
  },
});
