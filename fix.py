import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("<Reanimated.View style={styles.formContainer} layout={LinearTransition.springify()}>", "<View style={styles.formContainer}>")

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
