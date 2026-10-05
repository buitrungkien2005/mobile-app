import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Make only LikeButton use 24 instead of 20
# We need to be careful to only target LikeButton
like_button_old = """const LikeButton = () => {
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
      <View style={{ width: rs(20), height: rs(20), justifyContent: 'center', alignItems: 'center' }}>
        {/* Unliked State */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Ionicons name="heart-outline" size={rs(20)} color="#6b7280" />
        </Animated.View>
        
        {/* Liked State (Gradient) */}
        <Animated.View style={{ position: 'absolute', opacity: fadeAnim, width: rs(20), height: rs(20) }}>
          <MaskedView
            maskElement={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="heart" size={rs(20)} color="#000" />
              </View>
            }
            style={{ width: rs(20), height: rs(20) }}
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

like_button_new = like_button_old.replace('rs(20)', 'rs(24)')

content = content.replace(like_button_old, like_button_new)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Increased Heart size to 24!')
