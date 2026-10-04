import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r"<Image\s*source=\{showPassword \? require\('\.\.\/\.\.\/\.\.\/assets\/images\/password_open\.png'\) : require\('\.\.\/\.\.\/\.\.\/assets\/images\/password_close\.png'\)\}\s*style=\{\{ width: 20, height: 20, tintColor: 'red' \}\}\s*resizeMode=\"" + "contain" + r"\"\s*\/>"

text = re.sub(pattern, "<Ionicons name={showPassword ? \"eye-outline\" : \"eye-off-outline\"} size={20} color=\"#9ca3af\" />", text)

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
