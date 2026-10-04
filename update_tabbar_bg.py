import re

for filepath in ['mobile-app/src/app/(tabs)/home.tsx', 'mobile-app/src/app/(tabs)/profile.tsx']:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    text = text.replace(
        "source={require('../../../assets/images/Background_tabar.png')} style={styles.tabbarContainer} resizeMode=\"cover\"",
        "source={require('../../../assets/images/Background_tabar.png')} style={styles.tabbarContainer} resizeMode=\"stretch\""
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
