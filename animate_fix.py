import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Guest button
text = text.replace(
    "{(mode === 'signUp' || mode === 'signIn' || mode === 'createProfile' || mode === 'forgotPass') && (<TouchableOpacity style={styles.guestBtn}>",
    "{(mode === 'signUp' || mode === 'signIn' || mode === 'createProfile' || mode === 'forgotPass') && (<Reanimated.View layout={LinearTransition.springify()} entering={FadeIn} exiting={FadeOut}><TouchableOpacity style={styles.guestBtn}>"
)

# Fix Back to login button
text = text.replace(
    "{(mode === 'forgotPass' || mode === 'verifyCode') && (<TouchableOpacity style={styles.backToLoginContainer} onPress={() => changeMode('signIn')}>",
    "{(mode === 'forgotPass' || mode === 'verifyCode') && (<Reanimated.View layout={LinearTransition.springify()} entering={FadeIn} exiting={FadeOut}><TouchableOpacity style={styles.backToLoginContainer} onPress={() => changeMode('signIn')}>"
)

# Fix their closing tags
# For Guest button:
text = text.replace(
    "                  </TouchableOpacity>)}\n\n              {/* === BACK TO LOGIN TEXT",
    "                  </TouchableOpacity></Reanimated.View>)}\n\n              {/* === BACK TO LOGIN TEXT"
)

# For Back to Login text:
text = text.replace(
    "                  </TouchableOpacity>)}\n\n              {/* === CÁC NÚT MẠNG XÃ HỘI",
    "                  </TouchableOpacity></Reanimated.View>)}\n\n              {/* === CÁC NÚT MẠNG XÃ HỘI"
)
# Note: Since the Vietnamese characters might be encoded differently, let's just use regex to insert the closing tag safely!
