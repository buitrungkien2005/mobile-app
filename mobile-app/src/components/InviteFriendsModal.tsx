import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { rs } from '../utils/scaling';

interface InviteFriendsModalProps {
  visible: boolean;
  onClose: () => void;
  inviteLink?: string;
  communityTitle?: string;
}

export default function InviteFriendsModal({
  visible,
  onClose,
  inviteLink = 'https://invite.link/abc...',
  communityTitle,
}: InviteFriendsModalProps) {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visible) {
      setCopied(false);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 12,
        speed: 14,
      }).start();
    } else {
      scaleValue.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const handleNativeShare = async (platformName?: string) => {
    try {
      const message = communityTitle
        ? `Join ${communityTitle} on BeeBuddy! ${inviteLink}`
        : `Join my community on BeeBuddy! ${inviteLink}`;
      await Share.share({ message });
    } catch (e) {
      // ignore
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalCard, { transform: [{ scale: scaleValue }] }]}>
              {/* Modal Title */}
              <Text style={styles.modalTitle}>Invite Friends</Text>

              {/* Share via WhatsApp */}
              <TouchableOpacity
                style={styles.shareOptionBtn}
                activeOpacity={0.7}
                onPress={() => handleNativeShare('WhatsApp')}
              >
                <Image
                  source={require('../../assets/images/whatapp.png')}
                  style={styles.shareOptionIcon}
                  resizeMode="contain"
                />
                <Text style={styles.shareOptionText}>Share via WhatsApp</Text>
                <Ionicons name="chevron-forward" size={rs(18)} color="#d1d5db" />
              </TouchableOpacity>

              {/* Share via Email */}
              <TouchableOpacity
                style={styles.shareOptionBtn}
                activeOpacity={0.7}
                onPress={() => handleNativeShare('Email')}
              >
                <Image
                  source={require('../../assets/images/Email.png')}
                  style={styles.shareOptionIcon}
                  resizeMode="contain"
                />
                <Text style={styles.shareOptionText}>Share via Email</Text>
                <Ionicons name="chevron-forward" size={rs(18)} color="#d1d5db" />
              </TouchableOpacity>

              {/* Share via Twitter */}
              <TouchableOpacity
                style={styles.shareOptionBtn}
                activeOpacity={0.7}
                onPress={() => handleNativeShare('Twitter')}
              >
                <Image
                  source={require('../../assets/images/Twitter.png')}
                  style={styles.shareOptionIcon}
                  resizeMode="contain"
                />
                <Text style={styles.shareOptionText}>Share via Twitter</Text>
                <Ionicons name="chevron-forward" size={rs(18)} color="#d1d5db" />
              </TouchableOpacity>

              {/* Social Icons Row (Facebook, Instagram, TikTok + Chevron) */}
              <TouchableOpacity
                style={styles.socialIconsRow}
                activeOpacity={0.7}
                onPress={() => handleNativeShare('Social')}
              >
                <Image
                  source={require('../../assets/images/Facebook.png')}
                  style={styles.socialIconLarge}
                  resizeMode="contain"
                />
                <Image
                  source={require('../../assets/images/Instagram.png')}
                  style={[styles.socialIconLarge, { width: rs(38), height: rs(38) }]}
                  resizeMode="contain"
                />
                <Image
                  source={require('../../assets/images/Tiktok.png')}
                  style={styles.socialIconLarge}
                  resizeMode="contain"
                />
                <Ionicons name="chevron-forward" size={rs(18)} color="#d1d5db" style={{ marginLeft: rs(4) }} />
              </TouchableOpacity>

              {/* Horizontal Divider */}
              <View style={styles.modalDivider} />

              {/* OR SHARE VIA LINK */}
              <Text style={styles.orShareText}>OR SHARE VIA LINK</Text>

              {/* Link Input Row */}
              <View style={styles.linkRow}>
                <View style={styles.linkInputBox}>
                  <Ionicons name="link-outline" size={rs(18)} color="#6b7280" style={{ marginRight: rs(8) }} />
                  <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="tail">
                    {inviteLink}
                  </Text>
                </View>

                <TouchableOpacity style={styles.copyBtnContainer} onPress={handleCopy} activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#ffbb00', '#ff7b00']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.copyBtnGradient}
                  >
                    <Text style={styles.copyBtnText}>{copied ? 'copied' : 'copy'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '86%',
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    paddingVertical: rs(24),
    paddingHorizontal: rs(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(6) },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(20),
    color: '#111827',
    textAlign: 'center',
    marginBottom: rs(20),
  },
  shareOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(30),
    paddingVertical: rs(10),
    paddingHorizontal: rs(14),
    marginBottom: rs(12),
    backgroundColor: '#ffffff',
  },
  shareOptionIcon: {
    width: rs(34),
    height: rs(34),
    marginRight: rs(12),
  },
  shareOptionText: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(14),
    color: '#111827',
  },
  socialIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: rs(14),
    marginTop: rs(6),
    marginBottom: rs(8),
  },
  socialIconLarge: {
    width: rs(34),
    height: rs(34),
    marginHorizontal: rs(6),
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: rs(16),
    width: '100%',
  },
  orShareText: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(11),
    color: '#6b7280',
    letterSpacing: 0.6,
    marginBottom: rs(10),
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
  },
  linkInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(12),
    paddingHorizontal: rs(12),
    paddingVertical: rs(10),
    backgroundColor: '#f9fafb',
  },
  linkText: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: rs(13),
    color: '#374151',
  },
  copyBtnContainer: {
    borderRadius: rs(12),
    overflow: 'hidden',
  },
  copyBtnGradient: {
    paddingVertical: rs(11),
    paddingHorizontal: rs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: rs(13),
    color: '#ffffff',
  },
});
