import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add SaveButton component
save_button = """const SaveButton = () => {
  const [saved, setSaved] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleSave = () => {
    const toValue = saved ? 0 : 1;
    setSaved(!saved);
    Animated.timing(fadeAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity onPress={toggleSave} activeOpacity={0.8} style={{ paddingLeft: rs(10) }}>
      <View style={{ width: rs(26), height: rs(26), justifyContent: 'center', alignItems: 'center' }}>
        {/* Unsaved State */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Ionicons name="bookmark-outline" size={rs(26)} color="#000" />
        </Animated.View>
        
        {/* Saved State (Gradient) */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim, width: rs(26), height: rs(26) }}>
          <MaskedView
            maskElement={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="bookmark" size={rs(26)} color="#000" />
              </View>
            }
            style={{ width: rs(26), height: rs(26) }}
          >
            <LinearGradient
              colors={['#ffbb00', '#ff7b00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};"""

if 'const SaveButton' not in content:
    content = content.replace('const FeedPostBadges', save_button + '\n\nconst FeedPostBadges')

# Replace existing bookmark icons with SaveButton
content = re.sub(r'<TouchableOpacity>\s*<Ionicons name="bookmark-outline" size=\{rs\(18\)\} color="#000" />\s*</TouchableOpacity>', '<SaveButton />', content)

# 2. Replace Modal JSX
old_modal_start = '{/* Invite Friends Modal */}'
old_modal_end = '{/* TabBar Coded UI */}'
# Find where the old modal is
modal_pattern = re.compile(r'\{\/\* Invite Friends Modal \*\/}.*?\{\/\* TabBar Coded UI \*\/}', re.DOTALL)

new_modal_jsx = """{/* Share Post Modal */}
      <Modal visible={isInviteModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={closeInviteModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.inviteModalCard, { transform: [{ scale: scaleValue }] }]}>
                <Text style={styles.inviteModalTitle}>Share Post</Text>
                
                {/* Share via WhatsApp */}
                <TouchableOpacity style={styles.shareOptionBtn}>
                  <Image source={require('../../../assets/images/whatapp.png')} style={styles.shareOptionIcon} />
                  <Text style={styles.shareOptionText}>Share via WhatsApp</Text>
                  <Ionicons name="chevron-forward" size={rs(20)} color="#d1d5db" />
                </TouchableOpacity>

                {/* Share via Email */}
                <TouchableOpacity style={styles.shareOptionBtn}>
                  <Image source={require('../../../assets/images/Email.png')} style={styles.shareOptionIcon} />
                  <Text style={styles.shareOptionText}>Share via Email</Text>
                  <Ionicons name="chevron-forward" size={rs(20)} color="#d1d5db" />
                </TouchableOpacity>

                {/* Share via Twitter */}
                <TouchableOpacity style={styles.shareOptionBtn}>
                  <Image source={require('../../../assets/images/Twitter.png')} style={styles.shareOptionIcon} />
                  <Text style={styles.shareOptionText}>Share via Twitter</Text>
                  <Ionicons name="chevron-forward" size={rs(20)} color="#d1d5db" />
                </TouchableOpacity>

                {/* Social Icons Row */}
                <View style={styles.socialIconsRow}>
                  <Image source={require('../../../assets/images/Facebook.png')} style={styles.socialIconLarge} />
                  <Image source={require('../../../assets/images/Instagram.png')} style={[styles.socialIconLarge, { width: rs(42), height: rs(42) }]} />
                  <Image source={require('../../../assets/images/Tiktok.png')} style={styles.socialIconLarge} />
                  <Ionicons name="chevron-forward" size={rs(20)} color="#d1d5db" style={{ marginLeft: rs(5) }} />
                </View>

                <View style={styles.modalDivider} />

                <Text style={styles.orShareText}>OR SHARE VIA LINK</Text>

                <View style={styles.linkRow}>
                  <View style={styles.linkInputBox}>
                    <Ionicons name="link-outline" size={rs(20)} color="#6b7280" />
                    <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="tail">
                      https://invite.link/abc...
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.copyBtnContainer}>
                    <LinearGradient
                      colors={['#ffbb00', '#ff7b00']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.copyBtnGradient}
                    >
                      <Text style={styles.copyBtnText}>copy</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* TabBar Coded UI */}"""

content = modal_pattern.sub(new_modal_jsx, content)

# 3. Replace Modal Styles
# We need to replace everything from `modalOverlay:` to the end of file (except `});`)
styles_pattern = re.compile(r'modalOverlay: \{.*?\}\);', re.DOTALL)

new_styles = """modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteModalCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: rs(24),
    padding: rs(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inviteModalTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(40),
    color: '#111827',
    textAlign: 'center',
    marginBottom: rs(10),
  },
  shareOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(30),
    paddingVertical: rs(12),
    paddingHorizontal: rs(16),
    marginBottom: rs(12),
    width: '100%',
  },
  shareOptionIcon: {
    width: rs(32),
    height: rs(32),
    marginRight: rs(8),
  },
  shareOptionText: {
    flex: 1,
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#111827',
  },
  socialIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: rs(10),
    paddingRight: rs(10),
    width: '100%',
  },
  socialIconLarge: {
    width: rs(36),
    height: rs(36),
    marginHorizontal: rs(8),
  },
  modalDivider: {
    height: rs(1),
    backgroundColor: '#e5e7eb',
    marginVertical: rs(20),
    width: '100%',
  },
  orShareText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(12),
    color: '#6b7280',
    marginBottom: rs(10),
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  linkInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: rs(20),
    paddingVertical: rs(12),
    paddingHorizontal: rs(16),
    marginRight: rs(10),
  },
  linkText: {
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(14),
    color: '#6b7280',
    marginLeft: rs(8),
    flex: 1,
  },
  copyBtnContainer: {
    borderRadius: rs(20),
    overflow: 'hidden',
  },
  copyBtnGradient: {
    paddingVertical: rs(12),
    paddingHorizontal: rs(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyBtnText: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(24),
    color: '#fff',
    lineHeight: rs(24),
  },
});"""

content = styles_pattern.sub(new_styles, content)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated Modal and SaveButton!')
