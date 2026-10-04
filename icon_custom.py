import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace Ionicons with our custom images!
text = text.replace(
    "<Ionicons name={showPassword ? \"eye-outline\" : \"eye-off-outline\"} size={20} color=\"#9ca3af\" />",
    "<Image source={showPassword ? require('../../../assets/images/eye_open_custom.png') : require('../../../assets/images/eye_closed_custom.png')} style={{ width: 20, height: 20 }} resizeMode=\"contain\" />"
)

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
