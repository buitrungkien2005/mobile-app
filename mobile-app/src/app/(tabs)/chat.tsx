import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { rs } from '../../utils/scaling';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 55;

const MOCK_DB: Record<string, any> = {
  '1': {
    name: 'Priya Sharma',
    firstName: 'Priya',
    avatar: require('../../../assets/images/Avatar_MinhTran.png'), // bee with headphones
  },
  '2': {
    name: 'Jake Miller',
    firstName: 'Jake',
    avatar: require('../../../assets/images/Avatar_SoraPark.png'), // bee without headphones
  }
};

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const userData = MOCK_DB[id as string] || MOCK_DB['1'];

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(65) }]}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} 
          resizeMode="cover" 
        />
        <View style={[styles.headerTop, { paddingTop: rs(65), position: 'relative' }]}>
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
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Hexagon pattern can be added as background image if needed, keeping it clean for now */}
          
          <View style={styles.emptyStateContainer}>
            <Image source={userData.avatar} style={styles.largeAvatar} />
            <Text style={styles.emptyStateName}>{userData.name}</Text>
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
            <Ionicons name="add" size={rs(24)} color="#111827" />
          </TouchableOpacity>
          
          <View style={styles.textInputWrapper}>
            <TextInput 
              style={styles.textInput}
              placeholder="Buzz a message..."
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Ionicons name="happy-outline" size={rs(20)} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="arrow-up" size={rs(20)} color="#111827" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <AISup isGuest={false} />
      <TabBarMenu activeTab="messages" />
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
});
