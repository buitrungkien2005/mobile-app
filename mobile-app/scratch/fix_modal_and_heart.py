import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update LikeButton to size 26
old_like = """  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }} onPress={toggleLike} activeOpacity={0.8}>
      <View style={{ width: rs(22), height: rs(22), justifyContent: 'center', alignItems: 'center' }}>
        {/* Unliked State */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Ionicons name="heart-outline" size={rs(22)} color="#6b7280" />
        </Animated.View>
        
        {/* Liked State (Gradient) */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim, width: rs(22), height: rs(22) }}>
          <MaskedView
            maskElement={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="heart" size={rs(22)} color="#000" />
              </View>
            }
            style={{ width: rs(22), height: rs(22) }}
          >"""

new_like = """  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }} onPress={toggleLike} activeOpacity={0.8}>
      <View style={{ width: rs(26), height: rs(26), justifyContent: 'center', alignItems: 'center' }}>
        {/* Unliked State */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Ionicons name="heart-outline" size={rs(26)} color="#6b7280" />
        </Animated.View>
        
        {/* Liked State (Gradient) */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim, width: rs(26), height: rs(26) }}>
          <MaskedView
            maskElement={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="heart" size={rs(26)} color="#000" />
              </View>
            }
            style={{ width: rs(26), height: rs(26) }}
          >"""

content = content.replace(old_like, new_like)

# 2. Add Modal before TabBarMenu
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

      {/* TabBar Coded UI */}"""

content = content.replace('{/* TabBar Coded UI */}', modal_code)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed Modal and Heart Size!')
