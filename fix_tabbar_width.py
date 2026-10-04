import re

for filepath in ['mobile-app/src/app/(tabs)/home.tsx', 'mobile-app/src/app/(tabs)/profile.tsx']:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Add width and imageStyle
    text = text.replace(
        "style={styles.tabbarContainer} resizeMode=\"stretch\"",
        "style={styles.tabbarContainer} imageStyle={{ resizeMode: 'stretch', width: width, height: TABBAR_HEIGHT }}"
    )
    
    # Replace width: '100%' with width: width in tabbarContainer
    text = text.replace(
        "width: '100%',\n      height: TABBAR_HEIGHT,",
        "width: width,\n      height: TABBAR_HEIGHT,"
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
