import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

like_button_old = """const LikeButton = ({ initialCount }: { initialCount: number }) => {
  const [liked, setLiked] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleLike = () => {
    const toValue = liked ? 0 : 1;
    setLiked(!liked);
    Animated.timing(fadeAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }} onPress={toggleLike} activeOpacity={0.8}>
      <View style={{ width: rs(18), height: rs(18), justifyContent: 'center', alignItems: 'center' }}>
        {/* Unliked State */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Ionicons name="heart-outline" size={rs(18)} color="#6b7280" />
        </Animated.View>
        
        {/* Liked State (Gradient) */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim, width: rs(18), height: rs(18) }}>
          <MaskedView
            maskElement={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="heart" size={rs(18)} color="#000" />
              </View>
            }
            style={{ width: rs(18), height: rs(18) }}
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
      <Text style={{ fontFamily: 'AfacadFlux_400Regular', fontSize: rs(12), color: '#6b7280', marginLeft: rs(4) }}>
        {liked ? initialCount + 1 : initialCount}
      </Text>
    </TouchableOpacity>
  );
};"""

like_button_new = """const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleLike = () => {
    const toValue = liked ? 0 : 1;
    setLiked(!liked);
    Animated.timing(fadeAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
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

content = content.replace(like_button_old, like_button_new)

# Now remove the initialCount usages from home.tsx
content = re.sub(r'<LikeButton initialCount=\{\d+\} />', '<LikeButton />', content)

# Now update the chat and share icons!
old_chat_1 = """                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }}>
                  <Ionicons name="chatbubble-outline" size={rs(18)} color="#6b7280" />
                  <Text style={{ fontFamily: 'AfacadFlux_400Regular', fontSize: rs(12), color: '#6b7280', marginLeft: rs(4) }}>24</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="paper-plane-outline" size={rs(18)} color="#6b7280" />
                </TouchableOpacity>"""

new_chat_1 = """                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }}>
                  <Ionicons name="chatbubble-outline" size={rs(22)} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openInviteModal}>
                  <Ionicons name="paper-plane-outline" size={rs(22)} color="#6b7280" />
                </TouchableOpacity>"""

old_chat_2 = """                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }}>
                  <Ionicons name="chatbubble-outline" size={rs(18)} color="#6b7280" />
                  <Text style={{ fontFamily: 'AfacadFlux_400Regular', fontSize: rs(12), color: '#6b7280', marginLeft: rs(4) }}>16</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="paper-plane-outline" size={rs(18)} color="#6b7280" />
                </TouchableOpacity>"""

old_chat_3 = """                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }}>
                  <Ionicons name="chatbubble-outline" size={rs(18)} color="#6b7280" />
                  <Text style={{ fontFamily: 'AfacadFlux_400Regular', fontSize: rs(12), color: '#6b7280', marginLeft: rs(4) }}>89</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="paper-plane-outline" size={rs(18)} color="#6b7280" />
                </TouchableOpacity>"""

content = content.replace(old_chat_1, new_chat_1)
content = content.replace(old_chat_2, new_chat_1)
content = content.replace(old_chat_3, new_chat_1)

# Also fix the paper-plane in Post 3 (if it was original)
old_chat_post3 = """                <TouchableOpacity><Ionicons name="chatbubble-outline" size={rs(18)} color="#000" style={styles.actionIcon} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="paper-plane-outline" size={rs(18)} color="#000" /></TouchableOpacity>"""
new_chat_post3 = """                <TouchableOpacity style={{ marginRight: rs(10) }}><Ionicons name="chatbubble-outline" size={rs(22)} color="#6b7280" /></TouchableOpacity>
                <TouchableOpacity onPress={openInviteModal}><Ionicons name="paper-plane-outline" size={rs(22)} color="#6b7280" /></TouchableOpacity>"""
content = content.replace(old_chat_post3, new_chat_post3)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated buttons!')
