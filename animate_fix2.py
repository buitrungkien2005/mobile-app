import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Guest button opening
text = text.replace(
    "{(mode === 'signUp' || mode === 'signIn' || mode === 'createProfile' || mode === 'forgotPass') && (<TouchableOpacity style={styles.guestBtn}>",
    "{(mode === 'signUp' || mode === 'signIn' || mode === 'createProfile' || mode === 'forgotPass') && (<Reanimated.View layout={LinearTransition.springify()} entering={FadeIn} exiting={FadeOut}><TouchableOpacity style={styles.guestBtn}>"
)

# Fix Back to login opening
text = text.replace(
    "{(mode === 'forgotPass' || mode === 'verifyCode') && (<TouchableOpacity style={styles.backToLoginContainer} onPress={() => changeMode('signIn')}>",
    "{(mode === 'forgotPass' || mode === 'verifyCode') && (<Reanimated.View layout={LinearTransition.springify()} entering={FadeIn} exiting={FadeOut}><TouchableOpacity style={styles.backToLoginContainer} onPress={() => changeMode('signIn')}>"
)

# Fix their closing tags
# They currently end with </TouchableOpacity>)}. We need them to be </TouchableOpacity></Reanimated.View>)}
# Let's match the ones we just wrapped. 
# Guest button ends right before BACK TO LOGIN TEXT
text = re.sub(
    r"(</TouchableOpacity>\)\}\s*)(?=\{/\* === BACK TO LOGIN TEXT)",
    r"</TouchableOpacity></Reanimated.View>)}\n              ",
    text,
    count=1
)

# Back to login ends right before CÁC NÚT (or similar)
text = re.sub(
    r"(</TouchableOpacity>\)\}\s*)(?=\{/\* === C)",
    r"</TouchableOpacity></Reanimated.View>)}\n              ",
    text,
    count=1
)

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
