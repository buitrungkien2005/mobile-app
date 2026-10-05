import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { rs } from '../../utils/scaling';


const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

export default function LanguageScreen() {
  const router = useRouter();

  // Selected language state (though there's only one in UI right now)
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  return (
    <View style={styles.container}>
      {/* Background */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      {/* Header Overlay & Top Row */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={styles.overlay} 
          resizeMode="cover" 
        />
        <View style={styles.headerTop}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={rs(12)} color="#111827" style={{ marginTop: rs(12), marginRight: rs(6) }} />
            <Text style={styles.headerTitle}>Language</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../../assets/images/BrandLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          
          {/* Subtitle with Linear Gradient */}
          <MaskedView
            style={{ height: rs(28), marginBottom: rs(12), alignSelf: 'flex-start' }}
            maskElement={
              <Text style={styles.sectionTitle}>Language Preferences</Text>
            }
          >
            <LinearGradient
              colors={['#ffbb00', '#ff7b00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1, width: rs(250) }}
            />
          </MaskedView>

          {/* Language Option Card */}
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.row}
              onPress={() => setSelectedLanguage('English (US)')}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Image source={require('../../../assets/images/globe.png')} style={{ width: rs(24), height: rs(24) }} resizeMode="contain" />
                <Text style={styles.rowLabel}>English (US)</Text>
              </View>
              {/* Radio Button */}
              <Ionicons 
                name={selectedLanguage === 'English (US)' ? 'radio-button-on' : 'radio-button-off'} 
                size={rs(24)} 
                color="#ffbb00" 
              />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Floating AI Bee */}
      <AISup isGuest={false} />

      {/* TabBar */}
      <TabBarMenu activeTab="profile" />
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
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 40,
  },
  headerContainer: {
    height: OVERLAY_HEIGHT + 90,
    width: '100%',
    },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: OVERLAY_HEIGHT,
  },
  headerTop: {
    paddingTop: rs(85),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    
  },
  headerTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(36),
    color: '#000',
    marginTop: rs(15),
  },
  logo: {
    width: rs(35),
    height: rs(50),
  },
  contentContainer: {
    paddingHorizontal: rs(20),
    paddingTop: rs(10),
  },
  sectionTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(18),
    color: '#000',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rs(16),
    paddingHorizontal: rs(20),
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#111827',
    marginLeft: rs(16),
  },
});

