import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

svg_components = """
const EyeOpenIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

const EyeClosedIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12c0 0 3 6 8 6s8-6 8-6" />
  </Svg>
);
"""

if "const EyeOpenIcon" not in text:
    text = text.replace("export default function AuthScreen() {", svg_components + "\nexport default function AuthScreen() {")

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
