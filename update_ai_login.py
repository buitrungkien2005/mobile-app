import re

for filepath in ['mobile-app/src/app/(tabs)/home.tsx', 'mobile-app/src/app/(tabs)/profile.tsx']:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Replace the split images with the single image
    old_bee = """<Image
          source={require('../../../assets/images/bee_glow.png')}
          style={styles.floatingBeeImg}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/images/speech_bubble.png')}
          style={styles.speechBubbleImg}
          resizeMode="contain"
        />"""
        
    new_bee = """<Image
          source={require('../../../assets/images/AI_Login_Merged.png')}
          style={styles.floatingBeeImg}
          resizeMode="contain"
        />"""

    text = text.replace(old_bee, new_bee)

    # Update styles
    text = re.sub(
        r'speechBubbleImg:\s*\{.*?\},',
        '',
        text,
        flags=re.DOTALL
    )

    text = re.sub(
        r'floatingBeeImg:\s*\{.*?\},',
        "floatingBeeImg: {\n    width: 96,\n    height: 88,\n  },",
        text,
        flags=re.DOTALL
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)

