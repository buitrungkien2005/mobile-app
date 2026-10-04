import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

def replacer(match):
    cond = match.group(1)
    content = match.group(2)
    return f"{{{cond} && (<Reanimated.View entering={{FadeIn}} exiting={{FadeOut}} layout={{LinearTransition.springify()}}>{content}</Reanimated.View>)}}"

# 1. Password field (Sign In / Sign Up)
text = re.sub(
    r"\{(\(mode === 'signIn' \|\| mode === 'signUp'\)) && \(\s*(<View>\s*<Text style=\{styles\.label\}>Password.*?</View>)\s*\)\}",
    replacer,
    text,
    flags=re.DOTALL
)

# 2. Options Container (Forgot Password link, Remember Me)
text = re.sub(
    r"\{(mode === 'signIn') && \(\s*(<View style=\{styles\.optionsContainer\}>.*?</View>)\s*\)\}",
    replacer,
    text,
    flags=re.DOTALL
)

# 3. Social Buttons and Footer (Sign In / Sign Up)
text = re.sub(
    r"\{(\(mode === 'signIn' \|\| mode === 'signUp'\)) && \(\s*(<>\s*<TouchableOpacity style=\{styles\.googleBtn\}.*?</>)\s*\)\}",
    replacer,
    text,
    flags=re.DOTALL
)

# 4. Main buttons (Sign In / Reset Password / Verify Code)
text = text.replace(
    "<TouchableOpacity style={styles.mainBtn} onPress={handleAction}>",
    "<Reanimated.View layout={LinearTransition.springify()}><TouchableOpacity style={styles.mainBtn} onPress={handleAction}>"
)
text = text.replace(
    "</TouchableOpacity>\n\n              {/* === NÚT GUEST === */}",
    "</TouchableOpacity></Reanimated.View>\n\n              {/* === NÚT GUEST === */}"
)

# 5. Guest button (Needs to slide)
text = text.replace(
    "{(mode === 'signUp' || mode === 'signIn' || mode === 'createProfile' || mode === 'forgotPass') && (\n                <TouchableOpacity style={styles.guestBtn}>",
    "{(mode === 'signUp' || mode === 'signIn' || mode === 'createProfile' || mode === 'forgotPass') && (\n                <Reanimated.View layout={LinearTransition.springify()} entering={FadeIn} exiting={FadeOut}>\n                  <TouchableOpacity style={styles.guestBtn}>"
)
text = text.replace(
    "                  </TouchableOpacity>\n              )}",
    "                  </TouchableOpacity>\n                </Reanimated.View>\n              )}"
)

# 6. Back to Login button (Needs to slide)
text = text.replace(
    "{(mode === 'forgotPass' || mode === 'verifyCode') && (\n                <TouchableOpacity style={styles.backToLoginContainer} onPress={() => changeMode('signIn')}>",
    "{(mode === 'forgotPass' || mode === 'verifyCode') && (\n                <Reanimated.View layout={LinearTransition.springify()} entering={FadeIn} exiting={FadeOut}>\n                  <TouchableOpacity style={styles.backToLoginContainer} onPress={() => changeMode('signIn')}>"
)
text = text.replace(
    "                  </TouchableOpacity>\n              )}",
    "                  </TouchableOpacity>\n                </Reanimated.View>\n              )}"
)

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

