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

export default function ExplorerCheckoutScreen() {
  const router = useRouter();

  // State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardholderName, setCardholderName] = useState('Alex Morgan');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiryDate, setExpiryDate] = useState('12 / 26');
  const [securityCode, setSecurityCode] = useState('•••');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const handlePayAndUpgrade = () => {
    setSuccessModalVisible(true);
  };

  const handleSuccessClose = () => {
    setSuccessModalVisible(false);
    router.replace('/(tabs)/create-community');
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
            onPress={() => router.back()} 
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={rs(22)} color="#1e1810" />
          </TouchableOpacity>

          {/* Screen Title */}
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>
      </View>

      {/* SCROLLABLE CHECKOUT CONTENT */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: Explorer Tier Card */}
        <View style={styles.explorerCard}>
          {/* Top Title & Price Row */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleWrap}>
              <View style={styles.explorerIconCircle}>
                <Image 
                  source={require('../../../assets/images/explorer_logo.png')} 
                  style={styles.explorerLogo} 
                  resizeMode="contain" 
                />
              </View>
              <View>
                <Text style={styles.explorerCardTitle}>Explorer</Text>
                <Text style={styles.explorerCardSubtitle}>Monthly membership</Text>
              </View>
            </View>

            <View style={styles.priceWrap}>
              <Text style={styles.priceValue}>$4.99</Text>
              <Text style={styles.pricePeriod}>USD / month</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.cardDivider} />

          {/* 3 Bullet Features */}
          <View style={styles.featuresList}>
            {/* Feature 1 */}
            <View style={styles.featureItemRow}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={rs(13)} color="#b45309" />
              </View>
              <Text style={styles.featureText}>
                Run up to 2 active communities with custom tags
              </Text>
            </View>

            {/* Feature 2 */}
            <View style={styles.featureItemRow}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={rs(13)} color="#b45309" />
              </View>
              <Text style={styles.featureText}>
                Advanced buddy matchmaking filters
              </Text>
            </View>

            {/* Feature 3 */}
            <View style={styles.featureItemRow}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={rs(13)} color="#b45309" />
              </View>
              <Text style={styles.featureText}>
                Exclusive private circles & networks
              </Text>
            </View>
          </View>

          {/* Card Note */}
          <Text style={styles.cardNote}>
            Illustrative pricing for this checkout preview.
          </Text>
        </View>

        {/* SECTION 2: Payment Method */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment method</Text>
        </View>

        <View style={styles.paymentMethodsRow}>
          {/* Credit Card Option */}
          <TouchableOpacity 
            style={[
              styles.paymentOptionCard,
              paymentMethod === 'card' && styles.paymentOptionCardActive
            ]}
            onPress={() => setPaymentMethod('card')}
            activeOpacity={0.8}
          >
            <View style={styles.pmLeft}>
              <Ionicons 
                name="card-outline" 
                size={rs(18)} 
                color={paymentMethod === 'card' ? '#ff9500' : '#6b7280'} 
              />
              <Text style={[
                styles.pmText,
                paymentMethod === 'card' && styles.pmTextActive
              ]}>
                Credit card
              </Text>
            </View>
            <View style={[
              styles.radioCircle,
              paymentMethod === 'card' && styles.radioCircleActive
            ]}>
              {paymentMethod === 'card' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          {/* PayPal Option */}
          <TouchableOpacity 
            style={[
              styles.paymentOptionCard,
              paymentMethod === 'paypal' && styles.paymentOptionCardActive
            ]}
            onPress={() => setPaymentMethod('paypal')}
            activeOpacity={0.8}
          >
            <View style={styles.pmLeft}>
              <Ionicons 
                name="logo-paypal" 
                size={rs(18)} 
                color={paymentMethod === 'paypal' ? '#003087' : '#6b7280'} 
              />
              <Text style={[
                styles.pmText,
                paymentMethod === 'paypal' && styles.pmTextActive
              ]}>
                PayPal
              </Text>
            </View>
            <View style={[
              styles.radioCircle,
              paymentMethod === 'paypal' && styles.radioCircleActive
            ]}>
              {paymentMethod === 'paypal' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* SECTION 3: Card Details Form */}
        <View style={styles.cardDetailsBox}>
          {/* Header Row: Title & Card Brand Badges */}
          <View style={styles.cardDetailsHeader}>
            <Text style={styles.cardDetailsTitle}>Card details</Text>
            
            <View style={styles.cardBadgesRow}>
              {/* VISA Badge */}
              <View style={styles.visaBadge}>
                <Text style={styles.visaText}>VISA</Text>
              </View>

              {/* Mastercard Badge */}
              <View style={styles.mastercardBadge}>
                <View style={[styles.mcCircle, { backgroundColor: '#eb001b' }]} />
                <View style={[styles.mcCircle, { backgroundColor: '#f79e1b', marginLeft: -rs(6) }]} />
              </View>
            </View>
          </View>

          {/* Field 1: Cardholder Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cardholder name</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.textInput}
                value={cardholderName}
                onChangeText={setCardholderName}
                placeholder="Alex Morgan"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Field 2: Card Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card number</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={[styles.textInput, { flex: 1 }]}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                placeholder="4242 4242 4242 4242"
                placeholderTextColor="#9ca3af"
              />
              <Ionicons name="card" size={rs(18)} color="#9ca3af" style={styles.inputIconRight} />
            </View>
          </View>

          {/* Row: Expiry Date & Security Code */}
          <View style={styles.twoColsRow}>
            {/* Col 1: Expiry date */}
            <View style={[styles.inputGroup, { flex: 1, marginRight: rs(10) }]}>
              <Text style={styles.inputLabel}>Expiry date</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.textInput}
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  placeholder="12 / 26"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* Col 2: Security code */}
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Security code</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={[styles.textInput, { flex: 1 }]}
                  value={securityCode}
                  onChangeText={setSecurityCode}
                  placeholder="•••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
                <Ionicons name="lock-closed-outline" size={rs(16)} color="#9ca3af" style={styles.inputIconRight} />
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 4: Order Summary */}
        <View style={styles.summaryBox}>
          {/* Row 1: Explorer monthly */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Explorer monthly</Text>
            <Text style={styles.summaryValue}>$4.99</Text>
          </View>

          {/* Row 2: Tax (illustrative) */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabelSub}>Tax (illustrative)</Text>
            <Text style={styles.summaryValueSub}>$0.00</Text>
          </View>

          {/* Divider */}
          <View style={styles.summaryDivider} />

          {/* Row 3: Total today */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total today</Text>
            <Text style={styles.totalValue}>$4.99 USD</Text>
          </View>
        </View>

        {/* SECTION 5: Pay & Upgrade CTA Button */}
        <TouchableOpacity 
          style={styles.payBtnWrapper}
          onPress={handlePayAndUpgrade}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#fec500', '#f0a300']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.payBtn}
          >
            <Text style={styles.payBtnText}>Pay $4.99 & Upgrade</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Subscription Renewal Info */}
        <Text style={styles.renewNote}>
          Renews monthly at $4.99. Cancel anytime.
        </Text>

        {/* Terms and Privacy policy */}
        <Text style={styles.termsNote}>
          By paying, you agree to the <Text style={styles.termsBold}>Terms</Text> & <Text style={styles.termsBold}>Privacy Policy</Text>.
        </Text>

        {/* Security Trust Badge */}
        <View style={styles.trustBadgeRow}>
          <Ionicons name="shield-checkmark" size={rs(13)} color="#6b7280" style={{ marginRight: rs(4) }} />
          <Text style={styles.trustBadgeText}>
            Secure 256-bit encrypted checkout
          </Text>
        </View>

        {/* Bottom padding for TabBar and Floating Mascot */}
        <View style={{ height: TABBAR_HEIGHT + rs(65) }} />
      </ScrollView>

      {/* FLOATING AISUP MASCOT */}
      <AISup />

      {/* TABBAR MENU */}
      <TabBarMenu activeTab="discover" />

      {/* UPGRADE SUCCESS MODAL */}
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
                <Text style={styles.successModalTitle}>Upgrade Successful!</Text>
                <Text style={styles.successModalDesc}>
                  You are now an Explorer member. Enjoy running your communities and using advanced matchmaking!
                </Text>
                <TouchableOpacity
                  style={styles.successModalBtn}
                  onPress={handleSuccessClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.successModalBtnText}>Continue</Text>
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

  /* SECTION 1: Explorer Tier Card */
  explorerCard: {
    backgroundColor: '#fffdfa',
    borderRadius: rs(20),
    borderWidth: 1.2,
    borderColor: '#fef3c7',
    padding: rs(16),
    marginBottom: rs(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  explorerIconCircle: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  explorerLogo: {
    width: rs(18),
    height: rs(24),
  },
  explorerCardTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17),
    color: '#111827',
  },
  explorerCardSubtitle: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    marginTop: rs(1),
  },
  priceWrap: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(20),
    color: '#111827',
  },
  pricePeriod: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(11),
    color: '#9ca3af',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#fef3c7',
    marginVertical: rs(12),
  },
  featuresList: {
    gap: rs(8),
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: rs(18),
    height: rs(18),
    borderRadius: rs(9),
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(10),
  },
  featureText: {
    flex: 1,
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#374151',
    lineHeight: rs(17),
  },
  cardNote: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(11),
    fontStyle: 'italic',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: rs(12),
  },

  /* SECTION 2: Payment Method */
  sectionHeader: {
    marginBottom: rs(8),
  },
  sectionTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#111827',
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    gap: rs(10),
    marginBottom: rs(14),
  },
  paymentOptionCard: {
    flex: 1,
    height: rs(48),
    backgroundColor: '#ffffff',
    borderRadius: rs(14),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(14),
  },
  paymentOptionCardActive: {
    borderColor: '#ffaa00',
    borderWidth: 1.5,
    backgroundColor: '#fffefc',
  },
  pmLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
  },
  pmText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13.5),
    color: '#4b5563',
  },
  pmTextActive: {
    fontFamily: 'AfacadFlux_700Bold',
    color: '#111827',
  },
  radioCircle: {
    width: rs(18),
    height: rs(18),
    borderRadius: rs(9),
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleActive: {
    borderColor: '#ffaa00',
  },
  radioDot: {
    width: rs(9),
    height: rs(9),
    borderRadius: rs(4.5),
    backgroundColor: '#ffaa00',
  },

  /* SECTION 3: Card Details Form */
  cardDetailsBox: {
    backgroundColor: '#ffffff',
    borderRadius: rs(20),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    padding: rs(16),
    marginBottom: rs(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(1) },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(12),
  },
  cardDetailsTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14.5),
    color: '#111827',
  },
  cardBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(6),
  },
  visaBadge: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(4),
    paddingHorizontal: rs(6),
    paddingVertical: rs(2),
  },
  visaText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(10.5),
    color: '#1a1f71',
    fontWeight: '800',
    fontStyle: 'italic',
  },
  mastercardBadge: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(4),
    paddingHorizontal: rs(6),
    paddingVertical: rs(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  mcCircle: {
    width: rs(9),
    height: rs(9),
    borderRadius: rs(4.5),
  },
  inputGroup: {
    marginBottom: rs(10),
  },
  inputLabel: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(12),
    color: '#4b5563',
    marginBottom: rs(4),
  },
  inputWrapper: {
    height: rs(42),
    borderRadius: rs(12),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(12),
  },
  textInput: {
    flex: 1,
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13.5),
    color: '#111827',
    height: '100%',
  },
  inputIconRight: {
    marginLeft: rs(6),
  },
  twoColsRow: {
    flexDirection: 'row',
  },

  /* SECTION 4: Order Summary */
  summaryBox: {
    backgroundColor: '#ffffff',
    borderRadius: rs(18),
    borderWidth: 1.2,
    borderColor: '#f1f5f9',
    padding: rs(16),
    marginBottom: rs(16),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(6),
  },
  summaryLabel: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13.5),
    color: '#4b5563',
  },
  summaryValue: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
    color: '#111827',
  },
  summaryLabelSub: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12.5),
    color: '#9ca3af',
  },
  summaryValueSub: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(13),
    color: '#4b5563',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: rs(8),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15),
    color: '#111827',
  },
  totalValue: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(17),
    color: '#111827',
  },

  /* SECTION 5: CTA & Footer */
  payBtnWrapper: {
    width: '100%',
  },
  payBtn: {
    height: rs(46),
    borderRadius: rs(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(15.5),
    color: '#ffffff',
  },
  renewNote: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(12),
    color: '#6b7280',
    textAlign: 'center',
    marginTop: rs(8),
  },
  termsNote: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(11.5),
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: rs(4),
  },
  termsBold: {
    fontFamily: 'AfacadFlux_700Bold',
    color: '#4b5563',
    textDecorationLine: 'underline',
  },
  trustBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(10),
  },
  trustBadgeText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(11),
    color: '#6b7280',
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
