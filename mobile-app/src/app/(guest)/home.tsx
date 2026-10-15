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
import GuestTabBarMenu from '../../components/GuestTabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function GuestHomeScreen() {
  const router = useRouter();

  // Search state
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sign In Required Modal state
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const openSignInModal = () => setIsSignInModalVisible(true);
  const closeSignInModal = () => setIsSignInModalVisible(false);

  return (
    <View style={styles.container}>
      
      {/* Hexagon Background Pattern */}
      <Image 
        source={require('../../../assets/images/hex_bg.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../../assets/images/Lop_phu_tren_profiel.png')} 
            style={styles.overlay} 
            resizeMode="cover" 
          />
          
          <View style={styles.headerContent}>
            {/* Top Row: Logo & Search */}
            <View style={styles.topRow}>
              <Image 
                source={require('../../../assets/images/logo.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />

              <View style={styles.searchContainer}>
                {isSearchActive ? (
                  <View style={styles.searchWrapperExpanded}>
                    <TextInput 
                      placeholder="Search..." 
                      placeholderTextColor="#9ca3af" 
                      style={styles.searchInput}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      autoFocus
                    />
                    <TouchableOpacity 
                      style={styles.searchActionBtn} 
                      onPress={() => setIsSearchActive(false)}
                    >
                      <Ionicons name="close-circle" size={rs(20)} color="#9ca3af" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={styles.searchBtn} 
                    onPress={() => setIsSearchActive(true)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="search" size={rs(22)} color="#000" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Public Badge */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Public</Text>
            </View>
          </View>
        </View>
        
        {/* Feed Posts Section (Theo chuẩn MainContainer-GuestsHome.png) */}
        <View style={styles.feedContainer}>

          {/* === POST 1: Minh Tran === */}
          <View style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <TouchableOpacity activeOpacity={0.8} onPress={openSignInModal}>
                <Image 
                  source={require('../../../assets/images/Avatar_MinhTran.png')} 
                  style={styles.postAvatar} 
                  resizeMode="contain" 
                />
              </TouchableOpacity>
              <View style={styles.postMeta}>
                <TouchableOpacity style={styles.authorRow} activeOpacity={0.8} onPress={openSignInModal}>
                  <Text style={styles.postAuthor}>Minh Tran</Text>
                  <Text style={styles.flagEmoji}>🇻🇳</Text>
                  <Ionicons name="checkmark-circle" size={rs(16)} color="#ffb703" style={{ marginLeft: rs(4) }} />
                </TouchableOpacity>
                <Text style={styles.postTime}>20/8/2026 • Ho Chi Minh City, Vietnam</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={openSignInModal} style={styles.moreBtn}>
                <Ionicons name="ellipsis-vertical" size={rs(20)} color="#ffb703" />
              </TouchableOpacity>
            </View>

            {/* Post Text */}
            <Text style={styles.postText}>
              This morning's pho was so delicious! 🍜 Nothing beats a hot bowl of pho to start a new day in Saigon...
            </Text>

            {/* Post Image with Lock Overlay */}
            <TouchableOpacity activeOpacity={0.9} onPress={openSignInModal}>
              <Image 
                source={require('../../../assets/images/guest_post_pho.png')} 
                style={styles.postImage} 
                resizeMode="cover" 
              />
            </TouchableOpacity>

            {/* Action Bar Row */}
            <View style={styles.postActionsRow}>
              {/* Left Actions */}
              <View style={styles.leftActionsGroup}>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="heart-outline" size={rs(22)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="chatbubble-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="paper-plane-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Center Badges */}
              <View style={styles.badgesGroup}>
                <TouchableOpacity style={styles.tagInactive} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="globe-outline" size={rs(9)} color="#374151" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextInactive}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagActiveOrange} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="people" size={rs(9)} color="#ffffff" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextActiveWhite}>Connections</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagInactive} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="lock-closed" size={rs(9)} color="#374151" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextInactive}>Close Circle</Text>
                </TouchableOpacity>
              </View>

              {/* Right Bookmark */}
              <TouchableOpacity onPress={openSignInModal} activeOpacity={0.8}>
                <Ionicons name="bookmark-outline" size={rs(20)} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* === POST 2: Priya Sharma === */}
          <View style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <TouchableOpacity activeOpacity={0.8} onPress={openSignInModal}>
                <Image 
                  source={require('../../../assets/images/avatar_v3_Honey.png')} 
                  style={styles.postAvatar} 
                  resizeMode="contain" 
                />
              </TouchableOpacity>
              <View style={styles.postMeta}>
                <TouchableOpacity style={styles.authorRow} activeOpacity={0.8} onPress={openSignInModal}>
                  <Text style={styles.postAuthor}>Priya Sharma</Text>
                  <Ionicons name="checkmark-circle" size={rs(16)} color="#ffb703" style={{ marginLeft: rs(4) }} />
                </TouchableOpacity>
                <Text style={styles.postTime}>3h ago • Bangalore, India</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={openSignInModal} style={styles.moreBtn}>
                <Ionicons name="ellipsis-vertical" size={rs(20)} color="#ffb703" />
              </TouchableOpacity>
            </View>

            {/* Post Text */}
            <Text style={styles.postText}>
              Found a magical little spot today 🌟 Some places just feel like home...
            </Text>

            {/* Post Image */}
            <TouchableOpacity activeOpacity={0.9} onPress={openSignInModal}>
              <Image 
                source={require('../../../assets/images/guest_post_lake.png')} 
                style={styles.postImage} 
                resizeMode="cover" 
              />
            </TouchableOpacity>

            {/* Action Bar Row */}
            <View style={styles.postActionsRow}>
              {/* Left Actions */}
              <View style={styles.leftActionsGroup}>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="heart-outline" size={rs(22)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="chatbubble-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="paper-plane-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Center Badges */}
              <View style={styles.badgesGroup}>
                <TouchableOpacity style={styles.tagActiveYellow} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="globe-outline" size={rs(9)} color="#000000" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextActiveBlack}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagInactive} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="people" size={rs(9)} color="#374151" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextInactive}>Connections</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagInactive} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="lock-closed" size={rs(9)} color="#374151" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextInactive}>Close Circle</Text>
                </TouchableOpacity>
              </View>

              {/* Right Bookmark */}
              <TouchableOpacity onPress={openSignInModal} activeOpacity={0.8}>
                <Ionicons name="bookmark-outline" size={rs(20)} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* === POST 3: Jake Miller === */}
          <View style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <TouchableOpacity activeOpacity={0.8} onPress={openSignInModal}>
                <Image 
                  source={require('../../../assets/images/avatar_v3_Sunny.png')} 
                  style={styles.postAvatar} 
                  resizeMode="contain" 
                />
              </TouchableOpacity>
              <View style={styles.postMeta}>
                <TouchableOpacity style={styles.authorRow} activeOpacity={0.8} onPress={openSignInModal}>
                  <Text style={styles.postAuthor}>Jake Miller</Text>
                  <Ionicons name="checkmark-circle" size={rs(16)} color="#ffb703" style={{ marginLeft: rs(4) }} />
                </TouchableOpacity>
                <Text style={styles.postTime}>3h ago • Bangalore, India</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={openSignInModal} style={styles.moreBtn}>
                <Ionicons name="ellipsis-vertical" size={rs(20)} color="#ffb703" />
              </TouchableOpacity>
            </View>

            {/* Post Text */}
            <Text style={styles.postText}>
              Just finished 'The Alchemist' and looking for someone to discuss it with ✨ Books truly change how you see life...
            </Text>

            {/* Post Image with Lock Overlay */}
            <TouchableOpacity activeOpacity={0.9} onPress={openSignInModal}>
              <Image 
                source={require('../../../assets/images/guest_post_book.png')} 
                style={styles.postImage} 
                resizeMode="cover" 
              />
            </TouchableOpacity>

            {/* Action Bar Row */}
            <View style={styles.postActionsRow}>
              {/* Left Actions */}
              <View style={styles.leftActionsGroup}>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="heart-outline" size={rs(22)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="chatbubble-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconBtn} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="paper-plane-outline" size={rs(20)} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Center Badges */}
              <View style={styles.badgesGroup}>
                <TouchableOpacity style={styles.tagInactive} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="globe-outline" size={rs(9)} color="#374151" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextInactive}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagActiveOrange} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="people" size={rs(9)} color="#ffffff" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextActiveWhite}>Connections</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagInactive} onPress={openSignInModal} activeOpacity={0.8}>
                  <Ionicons name="lock-closed" size={rs(9)} color="#374151" style={{ marginRight: rs(3) }} />
                  <Text style={styles.tagTextInactive}>Close Circle</Text>
                </TouchableOpacity>
              </View>

              {/* Right Bookmark */}
              <TouchableOpacity onPress={openSignInModal} activeOpacity={0.8}>
                <Ionicons name="bookmark-outline" size={rs(20)} color="#000000" />
              </TouchableOpacity>
            </View>
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

      {/* Guest TabBar */}
      <GuestTabBarMenu activeTab="home" />

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
    top: rs(100),
    left: 0,
    width: '100%',
    height: rs(400),
    opacity: 0.5,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT + rs(115),
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  searchWrapperExpanded: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffcf2',
    borderRadius: rs(22),
    borderWidth: 1.5,
    borderColor: '#ffb703',
    paddingHorizontal: rs(14),
    height: rs(44),
    width: rs(240),
  },
  searchInput: {
    flex: 1,
    fontSize: rs(14),
    color: '#000',
    height: '100%',
  },
  searchActionBtn: {
    padding: rs(4),
  },
  badgeContainer: {
    marginTop: rs(12),
    backgroundColor: '#ffb703',
    paddingVertical: rs(6),
    paddingHorizontal: rs(16),
    borderRadius: rs(12),
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
  },
  feedContainer: {
    paddingHorizontal: rs(16),
    marginTop: rs(4),
  },
  postCard: {
    backgroundColor: '#e7e5db',
    borderRadius: rs(24),
    padding: rs(16),
    marginBottom: rs(18),
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  postAvatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    marginRight: rs(12),
  },
  postMeta: {
    flex: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAuthor: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#111827',
  },
  flagEmoji: {
    fontSize: rs(14),
    marginLeft: rs(4),
  },
  postTime: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#6b7280',
    marginTop: rs(2),
  },
  moreBtn: {
    padding: rs(4),
  },
  postText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(14),
    color: '#111827',
    lineHeight: rs(20),
    marginBottom: rs(12),
  },
  postImage: {
    width: '100%',
    height: rs(155),
    borderRadius: rs(16),
    marginBottom: rs(12),
  },
  postActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: rs(2),
    paddingBottom: rs(4),
  },
  leftActionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconBtn: {
    marginRight: rs(12),
  },
  badgesGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagActiveYellow: {
    flexDirection: 'row',
    backgroundColor: '#ffb703',
    paddingHorizontal: rs(7),
    paddingVertical: rs(3.5),
    borderRadius: rs(12),
    alignItems: 'center',
    marginRight: rs(4),
  },
  tagActiveOrange: {
    flexDirection: 'row',
    backgroundColor: '#ff7b00',
    paddingHorizontal: rs(7),
    paddingVertical: rs(3.5),
    borderRadius: rs(12),
    alignItems: 'center',
    marginRight: rs(4),
  },
  tagInactive: {
    flexDirection: 'row',
    backgroundColor: '#f5f2ea',
    paddingHorizontal: rs(7),
    paddingVertical: rs(3.5),
    borderRadius: rs(12),
    alignItems: 'center',
    marginRight: rs(4),
  },
  tagTextActiveBlack: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(9),
    color: '#000000',
  },
  tagTextActiveWhite: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(9),
    color: '#ffffff',
  },
  tagTextInactive: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(9),
    color: '#374151',
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
