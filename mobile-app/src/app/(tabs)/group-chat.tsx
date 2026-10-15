import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Keyboard,
  BackHandler 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 55;

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: any;
  text: string;
  time: string;
  isMe: boolean;
}

export default function GroupChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const groupTitle = (params.groupName as string) || 'Weekend Crew';
  const [inputText, setInputText] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Initial group conversation
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: '1',
      senderName: 'Priya Sharma',
      senderAvatar: require('../../../assets/images/Priya_Sharma.png'),
      text: 'Hey everyone! 👋 Super excited for our weekend walk! What trail are we thinking?',
      time: '10:48 AM',
      isMe: false,
    },
    {
      id: 'm2',
      senderId: '2',
      senderName: 'Jake Miller',
      senderAvatar: require('../../../assets/images/Jake_Miller.png'),
      text: 'Awesome! How about the scenic ridge trail? The weather should be perfect on Saturday ☀️',
      time: '10:50 AM',
      isMe: false,
    },
    {
      id: 'm3',
      senderId: '3',
      senderName: 'Linh Nguyen',
      senderAvatar: require('../../../assets/images/Avatar_YukiTanaka.png'),
      text: "Count me in! I'll bring some iced matcha and snacks for all of us 🍵✨",
      time: '10:51 AM',
      isMe: false,
    },
  ]);

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    
    const showSub = Keyboard.addListener(showEvt, () => {
      setKeyboardVisible(true);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 150);
    });
    const hideSub = Keyboard.addListener(hideEvt, () => setKeyboardVisible(false));
    
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Handle hardware back on Android
  useEffect(() => {
    const backAction = () => {
      router.replace('/(tabs)/messages');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'You',
      text: text.trim(),
      time: 'Just now',
      isMe: true,
    };

    setMessages(prev => [...prev, newMessage]);
    if (!textToSend) setInputText('');
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 150);
  };

  const tabbarClearance = rs(TABBAR_HEIGHT) + insets.bottom;
  const bottomPadding = isKeyboardVisible ? rs(12) : tabbarClearance + rs(12);

  return (
    <View style={styles.container}>
      {/* Background Watermark Pattern */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      {/* FIXED TOP HEADER */}
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(65) }]}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} 
          resizeMode="cover" 
        />
        <View style={[styles.headerTop, { paddingTop: rs(75) }]}>
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)/messages')} 
            style={styles.backButtonRound}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={rs(20)} color="#111827" />
          </TouchableOpacity>

          {/* Group Header Info */}
          <View style={styles.headerGroupInfo}>
            {/* Clustered Group Avatars Facepile */}
            <View style={styles.facepileContainer}>
              <Image 
                source={require('../../../assets/images/Priya_Sharma.png')} 
                style={[styles.facepileAvatar, { zIndex: 3, left: 0 }]} 
              />
              <Image 
                source={require('../../../assets/images/Jake_Miller.png')} 
                style={[styles.facepileAvatar, { zIndex: 2, left: rs(14) }]} 
              />
              <Image 
                source={require('../../../assets/images/Avatar_YukiTanaka.png')} 
                style={[styles.facepileAvatar, { zIndex: 1, left: rs(28) }]} 
              />
            </View>

            <View style={styles.groupTextWrapper}>
              <Text style={styles.headerGroupName} numberOfLines={1}>{groupTitle}</Text>
              <Text style={styles.headerGroupSub}>3 members · Active now</Text>
            </View>
          </View>

          {/* Right Action Icons */}
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.7}>
              <Ionicons name="call-outline" size={rs(20)} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.7}>
              <Ionicons name="ellipsis-vertical" size={rs(20)} color="#111827" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* KEYBOARD AVOIDING CHAT VIEW */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          {/* Group Intro Card */}
          <View style={styles.groupIntroCard}>
            <View style={styles.introFacepileLarge}>
              <Image 
                source={require('../../../assets/images/Priya_Sharma.png')} 
                style={[styles.largeAvatar, { left: 0, zIndex: 3 }]} 
              />
              <Image 
                source={require('../../../assets/images/Jake_Miller.png')} 
                style={[styles.largeAvatar, { left: rs(26), zIndex: 2 }]} 
              />
              <Image 
                source={require('../../../assets/images/Avatar_YukiTanaka.png')} 
                style={[styles.largeAvatar, { left: rs(52), zIndex: 1 }]} 
              />
            </View>

            <Text style={styles.introTitle}>{groupTitle}</Text>
            <Text style={styles.introSubtitle}>
              Group created by You with Priya, Jake, and Linh
            </Text>
            <View style={styles.introBadge}>
              <Text style={styles.introBadgeText}>
                🐝 Let the good buzz begin!
              </Text>
            </View>
          </View>

          {/* System Date Divider */}
          <View style={styles.dateDivider}>
            <View style={styles.dateLine} />
            <Text style={styles.dateText}>TODAY</Text>
            <View style={styles.dateLine} />
          </View>

          {/* Chat Messages */}
          {messages.map(msg => (
            <View 
              key={msg.id} 
              style={[
                styles.messageRow, 
                msg.isMe ? styles.messageRowMe : styles.messageRowOther
              ]}
            >
              {!msg.isMe && (
                <Image source={msg.senderAvatar} style={styles.msgSenderAvatar} />
              )}

              <View style={[
                styles.bubbleWrapper,
                msg.isMe ? styles.bubbleWrapperMe : styles.bubbleWrapperOther
              ]}>
                {!msg.isMe && (
                  <Text style={styles.msgSenderName}>{msg.senderName}</Text>
                )}

                {msg.isMe ? (
                  <LinearGradient
                    colors={['#fec500', '#f0a300']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bubbleMe}
                  >
                    <Text style={styles.msgTextMe}>{msg.text}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.bubbleOther}>
                    <Text style={styles.msgTextOther}>{msg.text}</Text>
                  </View>
                )}

                <Text style={[
                  styles.msgTime, 
                  msg.isMe ? styles.msgTimeMe : styles.msgTimeOther
                ]}>
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}

          {/* SUGGESTED BUZZES ROW */}
          <View style={styles.suggestedSection}>
            <Text style={styles.suggestedTitle}>SUGGESTED REPLIES</Text>
            
            <TouchableOpacity 
              style={styles.buzzChip}
              onPress={() => handleSend("Sounds like a plan! Let's meet at 8 AM 🚶‍♂️")}
              activeOpacity={0.8}
            >
              <Text style={styles.buzzChipText}>
                "Sounds like a plan! Let's meet at 8 AM 🚶‍♂️"
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buzzChip}
              onPress={() => handleSend("I can drive and pick up everyone 🚗")}
              activeOpacity={0.8}
            >
              <Text style={styles.buzzChipText}>
                "I can drive and pick up everyone 🚗"
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* BOTTOM MESSAGE INPUT BAR */}
        <View style={[styles.inputContainer, { paddingBottom: bottomPadding }]}>
          <TouchableOpacity style={styles.plusButton} activeOpacity={0.7}>
            <Ionicons name="add" size={rs(24)} color="#111827" />
          </TouchableOpacity>
          
          <View style={styles.textInputWrapper}>
            <TextInput 
              style={styles.textInput}
              placeholder="Buzz a message to the group..."
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.emojiButton} activeOpacity={0.7}>
              <Ionicons name="happy-outline" size={rs(20)} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[
              styles.sendButton,
              inputText.trim().length > 0 && styles.sendButtonActive
            ]}
            onPress={() => handleSend()}
            activeOpacity={0.8}
          >
            <Ionicons 
              name="arrow-up" 
              size={rs(20)} 
              color={inputText.trim().length > 0 ? "#ffffff" : "#111827"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* TABBAR MENU & AISUP */}
      {!isKeyboardVisible && <TabBarMenu activeTab="messages" />}
      <AISup isGuest={false} />
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
  headerContainer: {
    width: width,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  overlay: {
    width: width,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
  },
  backButtonRound: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffb800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  headerGroupInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  facepileContainer: {
    width: rs(60),
    height: rs(36),
    position: 'relative',
    justifyContent: 'center',
  },
  facepileAvatar: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    borderWidth: 1.5,
    borderColor: '#ffffff',
    position: 'absolute',
  },
  groupTextWrapper: {
    flex: 1,
    marginLeft: rs(6),
  },
  headerGroupName: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17),
    color: '#111827',
  },
  headerGroupSub: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    marginTop: -rs(1),
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
  },
  headerActionBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  /* KEYBOARD & SCROLL CONTENT */
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: rs(16),
    paddingTop: rs(20),
    paddingBottom: rs(20),
  },

  /* GROUP INTRO CARD */
  groupIntroCard: {
    backgroundColor: '#ffffff',
    borderRadius: rs(20),
    borderWidth: 1,
    borderColor: '#ede8df',
    padding: rs(18),
    alignItems: 'center',
    marginBottom: rs(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  introFacepileLarge: {
    width: rs(100),
    height: rs(48),
    position: 'relative',
    marginBottom: rs(12),
  },
  largeAvatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    borderWidth: 2,
    borderColor: '#ffffff',
    position: 'absolute',
  },
  introTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#111827',
    marginBottom: rs(4),
  },
  introSubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: rs(10),
  },
  introBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: rs(12),
    paddingVertical: rs(4),
    borderRadius: rs(12),
  },
  introBadgeText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(12),
    color: '#b45309',
  },

  /* DATE DIVIDER */
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: rs(16),
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dateText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(11),
    color: '#9ca3af',
    marginHorizontal: rs(10),
    letterSpacing: 0.5,
  },

  /* MESSAGES */
  messageRow: {
    flexDirection: 'row',
    marginBottom: rs(14),
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  msgSenderAvatar: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    marginRight: rs(8),
    marginTop: rs(4),
  },
  bubbleWrapper: {
    maxWidth: '78%',
  },
  bubbleWrapperMe: {
    alignItems: 'flex-end',
  },
  bubbleWrapperOther: {
    alignItems: 'flex-start',
  },
  msgSenderName: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(12),
    color: '#6b7280',
    marginBottom: rs(3),
    marginLeft: rs(4),
  },
  bubbleMe: {
    paddingHorizontal: rs(14),
    paddingVertical: rs(10),
    borderRadius: rs(18),
    borderBottomRightRadius: rs(4),
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  msgTextMe: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(14.5),
    color: '#111827',
    lineHeight: rs(19),
  },
  bubbleOther: {
    backgroundColor: '#ffffff',
    paddingHorizontal: rs(14),
    paddingVertical: rs(10),
    borderRadius: rs(18),
    borderBottomLeftRadius: rs(4),
    borderWidth: 1,
    borderColor: '#ede8df',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  msgTextOther: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14.5),
    color: '#1f2937',
    lineHeight: rs(19),
  },
  msgTime: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(11),
    color: '#9ca3af',
    marginTop: rs(3),
  },
  msgTimeMe: {
    marginRight: rs(4),
  },
  msgTimeOther: {
    marginLeft: rs(4),
  },

  /* SUGGESTED REPLIES */
  suggestedSection: {
    marginTop: rs(16),
    marginBottom: rs(10),
  },
  suggestedTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(11),
    color: '#9ca3af',
    letterSpacing: 0.8,
    marginBottom: rs(8),
  },
  buzzChip: {
    backgroundColor: '#fffdf5',
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: rs(14),
    paddingHorizontal: rs(14),
    paddingVertical: rs(10),
    marginBottom: rs(8),
  },
  buzzChipText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13),
    color: '#b45309',
    lineHeight: rs(18),
  },

  /* INPUT BAR */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    paddingTop: rs(8),
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  plusButton: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(8),
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: rs(24),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: rs(14),
    height: rs(42),
    marginRight: rs(8),
  },
  textInput: {
    flex: 1,
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14.5),
    color: '#111827',
  },
  emojiButton: {
    padding: rs(4),
  },
  sendButton: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#ffb800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#f59e0b',
  },
});
