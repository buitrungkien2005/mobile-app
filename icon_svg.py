import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add SVG imports
if "import Svg" not in text:
    text = text.replace(
        "import { View, Text, StyleSheet", 
        "import Svg, { Path, Circle } from 'react-native-svg';\nimport { View, Text, StyleSheet"
    )

# Add SVG components before the default export
svg_components = """
const EyeOpenIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

const EyeClosedIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 12c0 0 3 7 9 7s9-7 9-7" />
  </Svg>
);
"""

if "const EyeOpenIcon" not in text:
    text = text.replace("export default function LoginScreen() {", svg_components + "\nexport default function LoginScreen() {")

# Replace custom image with our new inline SVG components
pattern = r"<Image\s*source=\{showPassword \? require\('\.\.\/\.\.\/\.\.\/assets\/images\/eye_open_custom\.png'\) : require\('\.\.\/\.\.\/\.\.\/assets\/images\/eye_closed_custom\.png'\)\}\s*style=\{\{ width: 20, height: 20 \}\}\s*resizeMode=\""" + "contain" + r"\" \/>"

text = re.sub(
    pattern, 
    "{showPassword ? <EyeOpenIcon color=\"#9ca3af\" /> : <EyeClosedIcon color=\"#9ca3af\" />}", 
    text
)

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
