import re

with open('mobile-app/src/app/(tabs)/home.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Home icon size
text = text.replace(
    "source={require('../../../assets/images/TabItem-Home.png')} style={{ width: 28, height: 28 }}",
    "source={require('../../../assets/images/TabItem-Home.png')} style={{ width: 36, height: 36 }}"
)

# 2. Update Discover icon size
text = text.replace(
    "source={require('../../../assets/images/TabItem-Discover.png')} style={{ width: 28, height: 28 }}",
    "source={require('../../../assets/images/TabItem-Discover.png')} style={{ width: 44, height: 34 }}"
)

# 3. Update Messages icon size
text = text.replace(
    "source={require('../../../assets/images/TabItem-Messages.png')} style={{ width: 28, height: 28 }}",
    "source={require('../../../assets/images/TabItem-Messages.png')} style={{ width: 44, height: 34 }}"
)

# 4. Update Profile icon size
text = text.replace(
    "source={require('../../../assets/images/TabItem-Profile.png')} style={{ width: 32, height: 32, borderRadius: 16 }}",
    "source={require('../../../assets/images/TabItem-Profile.png')} style={{ width: 44, height: 44 }}"
)

with open('mobile-app/src/app/(tabs)/home.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
