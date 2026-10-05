import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
content = content.replace("import React, { useState } from 'react';", "import React, { useState, useRef } from 'react';")
content = content.replace("import { View, Text", "import { Animated, View, Text")

if 'MaskedView' not in content:
    content = content.replace("import { Ionicons } from '@expo/vector-icons';", 
                              "import { Ionicons } from '@expo/vector-icons';\nimport MaskedView from '@react-native-masked-view/masked-view';\nimport { LinearGradient } from 'expo-linear-gradient';")

like_button = """const LikeButton = ({ initialCount }: { initialCount: number }) => {
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
};
"""

if 'const LikeButton' not in content:
    content = content.replace('const FeedPostBadges', like_button + '\nconst FeedPostBadges')

old_actions = """              <View style={styles.leftActionsGroup}>
                <TouchableOpacity><Ionicons name="heart-outline" size={rs(18)} color="#000" style={styles.actionIcon} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="chatbubble-outline" size={rs(18)} color="#000" style={styles.actionIcon} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="paper-plane-outline" size={rs(18)} color="#000" /></TouchableOpacity>
              </View>"""

new_actions_1 = """              <View style={styles.leftActionsGroup}>
                <LikeButton initialCount={124} />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }}>
                  <Ionicons name="chatbubble-outline" size={rs(18)} color="#6b7280" />
                  <Text style={{ fontFamily: 'AfacadFlux_400Regular', fontSize: rs(12), color: '#6b7280', marginLeft: rs(4) }}>24</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="paper-plane-outline" size={rs(18)} color="#6b7280" />
                </TouchableOpacity>
              </View>"""

new_actions_2 = """              <View style={styles.leftActionsGroup}>
                <LikeButton initialCount={95} />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }}>
                  <Ionicons name="chatbubble-outline" size={rs(18)} color="#6b7280" />
                  <Text style={{ fontFamily: 'AfacadFlux_400Regular', fontSize: rs(12), color: '#6b7280', marginLeft: rs(4) }}>16</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="paper-plane-outline" size={rs(18)} color="#6b7280" />
                </TouchableOpacity>
              </View>"""
              
new_actions_3 = """              <View style={styles.leftActionsGroup}>
                <LikeButton initialCount={342} />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: rs(10) }}>
                  <Ionicons name="chatbubble-outline" size={rs(18)} color="#6b7280" />
                  <Text style={{ fontFamily: 'AfacadFlux_400Regular', fontSize: rs(12), color: '#6b7280', marginLeft: rs(4) }}>89</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="paper-plane-outline" size={rs(18)} color="#6b7280" />
                </TouchableOpacity>
              </View>"""

content = content.replace(old_actions, new_actions_1, 1)
content = content.replace(old_actions, new_actions_2, 1)
content = content.replace(old_actions, new_actions_3, 1)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Replaced actions!')
