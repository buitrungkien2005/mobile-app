<<<<<<< HEAD
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
=======
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
>>>>>>> 277c38f (Fix giao dien app)
import { rs } from '../../utils/scaling';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 55;

<<<<<<< HEAD
=======
interface MessageItem {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

>>>>>>> 277c38f (Fix giao dien app)
const MOCK_DB: Record<string, any> = {
  '1': {
    name: 'Priya Sharma',
    firstName: 'Priya',
<<<<<<< HEAD
    avatar: require('../../../assets/images/Avatar_MinhTran.png'), // bee with headphones
=======
    avatar: require('../../../assets/images/Priya_Sharma.png'), // bee with headphones
>>>>>>> 277c38f (Fix giao dien app)
  },
  '2': {
    name: 'Jake Miller',
    firstName: 'Jake',
<<<<<<< HEAD
    avatar: require('../../../assets/images/Avatar_SoraPark.png'), // bee without headphones
=======
    avatar: require('../../../assets/images/Jake_Miller.png'), // bee without headphones
  },
  '3': {
    name: 'Linh Nguyen',
    firstName: 'Linh',
    avatar: require('../../../assets/images/LinhNguyen.png'),
  },
  '4': {
    name: 'Minh Tran',
    firstName: 'Minh',
    avatar: require('../../../assets/images/Avatar_MinhTran.png'),
  },
  'n2': {
    name: 'Elena Rostova',
    firstName: 'Elena',
    avatar: require('../../../assets/images/Elena.png'),
  },
  'n3': {
    name: 'Marcus Aurelius',
    firstName: 'Marcus',
    avatar: require('../../../assets/images/Marcus.png'),
    hasReceivedRequest: true,
    mutualConnections: '3 mutual connections',
    requestMessage: "Hey! Saw you at the design workshop last night. Let's exchange ideas sometime!",
    requestTime: '1h ago'
  },
  'a1': {
    name: 'Sophia Martinez',
    firstName: 'Sophia',
    avatar: require('../../../assets/images/Sophia_Martinez.png'),
    isMessageRequest: true,
  },
  'a2': {
    name: 'Kenji Sato',
    firstName: 'Kenji',
    avatar: require('../../../assets/images/Kenji_Sato.png'),
    isMessageRequest: true,
  },
  'a7': {
    name: 'Siddharth Sen',
    firstName: 'Siddharth',
    avatar: require('../../../assets/images/Siddharth_Sen.png'),
    isMessageRequest: true,
  },
  'r1': {
    name: 'Amina Mansoor',
    firstName: 'Amina',
    avatar: require('../../../assets/images/Amina_Mansoor.png'),
  },
  'r2': {
    name: 'David Chen',
    firstName: 'David',
    avatar: require('../../../assets/images/David_Chen.png'),
  },
  'r3': {
    name: 'Sonia Petrova',
    firstName: 'Sonia',
    avatar: require('../../../assets/images/Sonia_Petrova.png'),
  },
  'd1': {
    name: 'Alex Kim',
    firstName: 'Alex',
    avatar: require('../../../assets/images/Avatar_AlexKim.png'),
  },
  'd2': {
    name: 'Minh Tran',
    firstName: 'Minh',
    avatar: require('../../../assets/images/Avatar_MinhTran.png'),
  },
  'd3': {
    name: 'Sora Park',
    firstName: 'Sora',
    avatar: require('../../../assets/images/Avatar_SoraPark.png'),
  },
  'd4': {
    name: 'Yuki Tanaka',
    firstName: 'Yuki',
    avatar: require('../../../assets/images/Avatar_YukiTanaka.png'),
  },
  'alex': {
    name: 'Alex Kim',
    firstName: 'Alex',
    avatar: require('../../../assets/images/Avatar_AlexKim.png'),
  },
  'sora': {
    name: 'Sora Park',
    firstName: 'Sora',
    avatar: require('../../../assets/images/Avatar_SoraPark.png'),
  },
  'yuki': {
    name: 'Yuki Tanaka',
    firstName: 'Yuki',
    avatar: require('../../../assets/images/Avatar_YukiTanaka.png'),
  },
  'minh': {
    name: 'Minh Tran',
    firstName: 'Minh',
    avatar: require('../../../assets/images/Avatar_MinhTran.png'),
>>>>>>> 277c38f (Fix giao dien app)
  }
};

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
<<<<<<< HEAD
  
