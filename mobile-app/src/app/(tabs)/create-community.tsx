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
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function CreateCommunityScreen() {
  const router = useRouter();

  // Form State
  const [communityName, setCommunityName] = useState('Alpine Trail Buddies');
  const [description, setDescription] = useState(
    'Easy trails, fresh air and good company. A welcoming space for weekend walks around Chamonix.'
  );
  const [selectedTopic, setSelectedTopic] = useState('Hiking');
  const [location, setLocation] = useState('Chamonix, France');
  const [privacyType, setPrivacyType] = useState<'public' | 'private'>('public');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const topics = ['Hiking', 'Camping', 'Cycling'];

  const handleCreateCommunity = () => {
    router.push('/(tabs)/alpine-trail-buddies');
  };

  const handleSuccessClose = () => {
    setSuccessModalVisible(false);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/update-explorer');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Watermark Pattern */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      {/* FIXED TOP HEADER */}
      <View style={styles.fixedHeaderArea}>
        {/* Top Wave Overlay */}
        <Image 
          source={require('../../../assets/images/Lop phu tren.png')} 
          style={styles.overlay} 
          resizeMode="cover" 
        />

        {/* Top Navigation Row */}
        <View style={styles.headerTop}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/update-explorer');
              }
            }} 
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={rs(22)} color="#1e1810" />
          </TouchableOpacity>

          {/* Screen Title */}
          <Text style={styles.headerTitle}>Create community</Text>
        </View>
      </View>

      {/* SCROLLABLE MAIN CONTENT */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: Success Banner ("Payment successful: You're an Explorer!") */}
        <View style={styles.successBanner}>
          <View style={styles.bannerCheckCircle}>
            <Ionicons name="checkmark" size={rs(15)} color="#16a34a" />
          </View>
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>
              Payment successful: You're an Explorer!
            </Text>
            <Text style={styles.bannerSubtitle}>
              Your Explorer plan is now ready. Let's create your first Nest.
            </Text>
          </View>
        </View>

        {/* SECTION 2: Cover Photo & Community Avatar */}
        <View style={styles.mediaSection}>
          {/* Cover Photo */}
          <View style={styles.coverWrapper}>
            <Image 
              source={require('../../../assets/images/Alpine.png')} 
              style={styles.coverImage} 
              resizeMode="cover" 
            />
            {/* Change Cover Button */}
            <TouchableOpacity style={styles.changeCoverBtn} activeOpacity={0.85}>
              <Ionicons name="camera-outline" size={rs(13)} color="#111827" style={{ marginRight: rs(4) }} />
              <Text style={styles.changeCoverBtnText}>Change cover</Text>
            </TouchableOpacity>
          </View>

          {/* Community Avatar Row */}
          <View style={styles.avatarRow}>
            <View style={styles.avatarContainer}>
              <Image 
                source={require('../../../assets/images/Alpine.png')} 
                style={styles.avatarImage} 
                resizeMode="cover" 
              />
            </View>
            <TouchableOpacity style={styles.changeAvatarBtn} activeOpacity={0.85}>
              <Text style={styles.changeAvatarBtnText}>Change avatar</Text>
              <Ionicons name="camera-outline" size={rs(13)} color="#374151" style={{ marginLeft: rs(4) }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 3: Section Intro */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>A little about your Nest</Text>
          <Text style={styles.introSubtitle}>
            Give your next adventure a place to begin.
          </Text>
        </View>

        {/* SECTION 4: Form Fields */}
        <View style={styles.formSection}>
          {/* Field 1: Community Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Community name</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.textInput}
                value={communityName}
                onChangeText={setCommunityName}
                placeholder="Enter community name"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Field 2: Brief Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Brief description</Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <TextInput 
                style={[styles.textInput, styles.textAreaInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe what your community is about"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Field 3: Topic Chips */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Topic</Text>
            <View style={styles.topicsRow}>
              {topics.map((topic) => {
                const isActive = selectedTopic === topic;
                return (
                  <TouchableOpacity
                    key={topic}
                    style={[
                      styles.topicChip,
                      isActive && styles.topicChipActive
                    ]}
                    onPress={() => setSelectedTopic(topic)}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.topicChipText,
                      isActive && styles.topicChipTextActive
                    ]}>
                      {topic}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Field 4: Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location-outline" size={rs(17)} color="#ff9500" style={styles.inputIconLeft} />
              <TextInput 
                style={styles.textInput}
                value={location}
                onChangeText={setLocation}
                placeholder="City, Country"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Field 5: Who can join? */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Who can join?</Text>
            <View style={styles.privacyOptionsRow}>
              {/* Public Option */}
              <TouchableOpacity 
                style={[
                  styles.privacyCard,
                  privacyType === 'public' && styles.privacyCardActive
                ]}
                onPress={() => setPrivacyType('public')}
                activeOpacity={0.8}
              >
                <View style={styles.privacyCardHeader}>
                  <Text style={styles.privacyCardTitle}>Public</Text>
                  <View style={[
                    styles.radioCircle,
                    privacyType === 'public' && styles.radioCircleActive
                  ]}>
                    {privacyType === 'public' && <View style={styles.radioDot} />}
                  </View>
                </View>
                <Text style={styles.privacyCardDesc}>
                  Anyone can find and join your Nest.
                </Text>
              </TouchableOpacity>

              {/* Private Option */}
              <TouchableOpacity 
                style={[
                  styles.privacyCard,
                  privacyType === 'private' && styles.privacyCardActive
                ]}
                onPress={() => setPrivacyType('private')}
                activeOpacity={0.8}
              >
                <View style={styles.privacyCardHeader}>
                  <Text style={styles.privacyCardTitle}>Private</Text>
                  <View style={[
                    styles.radioCircle,
                    privacyType === 'private' && styles.radioCircleActive
                  ]}>
                    {privacyType === 'private' && <View style={styles.radioDot} />}
                  </View>
                </View>
                <Text style={styles.privacyCardDesc}>
                  People request to join, you approve.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* SECTION 5: Create Community CTA Button */}
        <TouchableOpacity 
          style={styles.createBtnWrapper}
          onPress={handleCreateCommunity}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#fec500', '#f0a300']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.createBtn}
          >
            <Text style={styles.createBtnText}>Create community</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer Note */}
        <Text style={styles.footerNote}>
          You can edit these details anytime in Manage Nest.
        </Text>

        {/* Bottom padding for TabBar and Floating Mascot */}
        <View style={{ height: TABBAR_HEIGHT + rs(65) }} />
      </ScrollView>

      {/* FLOATING AISUP MASCOT */}
      <AISup />

      {/* TABBAR MENU */}
      <TabBarMenu activeTab="discover" />

      {/* COMMUNITY CREATED SUCCESS MODAL */}
      <Modal
        visible={isSuccessModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleSuccessClose}
      >
        <TouchableWithoutFeedback onPress={handleSuccessClose}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.successModalCard}>
                <View style={styles.successIconCircle}>
                  <Ionicons name="checkmark-circle" size={rs(48)} color="#22c55e" />
                </View>
                <Text style={styles.successModalTitle}>Nest Created!</Text>
                <Text style={styles.successModalDesc}>
                  "{communityName}" is now live! Start inviting friends and creating events.
                </Text>
                <TouchableOpacity
                  style={styles.successModalBtn}
                  onPress={handleSuccessClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.successModalBtnText}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    opacity: 0.35,
  },

  /* FIXED TOP HEADER */
  fixedHeaderArea: {
    position: 'relative',
    width: '100%',
    height: OVERLAY_HEIGHT + rs(55),
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    paddingTop: rs(72),
  },
  backButton: {
    width: rs(36),
    height: rs(36),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(8),
  },
  headerTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(20),
    color: '#1e1810',
  },

  /* SCROLL CONTENT */
  scrollContent: {
    paddingHorizontal: rs(16),
    paddingTop: rs(10),
  },

  /* SECTION 1: Success Banner */
  successBanner: {
    backgroundColor: '#f0fdf4',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#bbf7d0',
    padding: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(14),
  },
  bannerCheckCircle: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13.5),
    color: '#166534',
  },
  bannerSubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#15803d',
    lineHeight: rs(16),
    marginTop: rs(2),
  },

  /* SECTION 2: Media Section (Cover & Avatar) */
  mediaSection: {
    marginBottom: rs(16),
  },
  coverWrapper: {
    width: '100%',
    height: rs(130),
    borderRadius: rs(16),
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f3f4f6',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  changeCoverBtn: {
    position: 'absolute',
    top: rs(10),
    right: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: rs(10),
    paddingVertical: rs(4.5),
    borderRadius: rs(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  changeCoverBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(11.5),
    color: '#111827',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -rs(24),
    paddingHorizontal: rs(14),
  },
  avatarContainer: {
    width: rs(58),
    height: rs(58),
    borderRadius: rs(29),
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#ffedd5',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  changeAvatarBtn: {
    marginLeft: rs(12),
    marginTop: rs(18),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: rs(12),
    paddingVertical: rs(5),
    borderRadius: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeAvatarBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(12),
    color: '#374151',
  },

  /* SECTION 3: Intro */
  introSection: {
    marginBottom: rs(14),
  },
  introTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17),
    color: '#111827',
  },
  introSubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#6b7280',
    marginTop: rs(2),
  },

  /* SECTION 4: Form Fields */
  formSection: {
    marginBottom: rs(14),
  },
  inputGroup: {
    marginBottom: rs(12),
  },
  inputLabel: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13),
    color: '#374151',
    marginBottom: rs(6),
  },
  inputWrapper: {
    height: rs(44),
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(14),
  },
  textInput: {
    flex: 1,
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(14),
    color: '#111827',
    height: '100%',
  },
  inputIconLeft: {
    marginRight: rs(8),
  },
  textAreaWrapper: {
    height: rs(76),
    alignItems: 'flex-start',
    paddingVertical: rs(8),
  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: '100%',
    lineHeight: rs(19),
  },

  /* Topics */
  topicsRow: {
    flexDirection: 'row',
    gap: rs(8),
  },
  topicChip: {
    paddingHorizontal: rs(14),
    paddingVertical: rs(7),
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  topicChipActive: {
    borderColor: '#ffaa00',
    backgroundColor: '#fffbeb',
  },
  topicChipText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13),
    color: '#4b5563',
  },
  topicChipTextActive: {
    fontFamily: 'AfacadFlux_700Bold',
    color: '#b45309',
  },

  /* Privacy Cards */
  privacyOptionsRow: {
    flexDirection: 'row',
    gap: rs(10),
  },
  privacyCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: rs(14),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: rs(12),
  },
  privacyCardActive: {
    borderColor: '#ffaa00',
    borderWidth: 1.5,
    backgroundColor: '#fffefc',
  },
  privacyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(4),
  },
  privacyCardTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
    color: '#111827',
  },
  privacyCardDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(11.5),
    color: '#6b7280',
    lineHeight: rs(15),
  },
  radioCircle: {
    width: rs(16),
    height: rs(16),
    borderRadius: rs(8),
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleActive: {
    borderColor: '#ffaa00',
  },
  radioDot: {
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    backgroundColor: '#ffaa00',
  },

  /* SECTION 5: CTA & Footer */
  createBtnWrapper: {
    width: '100%',
    marginTop: rs(4),
  },
  createBtn: {
    height: rs(48),
    borderRadius: rs(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#ffffff',
  },
  footerNote: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    textAlign: 'center',
    marginTop: rs(8),
  },

  /* SUCCESS MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rs(24),
  },
  successModalCard: {
    width: '100%',
    maxWidth: rs(300),
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    padding: rs(22),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  successIconCircle: {
    marginBottom: rs(10),
  },
  successModalTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#111827',
    marginBottom: rs(6),
  },
  successModalDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: rs(18),
    marginBottom: rs(18),
  },
  successModalBtn: {
    backgroundColor: '#ffb703',
    paddingVertical: rs(10),
    paddingHorizontal: rs(36),
    borderRadius: rs(20),
  },
  successModalBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14.5),
    color: '#ffffff',
  },
});
