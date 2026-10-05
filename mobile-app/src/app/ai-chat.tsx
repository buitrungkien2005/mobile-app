import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Platform, TextInput, ImageBackground, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TabBarMenu from '../components/TabBarMenu';
import GuestTabBarMenu from '../components/GuestTabBarMenu';
import { rs } from '../utils/scaling';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function AiChatScreen() {
  const router = useRouter();
  const { isGuest } = useLocalSearchParams();
  const [inputText, setInputText] = useState('');
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleAction = (userAction: () => void) => {
    if (isGuest === 'true') {
      setShowSignInModal(true);
    } else {
      userAction();
    }
  };

  const emojis = ['😊', '😂', '🥺', '😍', '🙏', '👍', '🎉', '❤️'];

  const suggestedBuzzes = [
    'What sweet local meetups are happening this weekend?',
    'Show me the nearest honey spots and cafes.'
  ];

  const handleSuggestedBuzz = (text: string) => {
    setInputText(text);
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputText(prev => prev + emoji);
    setShowEmojiMenu(false);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* 1. Chat Header Background (z-index 0) */}
      <Image 
        source={require('../../assets/images/chat-header.png')} 
        style={styles.chatHeaderBg}
        resizeMode="stretch"
      />

      {/* 2. Header Overlay Wavy (z-index 1) */}
      <View style={styles.headerContainer} pointerEvents="none">
        <Image 
          source={require('../../assets/images/profile_overlay_new.png')} 
          style={styles.overlay} 
          resizeMode="cover" 
        />
      </View>

      {/* 3. Custom Header Bar Content (z-index 2) */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={rs(20)} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Image 
            source={require('../../assets/images/avatar-container.png')} 
            style={styles.headerAvatar} 
            resizeMode="contain" 
          />
          <View>
            <Text style={styles.headerTitle}>BeeBuddy AI</Text>
            <Text style={styles.headerSubtitle}>Always active to buzz back</Text>
          </View>
        </View>
      </View>

      {/* Chat Content */}
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={styles.chatContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Suggested Buzzes */}
        <View style={styles.suggestedCard}>
          <View style={styles.suggestedHeader}>
            <Ionicons name="sparkles" size={rs(16)} color="#d97706" />
            <Text style={styles.suggestedTitle}>SUGGESTED BUZZES</Text>
          </View>
          
          <TouchableOpacity onPress={() => handleSuggestedBuzz(suggestedBuzzes[0])}>
            <Text style={styles.suggestedText}>"{suggestedBuzzes[0]}"</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity onPress={() => handleSuggestedBuzz(suggestedBuzzes[1])}>
            <Text style={styles.suggestedText}>"{suggestedBuzzes[1]}"</Text>
          </TouchableOpacity>
        </View>

        {/* Date Divider */}
        <View style={styles.dateDividerContainer}>
          <View style={styles.dateLine} />
          <Text style={styles.dateText}>TODAY</Text>
          <View style={styles.dateLine} />
        </View>

        {/* Chat Bubble AI */}
        <View style={styles.messageRowLeft}>
          <Image source={require('../../assets/images/mini-avatar.png')} style={styles.chatAvatar} resizeMode="contain" />
          <View style={styles.bubbleAI}>
            <Text style={styles.messageText}>Hi! I'm BeeBuddy AI. I can help you find local meetups, recommend spots, or guide you through the app. How can I help?</Text>
            <Text style={styles.timeText}>09:41 AM</Text>
          </View>
        </View>

        {/* Chat Bubble User */}
        <View style={styles.messageRowRight}>
          <View style={styles.bubbleUser}>
            <Text style={styles.messageText}>How do I use 'Close Circle' to share honey spots?</Text>
            <Text style={styles.timeTextUser}>09:42 AM</Text>
          </View>
        </View>

        {/* Chat Bubble AI */}
        <View style={styles.messageRowLeft}>
          <Image source={require('../../assets/images/mini-avatar.png')} style={styles.chatAvatar} resizeMode="contain" />
          <View style={styles.bubbleAI}>
            <Text style={styles.messageText}>When creating a post about a spot, select 'Close Circle' under "Who can view this post?". Only your chosen friends will see it.</Text>
            <Text style={styles.timeText}>09:43 AM</Text>
          </View>
        </View>
      </ScrollView>

      {/* Invisible Overlay to close menus when clicking outside */}
      {(showAttachMenu || showEmojiMenu) && (
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          activeOpacity={1} 
          onPress={() => {
            setShowAttachMenu(false);
            setShowEmojiMenu(false);
          }}
        />
      )}

      {/* Bottom Section (Input + Menus) */}
      <View style={styles.bottomSection}>
        {/* Attachment Menu */}
        {showAttachMenu && (
          <View style={styles.attachMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => setShowAttachMenu(false)}>
              <Ionicons name="document-outline" size={rs(20)} color="#111827" />
              <Text style={styles.menuText}>Upload File</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => setShowAttachMenu(false)}>
              <Ionicons name="image-outline" size={rs(20)} color="#111827" />
              <Text style={styles.menuText}>Upload Picture</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Emoji Menu */}
        {showEmojiMenu && (
          <View style={styles.emojiMenu}>
            {emojis.map(e => (
              <TouchableOpacity key={e} onPress={() => handleEmojiSelect(e)} style={styles.emojiBtn}>
                <Text style={styles.emojiText}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.attachBtn} 
            onPress={() => handleAction(() => { setShowAttachMenu(!showAttachMenu); setShowEmojiMenu(false); })}
          >
            <Ionicons name="add" size={rs(24)} color="#000" />
          </TouchableOpacity>
          
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.textInput}
              placeholder="Buzz a message..."
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity 
              style={styles.smileBtn}
              onPress={() => handleAction(() => { setShowEmojiMenu(!showEmojiMenu); setShowAttachMenu(false); })}
            >
              <Ionicons name="happy-outline" size={rs(20)} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.sendBtn}>
            <Ionicons name="arrow-up" size={rs(20)} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* TabBar */}
      {isGuest === 'true' ? (
        <GuestTabBarMenu activeTab="none" />
      ) : (
        <TabBarMenu activeTab="none" />
      )}

      {/* Guest Sign-In Modal */}
      <Modal visible={showSignInModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Sign in required</Text>
            <Text style={styles.modalSubtitle}>Log in or create an account{'\n'}to comment and share.</Text>
            <TouchableOpacity 
              style={styles.modalBtn} 
              onPress={() => {
                setShowSignInModal(false);
                router.push('/(auth)/login');
              }}
            >
              <Text style={styles.modalBtnText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    width: '100%',
    height: OVERLAY_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  chatHeaderBg: {
    width: '100%',
    height: width * (135 / 393),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  headerBar: {
    width: '100%',
    height: width * (135 / 393),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    paddingTop: OVERLAY_HEIGHT - 15, // Slightly higher
    zIndex: 2,
  },
  backButton: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(12),
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: rs(44),
    height: rs(44),
    marginRight: rs(10),
  },
  headerTitle: {
    fontSize: rs(16),
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: rs(12),
    color: '#4ade80',
    fontWeight: '500',
  },
  chatContent: {
    paddingHorizontal: rs(20),
    paddingTop: rs(5), // Reduced further to move suggested buzzes higher
    paddingBottom: rs(20), 
  },
  suggestedCard: {
    backgroundColor: '#fffbeb',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#ffb703',
    padding: rs(16),
    marginBottom: rs(20),
  },
  suggestedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  suggestedTitle: {
    fontSize: rs(12),
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: rs(6),
  },
  suggestedText: {
    fontSize: rs(14),
    color: '#111827',
    lineHeight: rs(20),
  },
  divider: {
    height: rs(1),
    backgroundColor: '#fde68a',
    marginVertical: rs(12),
  },
  dateDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(20),
  },
  dateLine: {
    flex: 1,
    height: rs(1),
    backgroundColor: '#e5e7eb',
  },
  dateText: {
    fontSize: rs(11),
    color: '#6b7280',
    fontWeight: 'bold',
    marginHorizontal: rs(10),
  },
  messageRowLeft: {
    flexDirection: 'row',
    marginBottom: rs(16),
    alignItems: 'flex-end',
  },
  messageRowRight: {
    flexDirection: 'row',
    marginBottom: rs(16),
    justifyContent: 'flex-end',
  },
  chatAvatar: {
    width: rs(28),
    height: rs(28),
    marginRight: rs(8),
  },
  bubbleAI: {
    backgroundColor: '#f3f4f6',
    borderRadius: rs(20),
    borderBottomLeftRadius: 4, // Reverted to bottom-left
    padding: rs(14),
    maxWidth: '80%',
  },
  bubbleUser: {
    backgroundColor: '#ffb703',
    borderRadius: rs(20),
    borderBottomRightRadius: 4, // Reverted to bottom-right
    padding: rs(14),
    maxWidth: '80%',
  },
  messageText: {
    fontSize: rs(14),
    color: '#111827',
    lineHeight: rs(20),
  },
  timeText: {
    fontSize: rs(10),
    color: '#9ca3af',
    marginTop: rs(6),
  },
  timeTextUser: {
    fontSize: rs(10),
    color: '#b45309',
    marginTop: rs(6),
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    paddingVertical: rs(12),
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#f3f4f6',
  },
  attachBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: rs(20),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: rs(12),
    height: rs(40),
    marginRight: rs(10),
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: rs(14),
    color: '#111827',
  },
  smileBtn: {
    marginLeft: rs(8),
  },
  sendBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    width: '100%',
    paddingBottom: TABBAR_HEIGHT,
    backgroundColor: '#ffffff',
  },
  attachMenu: {
    position: 'absolute',
    bottom: '100%',
    left: rs(16),
    backgroundColor: '#ffffff',
    borderRadius: rs(12),
    padding: rs(8),
    marginBottom: rs(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(10),
    paddingHorizontal: rs(12),
  },
  menuText: {
    fontSize: rs(14),
    color: '#111827',
    marginLeft: rs(12),
  },
  menuDivider: {
    height: rs(1),
    backgroundColor: '#f3f4f6',
    marginVertical: rs(4),
  },
  emojiMenu: {
    position: 'absolute',
    bottom: '100%',
    right: rs(16),
    backgroundColor: '#ffffff',
    borderRadius: rs(24),
    padding: rs(8),
    marginBottom: rs(8),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  emojiBtn: {
    padding: rs(8),
  },
  emojiText: {
    fontSize: rs(24),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: rs(16),
    paddingHorizontal: rs(40),
    paddingVertical: rs(32),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: rs(16),
    fontWeight: 'bold',
    color: '#ffbb00', // Matches brand yellow
    marginBottom: rs(8),
  },
  modalSubtitle: {
    fontSize: rs(13),
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: rs(20),
    lineHeight: rs(18),
  },
  modalBtn: {
    backgroundColor: '#ffbb00',
    paddingVertical: rs(10),
    paddingHorizontal: rs(32),
    borderRadius: rs(24),
  },
  modalBtnText: {
    fontSize: rs(14),
    fontWeight: 'bold',
    color: '#000',
  },
});
