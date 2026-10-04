import re

with open('mobile-app/src/app/(tabs)/profile.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace floating bee
old_bee = """{/* ChA ong nh? gA3c d>i trAi (Floating Bee) */}
      <View style={styles.floatingBee} pointerEvents="none">
        <Image 
          source={require('../../../assets/images/ai_login.png')}
          style={styles.floatingBeeImg}
          resizeMode="contain"
        />
      </View>"""

new_bee = """{/* ChA ong nh? gA3c d>i trAi (Floating Bee) */}
      <View style={styles.floatingBee} pointerEvents="none">
        <Image
          source={require('../../../assets/images/bee_glow.png')}
          style={styles.floatingBeeImg}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/images/speech_bubble.png')}
          style={styles.speechBubbleImg}
          resizeMode="contain"
        />
      </View>"""
      
text = text.replace(old_bee, new_bee)

# If it didn't replace, maybe formatting is slightly different, let's use regex
if "speechBubbleImg" not in text:
    text = re.sub(r'\{/\* ChA ong.*?</View>', new_bee, text, flags=re.DOTALL)
    if "speechBubbleImg" not in text:
        text = re.sub(r'\{/\* Ch.*?</View>', new_bee, text, flags=re.DOTALL)

# Add speechBubbleImg to styles if not present
if "speechBubbleImg:" not in text:
    text = text.replace(
        "floatingBeeImg: {",
        "speechBubbleImg: { width: 32, height: 32, position: 'absolute', top: 0, right: 0 },\n    floatingBeeImg: {"
    )

    text = text.replace(
        "floatingBeeImg: {\n      width: 80,\n      height: 80,\n    },",
        "floatingBeeImg: {\n      width: 80,\n      height: 80,\n      position: 'absolute',\n      bottom: 0,\n      left: 0,\n    },"
    )

    text = text.replace(
        """floatingBee: {
      position: 'absolute',
      bottom: TABBAR_HEIGHT + 20,
      left: 20,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },""",
        """floatingBee: {
      position: 'absolute',
      bottom: TABBAR_HEIGHT + 20,
      left: 10,
      width: 100,
      height: 100,
    },"""
    )


with open('mobile-app/src/app/(tabs)/profile.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

