import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Import Modal and TouchableWithoutFeedback if missing
if 'TouchableWithoutFeedback' not in content:
    content = content.replace("import { Animated, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, Platform, SafeAreaView, UIManager, LayoutAnimation }", 
                              "import { Animated, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, Platform, SafeAreaView, UIManager, LayoutAnimation, Modal, TouchableWithoutFeedback }")

# 2. Add state and functions inside HomeScreen
state_add = """  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['For You', 'Public', 'Favorites']);
  
  // Modal state
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const openInviteModal = () => {
    setInviteModalVisible(true);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 15,
      speed: 14,
    }).start();
  };

  const closeInviteModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setInviteModalVisible(false));
  };
"""

content = re.sub(r'  const \[isSearchActive, setIsSearchActive\] = useState\(false\);\n  const \[activeFilters, setActiveFilters\] = useState<string\[\]>\(\[\'For You\', \'Public\', \'Favorites\'\]\);', state_add, content)

# 3. Add Modal component at the end of the return statement, before </View>
modal_code = """
      {/* Invite Friends Modal */}
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

                <View style={styles.copyLinkContainer}>
                  <Ionicons name="link" size={rs(20)} color="#ffb703" style={{ marginRight: rs(8) }} />
                  <Text style={styles.copyLinkText} numberOfLines={1} ellipsizeMode="tail">
                    https://beebuddy.app/p/a1b2c3d4
                  </Text>
                  <TouchableOpacity style={styles.copyBtn}>
                    <Text style={styles.copyBtnText}>Copy</Text>
                  </TouchableOpacity>
                </View>

              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
"""

content = re.sub(r'      <AISup />\n    </View>\n  \);\n}', '      <AISup />' + modal_code, content)

# 4. Add missing styles
styles_code = """
  modalOverlay: {
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
    alignItems: 'center',
  },
  inviteModalTitle: {
    fontSize: rs(20),
    fontWeight: 'bold',
    marginBottom: rs(20),
  },
  shareOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: rs(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  shareOptionIcon: {
    width: rs(24),
    height: rs(24),
    resizeMode: 'contain',
    marginRight: rs(12),
  },
  shareOptionText: {
    flex: 1,
    fontSize: rs(16),
    color: '#374151',
  },
  socialIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: rs(20),
    marginBottom: rs(20),
  },
  socialIconLarge: {
    width: rs(40),
    height: rs(40),
    resizeMode: 'contain',
  },
  modalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: rs(16),
  },
  orShareText: {
    fontSize: rs(12),
    color: '#9ca3af',
    fontWeight: 'bold',
    marginBottom: rs(16),
  },
  copyLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbf0',
    borderRadius: rs(12),
    paddingHorizontal: rs(12),
    paddingVertical: rs(10),
    borderWidth: 1,
    borderColor: '#fef3c7',
    width: '100%',
  },
  copyLinkText: {
    flex: 1,
    fontSize: rs(14),
    color: '#ffb703',
  },
  copyBtn: {
    backgroundColor: '#ffb703',
    paddingHorizontal: rs(12),
    paddingVertical: rs(6),
    borderRadius: rs(16),
    marginLeft: rs(8),
  },
  copyBtnText: {
    fontSize: rs(12),
    fontWeight: 'bold',
    color: '#000',
  },
});
"""

content = content.replace('\n});\n', styles_code)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Added modal and fixed styles!')
