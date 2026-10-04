import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Revert font sizes
text = text.replace("mainBtnText: { color: '#111827', fontSize: 18, fontWeight: 'bold' }", "mainBtnText: { color: '#111827', fontSize: 16, fontWeight: 'bold' }")
text = text.replace("guestBtnText: { color: '#ffbb00', fontSize: 18, fontWeight: 'bold' }", "guestBtnText: { color: '#ffbb00', fontSize: 16, fontWeight: 'bold' }")
text = text.replace("googleBtnText: { color: '#111827', fontSize: 18, fontWeight: 'bold' }", "googleBtnText: { color: '#111827', fontSize: 16, fontWeight: 'bold' }")
text = text.replace("appleBtnText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }", "appleBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }")

# Revert Guest icon size
text = text.replace(
    "<Image source={require('../../../assets/images/icon_guest.png')} style={{ width: 24, height: 24, marginRight: 10 }} resizeMode=\"contain\" />",
    "<Image source={require('../../../assets/images/icon_guest.png')} style={{ width: 18, height: 18, marginRight: 10 }} resizeMode=\"contain\" />"
)

# Revert Google icon size
text = text.replace(
    "style={{ width: 24, height: 24, marginRight: 10 }}",
    "style={{ width: 18, height: 18, marginRight: 10 }}"
)

# Revert Apple icon size
text = text.replace(
    "<Ionicons name=\"logo-apple\" size={26} color=\"#ffffff\" style={{ marginRight: 10 }} />",
    "<Ionicons name=\"logo-apple\" size={20} color=\"#ffffff\" style={{ marginRight: 10 }} />"
)

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