  const userData = MOCK_DB[id as string] || MOCK_DB['1'];

=======
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const userData = MOCK_DB[id as string] || MOCK_DB['1'];

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content) return;

    const newMsg: MessageItem = {
      id: Date.now().toString(),
      sender: 'me',
      text: content,
      time: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulated friendly reply from friend
    if (userData.firstName) {
      setTimeout(() => {
        const replyMsg: MessageItem = {
          id: (Date.now() + 1).toString(),
          sender: 'other',
          text: `Hey! Thanks for buzzing me! Great to connect with you! 😊`,
          time: 'Just now'
        };
        setMessages(prev => [...prev, replyMsg]);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 900);
    }
  };

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    
    const showSub = Keyboard.addListener(showEvt, () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener(hideEvt, () => setKeyboardVisible(false));
    
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const tabbarClearance = rs(TABBAR_HEIGHT) + insets.bottom;
  const bottomPadding = isKeyboardVisible ? rs(12) : tabbarClearance + rs(12);

>>>>>>> 277c38f (Fix giao dien app)
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(65) }]}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} 
          resizeMode="cover" 
        />
<<<<<<< HEAD
        <View style={[styles.headerTop, { paddingTop: rs(65), position: 'relative' }]}>
=======
        <View style={[styles.headerTop, { paddingTop: rs(75), position: 'relative' }]}>
>>>>>>> 277c38f (Fix giao dien app)
          <TouchableOpacity onPress={() => router.back()} style={styles.backButtonRound}>
            <Ionicons name="arrow-back" size={rs(20)} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerUser}>
            <Image source={userData.avatar} style={styles.headerAvatar} />
            <Text style={styles.headerName}>{userData.name}</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
<<<<<<< HEAD
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
=======
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
>>>>>>> 277c38f (Fix giao dien app)
          {/* Hexagon pattern can be added as background image if needed, keeping it clean for now */}
          
          <View style={styles.emptyStateContainer}>
            <Image source={userData.avatar} style={styles.largeAvatar} />
            <Text style={styles.emptyStateName}>{userData.name}</Text>
<<<<<<< HEAD
            <Text style={styles.emptyStateSub}>Start a conversation with {userData.firstName}</Text>
          </View>

          <View style={styles.suggestedSection}>
            <Text style={styles.suggestedTitle}>SUGGESTED BUZZES</Text>
            
            <TouchableOpacity style={styles.buzzCardYellow}>
              <Text style={styles.buzzCardText}>
                "Hey {userData.firstName}! I noticed we both love coding. What languages are you working with lately?"
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buzzCardGray}>
              <Text style={styles.buzzCardText}>
                "Any good game recommendations? I'm always looking for something new to play!"
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={[styles.inputContainer, { paddingBottom: rs(80) }]}>
          <TouchableOpacity style={styles.plusButton}>
