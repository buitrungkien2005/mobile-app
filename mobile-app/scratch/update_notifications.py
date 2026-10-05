import re

file = 'src/app/(tabs)/notifications.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Avatars
content = content.replace("require('../../../assets/images/avatar_v3_Honey.png')", "require('../../../assets/images/Avatar_LinhNguyen.png')")
content = content.replace("require('../../../assets/images/Avatar_MinhTran.png')", "require('../../../assets/images/Avatar_MinhTran2.png')")
content = content.replace("require('../../../assets/images/Avatar_AlexKim.png')", "require('../../../assets/images/Avatar_WeekendHikers.png')")
content = content.replace("require('../../../assets/images/Avatar_Me.png')", "require('../../../assets/images/Avatar_JakeMiller.png')")

# 2. Update Fonts
# pageTitle -> Dongle
content = content.replace("fontFamily: 'AfacadFlux_700Bold',\n    fontSize: rs(24)", "fontFamily: 'Dongle_700Bold',\n    fontSize: rs(40)")

# Everything else -> AfacadFlux_600SemiBold
content = content.replace("fontFamily: 'AfacadFlux_400Regular'", "fontFamily: 'AfacadFlux_600SemiBold'")
content = content.replace("fontFamily: 'AfacadFlux_700Bold'", "fontFamily: 'AfacadFlux_600SemiBold'")

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated fonts and avatars!")
