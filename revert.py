import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove the faulty wrappers
text = text.replace("<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>", "")
text = text.replace("</Reanimated.View>", "")

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
