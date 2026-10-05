import React, { useState, useRef } from 'react';
import Reanimated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, Image, LayoutAnimation, UIManager, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rs } from '../../utils/scaling';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = SCREEN_WIDTH * (149 / 393);

type AuthMode = 'signIn' | 'signUp' | 'forgotPass' | 'verifyCode' | 'createProfile';


const EyeOpenIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

const EyeClosedIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12c0 0 3 6 8 6s8-6 8-6" />
  </Svg>
);

export default function AuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [mode, setMode] = useState<AuthMode>('signIn');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Buddy Profile fields
  const [selectedAvatar, setSelectedAvatar] = useState<number>(0);
  const [buddyName, setBuddyName] = useState('');

  // Bee AI popup state
  const [showBeeAI, setShowBeeAI] = useState(false);
  const [beeMessage, setBeeMessage] = useState('');
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  
  // Animation values
  const popupOpacityAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const beeIdleAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!showBeeAI) {
        Animated.sequence([
          // Trượt lên mượt mà với một chút hiệu ứng nảy nhẹ (overshoot)
          Animated.timing(beeIdleAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),
          // Dừng lại 1.5 giây
          Animated.delay(1500),
          // Trượt xuống từ từ
          Animated.timing(beeIdleAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          })
        ]).start();
      }
    }, 4500); // lặp lại mỗi 4.5 giây
    return () => clearInterval(interval);
  }, [showBeeAI, beeIdleAnim]);

  const otpInputs = useRef<Array<TextInput | null>>([]);

  const toggleBeeAI = () => {
    if (!showBeeAI) {
      setShowBeeAI(true);
      setSelectedChip(null);
      
      // Reset bee to original position if it's currently thinking
      Animated.timing(beeIdleAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      
      // Reset animations
      popupOpacityAnim.setValue(0);
      inputAnim.setValue(0);
      
      Animated.parallel([
        Animated.timing(popupOpacityAnim, { toValue: 1, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(inputAnim, { toValue: 1, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]).start();
      
    } else {
      Animated.timing(popupOpacityAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        setShowBeeAI(false);
      });
    }
  };

  const handleChipPress = (chipText: string) => {
    setSelectedChip(chipText);
    
    inputAnim.setValue(0);
    bubbleAnim.setValue(0);
    
    Animated.parallel([
      Animated.timing(inputAnim, { toValue: 1, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(bubbleAnim, { toValue: 1, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
  };

  const clearSelectedChip = () => {
    // Bubble fades out and slides up
    Animated.timing(bubbleAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      // Once bubble is gone, change back to default state
      setSelectedChip(null);
      
      // Default input bar and chips slide up and fade in
      inputAnim.setValue(0);
      Animated.timing(inputAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSendBeeMessage = () => {
    if (!beeMessage.trim()) return;
    setBeeMessage('');
    // You can handle message send logic here
  };

  const changeMode = (newMode: AuthMode) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMode(newMode);
  };

  const handleAction = () => {
    if (mode === 'forgotPass') {
      changeMode('verifyCode');
    } else if (mode === 'verifyCode') {
      changeMode('signIn');
    } else if (mode === 'signUp') {
      changeMode('createProfile');
    } else if (mode === 'createProfile') {
      router.replace('/(tabs)/profile');
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    // Tự động nhảy sang ô tiếp theo
    if (text.length === 1 && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const inputTranslateY = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });

  const bubbleTranslateY = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0] // starts higher (-20), slides down to 0
  });

  return (
    <View style={styles.container}>

      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Image 
            source={require('../../../assets/images/top_overlay.png')} 
            style={styles.headerBackground} 
            resizeMode="cover" 
          />

          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/images/logo.png')} 
              style={{ width: rs(60), height: rs(60), marginBottom: rs(10) }} 
              resizeMode="contain" 
            />
            <Reanimated.Text key={mode} entering={FadeIn} exiting={FadeOut} layout={LinearTransition.duration(350)} style={styles.welcomeText}>
              {mode === 'signUp' ? 'Create an account' 
               : mode === 'forgotPass' ? 'Forgot password' 
               : mode === 'verifyCode' ? 'Enter login code' 
               : mode === 'createProfile' ? 'Create Profile'
               : 'Welcome back'}
            </Reanimated.Text>
          </View>

          <View style={styles.formWrapper}>
            <View style={styles.formContainer}>
              
              {/* === NAME FIELD (Chỉ hiện khi Sign Up) === */}
              {mode === 'signUp' && (<View>
                  <Text style={styles.label}>Name</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={rs(20)} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Beebuddy"
                      placeholderTextColor="#9ca3af"
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                </View>)}

              {/* === EMAIL FIELD (Hiện trong signIn, signUp, forgotPass) === */}
              {(mode === 'signIn' || mode === 'signUp' || mode === 'forgotPass') && (<View>
                  <Reanimated.Text key={mode} entering={FadeIn} exiting={FadeOut} layout={LinearTransition.duration(350)} style={styles.label}>{mode === 'forgotPass' ? 'Email address' : 'Email'}</Reanimated.Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={rs(20)} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="hello@example.com"
                      placeholderTextColor="#9ca3af"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>)}

              {/* === OTP FIELDS (Chỉ hiện khi Verify Code) === */}
              {mode === 'verifyCode' && (<View style={styles.otpWrapper}>
                  <View style={styles.otpContainerRow}>
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => { otpInputs.current[index] = ref; }}
                        style={styles.otpInput}
                        maxLength={1}
                        keyboardType="number-pad"
                        placeholder="0"
                        placeholderTextColor="#9ca3af"
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        textAlign="center"
                      />
                    ))}
                  </View>
                  <Text style={styles.otpHelperText}>Enter the 6-digit code sent to your email or phone</Text>
                </View>
              )}

              {/* === PASSWORD FIELD (Chỉ hiện Sign In / Sign Up) === */}
              {(mode === 'signIn' || mode === 'signUp') && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.duration(350)}><View>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={rs(20)} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={showPassword ? "Enter your password" : "....................."}
                      placeholderTextColor="#9ca3af"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOpenIcon color="#9ca3af" /> : <EyeClosedIcon color="#9ca3af" />}
                    </TouchableOpacity>
                  </View>
                </View></Reanimated.View>)}

              {/* === CONFIRM PASSWORD (Chỉ hiện khi Sign Up) === */}
              {mode === 'signUp' && (<View>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={rs(20)} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={showPassword ? "Enter your password" : "....................."}
                      placeholderTextColor="#9ca3af"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOpenIcon color="#9ca3af" /> : <EyeClosedIcon color="#9ca3af" />}
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* === CREATE PROFILE FIELDS === */}
              {mode === 'createProfile' && (<View style={styles.createProfileContainer}>
                  <Text style={styles.createProfileTitle}>Let's build your buddy!</Text>
                  <Text style={styles.createProfileSubtitle}>Choose a look and name your cute avatar buddy.</Text>

                  <Text style={[styles.label, { marginTop: rs(20) }]}>Choose your avatar</Text>
                  
                  <View style={styles.avatarGrid}>
                    {[
                      { name: 'Buzzy', img: require('../../../assets/images/avatar_v3_Buzzy.png') },
                      { name: 'Honey', img: require('../../../assets/images/avatar_v3_Honey.png') },
                      { name: 'Sunny', img: require('../../../assets/images/avatar_v3_Sunny.png') },
                      { name: 'Beezy', img: require('../../../assets/images/avatar_v3_Beezy.png') },
                      { name: 'Clover', img: require('../../../assets/images/avatar_v3_Clover.png') },
                      { name: 'Nectar', img: require('../../../assets/images/avatar_v3_Nectar.png') },
                      { name: 'Pollen', img: require('../../../assets/images/avatar_v3_Pollen.png') },
                      { name: 'Sweetie', img: require('../../../assets/images/avatar_v3_Buzzy.png') } // Placeholder, not rendered
                    ].map((avatar, index) => (
                      <TouchableOpacity 
                        key={index} 
                        style={styles.avatarItem} 
                        onPress={() => setSelectedAvatar(index)}
                      >
                        <View style={[styles.avatarImageWrapper, selectedAvatar === index && styles.avatarSelected]}>
                          {index === 7 ? (
                            <View style={styles.avatarMore}>
                              <Text style={styles.avatarMoreText}>+ more</Text>
                            </View>
                          ) : (
                            <Image source={avatar.img} style={styles.avatarImage} />
                          )}
                        </View>
                        <Text style={[styles.avatarName, selectedAvatar === index && styles.avatarNameSelected]}>
                          {avatar.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.label}>Your Buddy's Name</Text>
                  <View style={styles.inputContainer}>
                    <View style={styles.smallCircleIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Beebuddy"
                      placeholderTextColor="#9ca3af"
                      value={buddyName}
                      onChangeText={setBuddyName}
                    />
                  </View>
                </View>
              )}

              {/* === OPTIONS (Chỉ hiện khi Sign In) === */}
              {mode === 'signIn' && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.duration(350)}><View style={styles.optionsContainer}>
                  <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
                    <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                      {rememberMe && <Ionicons name="checkmark" size={rs(12)} color="#ffffff" />}
                    </View>
                    <Text style={styles.rememberText}>Remember me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => changeMode('forgotPass')}>
                    <Text style={styles.forgotText}>Forgot password?</Text>
                  </TouchableOpacity>
                </View></Reanimated.View>)}

              {/* === NÚT CHÍNH === */}
              <Reanimated.View layout={LinearTransition.duration(350)}><TouchableOpacity style={styles.mainBtn} onPress={handleAction}>
                <Text style={styles.mainBtnText}>
                  {mode === 'signUp' ? 'Sign up ➝' 
                   : mode === 'forgotPass' ? 'Reset password' 
                   : mode === 'verifyCode' ? 'Verify Code' 
                   : mode === 'createProfile' ? 'Create Profile ➝'
                   : 'Sign in'}
                </Text>
              </TouchableOpacity></Reanimated.View>

              {/* === NÚT GUEST === */}
              {(mode === 'signUp' || mode === 'signIn' || mode === 'createProfile' || mode === 'forgotPass' || mode === 'verifyCode') && (<Reanimated.View layout={LinearTransition.duration(350)} entering={FadeIn} exiting={FadeOut}><TouchableOpacity style={styles.guestBtn} onPress={() => router.push('/(guest)/home')}>
                  <Image source={require('../../../assets/images/icon_guest.png')} style={{ width: rs(18), height: rs(18), marginRight: rs(10) }} resizeMode="contain" />
                  <Text style={styles.guestBtnText}>
                    {mode === 'signUp' ? 'Continue as guest' : 'Continues with guests'}
                  </Text>
                </TouchableOpacity></Reanimated.View>)}
              {/* === BACK TO LOGIN TEXT (Chỉ hiện khi Forgot Pass / Verify Code) === */}
              {(mode === 'forgotPass' || mode === 'verifyCode') && (<Reanimated.View layout={LinearTransition.duration(350)} entering={FadeIn} exiting={FadeOut}><TouchableOpacity style={styles.backToLoginContainer} onPress={() => changeMode('signIn')}>
                  <Text style={styles.backToLoginText}>
                    <Text style={{color: '#9ca3af'}}>Back to </Text>
                    <Text style={{color: '#ff7b00'}}>Login</Text>
                  </Text>
                </TouchableOpacity></Reanimated.View>)}
              {/* === CÁC NÚT MẠNG XÃ HỘI (Chỉ hiện signIn / signUp) === */}
              {(mode === 'signIn' || mode === 'signUp') && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.duration(350)}><>
                  <TouchableOpacity style={styles.googleBtn}>
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
                      style={{ width: rs(18), height: rs(18), marginRight: rs(10) }} 
                    />
                    <Text style={styles.googleBtnText}>Continue with Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.appleBtn}>
                    <Ionicons name="logo-apple" size={rs(20)} color="#ffffff" style={{ marginRight: rs(10) }} />
                    <Text style={styles.appleBtnText}>Continue with Apple</Text>
                  </TouchableOpacity>

                  {/* === FOOTER LINK CHUYỂN ĐỔI === */}
                  <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                      {mode === 'signUp' ? 'Already have an account? ' : "Don't have an account? "}
                    </Text>
                    <TouchableOpacity onPress={() => changeMode(mode === 'signUp' ? 'signIn' : 'signUp')}>
                      <Text style={styles.footerLinkText}>
                        {mode === 'signUp' ? 'Sign In' : 'Sign Up'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </></Reanimated.View>)}

            </View>
          </View>
        </ScrollView>

        {/* === FLOATING BEE AI WIDGET === */}
        <View style={[styles.beeAiWrapper, { bottom: rs(20) + insets.bottom }]} pointerEvents="box-none">
          {showBeeAI && (
            <Animated.View style={[styles.beeAiPopupContainer, { opacity: popupOpacityAnim }]}>
              
              {/* Selected Chip Bubble */}
              {selectedChip && (
                <Animated.View style={[styles.largeBubble, { opacity: bubbleAnim, transform: [{ translateY: bubbleTranslateY }] }]}>
                  {selectedChip === 'Contact' && (
                    <View>
                      <Text style={styles.largeBubbleText}><Text style={{fontWeight: 'bold'}}>General:</Text> hello.beebuddy@gmail.com</Text>
                      <Text style={[styles.largeBubbleText, {marginTop: rs(12)}]}><Text style={{fontWeight: 'bold'}}>Support:</Text> support.beebuddy@gmail.com</Text>
                    </View>
                  )}
                  {selectedChip === 'How to create' && (
                    <View>
                      <Text style={styles.largeBubbleText}><Text style={{fontWeight: 'bold'}}>1.</Text> Sign in with email and password</Text>
                      <Text style={[styles.largeBubbleText, {marginTop: rs(12)}]}><Text style={{fontWeight: 'bold'}}>2.</Text> Or continue with Google or Apple</Text>
                      <Text style={[styles.largeBubbleText, {marginTop: rs(12)}]}><Text style={{fontWeight: 'bold'}}>3.</Text> New user can tap Sign Up</Text>
                      <Text style={[styles.largeBubbleText, {marginTop: rs(12)}]}><Text style={{fontWeight: 'bold'}}>4.</Text> Guest mode has limited access</Text>
                    </View>
                  )}
                  {selectedChip === 'Beebuddy' && (
                    <Text style={[styles.largeBubbleText, {lineHeight: rs(22)}]}>
                      BeeBuddy is a friendship platform that helps users connect through shared interests, activities, location, learning, and work. It supports meaningful social discovery with AI Buddy, communities, and flexible privacy controls that let users manage connection levels and decide who can view, comment, and interact with each post
                    </Text>
                  )}
                </Animated.View>
              )}

              {/* Default Chips Row (only show if no chip is selected) */}
              {!selectedChip && (
                <Animated.View style={[styles.chipsRow, { opacity: inputAnim, transform: [{ translateY: inputTranslateY }] }]}>
                  <TouchableOpacity 
                    style={styles.chipBlack} 
                    onPress={() => handleChipPress('Contact')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.chipBlackText}>Contact</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.chipYellow} 
                    onPress={() => handleChipPress('How to create')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.chipYellowText}>How to create</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.chipBlack} 
                    onPress={() => handleChipPress('Beebuddy')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.chipBeebuddyText}>Beebuddy</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}

              {/* Input message */}
              <Animated.View style={[
                styles.popupInputContainer,
                selectedChip === 'Contact' || selectedChip === 'Beebuddy' ? { backgroundColor: '#ffbb00', borderColor: '#ffbb00' } :
                selectedChip === 'How to create' ? { backgroundColor: '#000000', borderColor: '#000000' } : {},
                { opacity: inputAnim, transform: [{ translateY: inputTranslateY }] }
              ]}>
                
                {/* Inner Chip if selected */}
                {selectedChip && (
                  <TouchableOpacity 
                    style={[
                      styles.innerChip,
                      selectedChip === 'How to create' ? { backgroundColor: '#ffbb00' } : { backgroundColor: '#000000' }
                    ]}
                    onPress={clearSelectedChip}
                  >
                    <Text style={[
                      styles.innerChipText,
                      selectedChip === 'How to create' ? { color: '#000000' } :
                      selectedChip === 'Beebuddy' ? { color: '#ffbb00' } : { color: '#ffffff' }
                    ]}>{selectedChip}  </Text>
                    <Text style={[
                      styles.innerChipX,
                      selectedChip === 'How to create' ? { color: '#000000' } : { color: '#ffbb00' }
                    ]}>x</Text>
                  </TouchableOpacity>
                )}

                <TextInput
                  style={[
                    styles.popupInput,
                    selectedChip === 'How to create' ? { color: '#ffffff' } : (selectedChip ? { color: '#000000' } : { color: '#111827' })
                  ]}
                  placeholder="Type a message..."
                  placeholderTextColor={selectedChip === 'How to create' ? "#9ca3af" : (selectedChip ? "#374151" : "#9ca3af")}
                  value={beeMessage}
                  onChangeText={setBeeMessage}
                  returnKeyType="send"
                  onSubmitEditing={handleSendBeeMessage}
                />
                {beeMessage.trim().length > 0 && (
                  <TouchableOpacity onPress={handleSendBeeMessage} style={styles.popupSendBtn}>
                    <Ionicons name="arrow-up-circle" size={rs(26)} color={selectedChip === 'How to create' ? "#ffffff" : (selectedChip ? "#000000" : "#ffbb00")} />
                  </TouchableOpacity>
                )}
              </Animated.View>
            </Animated.View>
          )}

          {/* Chú ong ở góc trái dưới - Nằm yên một chỗ */}
          <TouchableOpacity 
            style={styles.beeIconButton} 
            onPress={toggleBeeAI}
            activeOpacity={0.7}
            accessibilityLabel="Bee AI Assistant"
          >
            <Animated.View style={{ transform: [{ translateY: beeIdleAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }] }}>
              <Image 
                source={require('../../../assets/images/bee_icon.png')} 
                style={styles.beeIcon} 
                resizeMode="contain" 
              />
              <Animated.Image 
                source={require('../../../assets/images/thought_bubble.png')} 
                style={[styles.thoughtBubble, { opacity: beeIdleAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }) }]} 
                resizeMode="contain" 
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: rs(40) },
  headerBackground: { width: '100%', height: HEADER_HEIGHT, marginBottom: 0 },
  logoContainer: { alignItems: 'center', marginBottom: rs(15), marginTop: -40 },
  welcomeText: { fontSize: rs(28), fontWeight: 'bold', color: '#ffbb00' },
  formWrapper: { paddingHorizontal: rs(24) },
  formContainer: { backgroundColor: '#ffffff', borderRadius: rs(24) },
  label: { fontSize: rs(14), fontWeight: 'bold', color: '#374151', marginBottom: rs(6), marginLeft: rs(4) },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#f9fafb', borderRadius: rs(16), paddingHorizontal: rs(16), height: rs(52), marginBottom: rs(20) },
  inputIcon: { marginRight: rs(10) },
  input: { flex: 1, fontSize: rs(16), color: '#374151' },
  otpWrapper: { marginBottom: rs(20) },
  otpContainerRow: { flexDirection: 'row', justifyContent: 'center', gap: rs(8), marginBottom: rs(16) },
  otpInput: { width: rs(45), height: rs(52), borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#f9fafb', borderRadius: rs(12), fontSize: rs(20), color: '#374151', fontWeight: 'bold' },
  otpHelperText: { fontSize: rs(12), color: '#6b7280', textAlign: 'center' },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: rs(30), paddingHorizontal: rs(4) },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: rs(24), height: rs(24), borderWidth: 1, borderColor: '#ffbb00', borderRadius: rs(4), marginRight: rs(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  checkboxActive: { backgroundColor: '#ffbb00' },
  rememberText: { fontSize: rs(14), color: '#374151' },
  forgotText: { fontSize: rs(14), fontWeight: 'bold', color: '#ffbb00' },
  mainBtn: { backgroundColor: '#ffbb00', borderRadius: rs(16), height: rs(52), justifyContent: 'center', alignItems: 'center', marginBottom: rs(16), marginTop: rs(10), shadowColor: '#ffffff', shadowOffset: { width: 0, height: rs(4) }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  mainBtnText: { color: '#111827', fontSize: rs(16), fontWeight: 'bold' },
  guestBtn: { backgroundColor: '#000000', borderRadius: rs(16), height: rs(52), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: rs(16) },
  guestBtnText: { color: '#ffbb00', fontSize: rs(16), fontWeight: 'bold' },
  backToLoginContainer: { height: rs(52), justifyContent: 'center', alignItems: 'center', marginBottom: rs(16) },
  backToLoginText: { fontSize: rs(16), fontWeight: 'bold' },
  googleBtn: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: rs(16), height: rs(52), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: rs(16) },
  googleBtnText: { color: '#111827', fontSize: rs(16), fontWeight: 'bold' },
  appleBtn: { backgroundColor: '#000000', borderRadius: rs(16), height: rs(52), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: rs(30) },
  appleBtnText: { color: '#ffffff', fontSize: rs(16), fontWeight: 'bold' },
  footerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: rs(14), color: '#374151' },
  footerLinkText: { fontSize: rs(14), fontWeight: 'bold', color: '#ff7b00' },
  createProfileContainer: { marginTop: -10 },
  createProfileTitle: { fontSize: rs(16), fontWeight: 'bold', color: '#ff7b00', marginBottom: rs(4) },
  createProfileSubtitle: { fontSize: rs(13), color: '#6b7280', marginBottom: rs(10) },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: rs(20) },
  avatarItem: { width: '24%', alignItems: 'center', marginBottom: rs(16) },
  avatarImageWrapper: { width: rs(78), height: rs(78), borderRadius: rs(39), borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  avatarSelected: { borderWidth: 3, borderColor: '#ffbb00', backgroundColor: '#fef0c7' },
  avatarImage: { width: rs(90), height: rs(90) },
  avatarMore: { width: '100%', height: '100%', backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  avatarMoreText: { fontSize: rs(13), color: '#6b7280', fontWeight: '500' },
  avatarName: { fontSize: rs(12), color: '#6b7280', marginTop: rs(6), fontWeight: '500' },
  avatarNameSelected: { color: '#ff7b00', fontWeight: 'bold' },
  smallCircleIcon: { width: rs(10), height: rs(10), borderRadius: rs(5), backgroundColor: '#9ca3af', marginLeft: rs(4), marginRight: rs(10) },
  beeAiWrapper: { position: 'absolute', bottom: rs(20), left: rs(20), right: rs(20), justifyContent: 'flex-end' },
  beeAiPopupContainer: { marginBottom: rs(12) },
  largeBubble: { backgroundColor: '#ffffff', borderRadius: rs(24), padding: rs(24), marginBottom: rs(12), shadowColor: '#000000', shadowOffset: { width: 0, height: rs(4) }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  largeBubbleText: { fontSize: rs(14), color: '#374151' },
  chipsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: rs(12), gap: rs(8) },
  chipBlack: { backgroundColor: '#000000', borderRadius: rs(20), paddingVertical: rs(7), paddingHorizontal: rs(16), justifyContent: 'center', alignItems: 'center' },
  chipBlackText: { color: '#ffffff', fontSize: rs(13), fontWeight: 'bold' },
  chipYellow: { backgroundColor: '#ffbb00', borderRadius: rs(20), paddingVertical: rs(7), paddingHorizontal: rs(16), justifyContent: 'center', alignItems: 'center' },
  chipYellowText: { color: '#000000', fontSize: rs(13), fontWeight: 'bold' },
  chipBeebuddyText: { color: '#ffbb00', fontSize: rs(13), fontWeight: 'bold' },
  popupInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: rs(25), height: rs(48), paddingHorizontal: rs(18), borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000000', shadowOffset: { width: 0, height: rs(3) }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  innerChip: { flexDirection: 'row', borderRadius: rs(20), paddingVertical: rs(5), paddingHorizontal: rs(12), marginRight: rs(10), alignItems: 'center' },
  innerChipText: { fontSize: rs(13), fontWeight: 'bold' },
  innerChipX: { fontSize: rs(13), fontWeight: 'bold' },
  popupInput: { flex: 1, fontSize: rs(14), height: '100%' },
  popupSendBtn: { paddingLeft: rs(8) },
  beeIconButton: { alignSelf: 'flex-start', width: rs(48), height: rs(48) },
  beeIcon: { width: rs(48), height: rs(48) },
  thoughtBubble: { position: 'absolute', top: -10, right: -15, width: rs(26), height: rs(25) }
});