=======
            <Text style={styles.emptyStateSub}>
              {userData.isMessageRequest 
                ? 'Not in your connections' 
                : userData.hasReceivedRequest 
                ? userData.mutualConnections 
                : `Start a conversation with ${userData.firstName}`}
            </Text>
          </View>

          {userData.isMessageRequest ? (
            <View style={styles.messageRequestBanner}>
              <Text style={styles.messageRequestBannerTitle}>
                Your message will be sent as message request
              </Text>
              <Text style={styles.messageRequestBannerDesc}>
                {userData.firstName} will need to accept before seeing your messages
              </Text>
            </View>
          ) : userData.hasReceivedRequest ? (
            <View style={styles.requestMessageSection}>
              <View style={styles.requestBubble}>
                <Text style={styles.requestMessageText}>{userData.requestMessage}</Text>
                <Text style={styles.requestTimeText}>{userData.requestTime}</Text>
              </View>
              <View style={styles.requestActions}>
                <TouchableOpacity style={[styles.requestBtn, styles.acceptBtn]}>
                  <Text style={styles.acceptBtnText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.requestBtn, styles.declineBtn]}>
                  <Text style={styles.declineBtnText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.suggestedSection}>
              <Text style={styles.suggestedTitle}>SUGGESTED BUZZES</Text>
              
              <TouchableOpacity 
                style={styles.buzzCardYellow}
                onPress={() => handleSendMessage(`Hey ${userData.firstName}! I noticed we both love coding. What languages are you working with lately?`)}
                activeOpacity={0.8}
              >
                <Text style={styles.buzzCardText}>
                  "Hey {userData.firstName}! I noticed we both love coding. What languages are you working with lately?"
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.buzzCardGray}
                onPress={() => handleSendMessage("Any good game recommendations? I'm always looking for something new to play!")}
                activeOpacity={0.8}
              >
                <Text style={styles.buzzCardText}>
                  "Any good game recommendations? I'm always looking for something new to play!"
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Render Active Conversation Messages */}
          {messages.length > 0 && (
            <View style={styles.chatFeedContainer}>
              <View style={styles.dateDivider}>
                <View style={styles.dateLine} />
                <Text style={styles.dateText}>TODAY</Text>
                <View style={styles.dateLine} />
              </View>

              {messages.map((item) => (
                <View 
                  key={item.id} 
                  style={[
                    styles.messageRow,
                    item.sender === 'me' ? styles.messageRowMe : styles.messageRowOther
                  ]}
                >
                  {item.sender === 'other' && (
                    <Image source={userData.avatar} style={styles.chatOtherAvatar} />
                  )}
                  <View style={item.sender === 'me' ? styles.bubbleMeWrapper : styles.bubbleOtherWrapper}>
                    {item.sender === 'me' ? (
                      <LinearGradient
                        colors={['#fec500', '#f0a300']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.bubbleMe}
                      >
                        <Text style={styles.msgTextMe}>{item.text}</Text>
                      </LinearGradient>
                    ) : (
                      <View style={styles.bubbleOther}>
                        <Text style={styles.msgTextOther}>{item.text}</Text>
                      </View>
                    )}
                    <Text style={[styles.msgTime, item.sender === 'me' ? styles.msgTimeMe : styles.msgTimeOther]}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputContainer, { paddingBottom: bottomPadding }]}>
          <TouchableOpacity style={styles.plusButton} activeOpacity={0.7}>
>>>>>>> 277c38f (Fix giao dien app)
            <Ionicons name="add" size={rs(24)} color="#111827" />
          </TouchableOpacity>
          
          <View style={styles.textInputWrapper}>
            <TextInput 
              style={styles.textInput}
              placeholder="Buzz a message..."
              placeholderTextColor="#9ca3af"
<<<<<<< HEAD
            />
            <TouchableOpacity style={styles.emojiButton}>
=======
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSendMessage()}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.emojiButton} activeOpacity={0.7}>
>>>>>>> 277c38f (Fix giao dien app)
              <Ionicons name="happy-outline" size={rs(20)} color="#6b7280" />
            </TouchableOpacity>
          </View>

<<<<<<< HEAD
          <TouchableOpacity style={styles.sendButton}>
=======
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && { opacity: 0.7 }]} 
            onPress={() => handleSendMessage()}
            activeOpacity={0.8}
          >
>>>>>>> 277c38f (Fix giao dien app)
            <Ionicons name="arrow-up" size={rs(20)} color="#111827" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

<<<<<<< HEAD
      <AISup isGuest={false} />
      <TabBarMenu activeTab="messages" />
=======
      {!isKeyboardVisible && <TabBarMenu activeTab="messages" />}
      <AISup isGuest={false} />
>>>>>>> 277c38f (Fix giao dien app)
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    width: width,
    zIndex: 10,
  },
  overlay: {
    width: width,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(20),
  },
  backButtonRound: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    backgroundColor: '#ffb800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(16),
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    marginRight: rs(12),
  },
  headerName: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(20),
    color: '#111827',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: rs(20),
    paddingTop: rs(40),
    paddingBottom: rs(20),
  },
  emptyStateContainer: {
    alignItems: 'center',
    marginBottom: rs(40),
  },
  largeAvatar: {
    width: rs(80),
    height: rs(80),
    borderRadius: rs(40),
    marginBottom: rs(16),
  },
  emptyStateName: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(24),
    color: '#111827',
    marginBottom: rs(8),
  },
  emptyStateSub: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#6b7280',
  },
  suggestedSection: {
    marginBottom: rs(20),
  },
  suggestedTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    color: '#6b7280',
    marginBottom: rs(12),
    letterSpacing: 0.5,
  },
  buzzCardYellow: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#ffb800',
    borderRadius: rs(16),
    padding: rs(16),
    marginBottom: rs(12),
  },
  buzzCardGray: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(16),
    padding: rs(16),
    marginBottom: rs(12),
  },
  buzzCardText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#374151',
    lineHeight: rs(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    paddingTop: rs(12),
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  plusButton: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(12),
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: rs(20),
    paddingHorizontal: rs(16),
    height: rs(40),
    marginRight: rs(12),
  },
  textInput: {
    flex: 1,
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
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
<<<<<<< HEAD
=======
  requestMessageSection: {
    paddingHorizontal: rs(20),
    marginTop: rs(24),
  },
  requestBubble: {
    backgroundColor: '#f9fafb',
    borderRadius: rs(16),
    padding: rs(16),
    marginBottom: rs(16),
  },
  requestMessageText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#111827',
    lineHeight: rs(22),
    marginBottom: rs(8),
  },
  requestTimeText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#9ca3af',
  },
  requestActions: {
    flexDirection: 'row',
    gap: rs(12),
  },
  requestBtn: {
    flex: 1,
    height: rs(44),
    borderRadius: rs(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptBtn: {
    backgroundColor: '#ffb800',
  },
  acceptBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#ffffff',
  },
  declineBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  declineBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#ef4444',
  },
  messageRequestBanner: {
    backgroundColor: '#fffdf4',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#fef08a',
    paddingVertical: rs(16),
    paddingHorizontal: rs(20),
    marginHorizontal: rs(20),
    marginTop: rs(24),
    alignItems: 'center',
  },
  messageRequestBannerTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#b45309',
    textAlign: 'center',
    marginBottom: rs(6),
  },
  messageRequestBannerDesc: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#78350f',
    textAlign: 'center',
  },
  chatFeedContainer: {
    marginTop: rs(10),
    marginBottom: rs(16),
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: rs(16),
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  dateText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(11),
    color: '#9ca3af',
    marginHorizontal: rs(12),
    letterSpacing: 0.5,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: rs(14),
    alignItems: 'flex-end',
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  chatOtherAvatar: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(16),
    marginRight: rs(8),
    marginBottom: rs(4),
  },
  bubbleMeWrapper: {
    alignItems: 'flex-end',
    maxWidth: '78%',
  },
  bubbleOtherWrapper: {
    alignItems: 'flex-start',
    maxWidth: '78%',
  },
  bubbleMe: {
    paddingHorizontal: rs(16),
    paddingVertical: rs(10),
    borderRadius: rs(18),
    borderBottomRightRadius: rs(4),
  },
  msgTextMe: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#ffffff',
    lineHeight: rs(20),
  },
  bubbleOther: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: rs(16),
    paddingVertical: rs(10),
    borderRadius: rs(18),
    borderBottomLeftRadius: rs(4),
  },
  msgTextOther: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#111827',
    lineHeight: rs(20),
  },
  msgTime: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(11),
    color: '#9ca3af',
    marginTop: rs(4),
  },
  msgTimeMe: {
    marginRight: rs(4),
  },
  msgTimeOther: {
    marginLeft: rs(4),
  },
>>>>>>> 277c38f (Fix giao dien app)
});
