import re

with open('mobile-app/src/app/(auth)/login.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add import Reanimated
if "import Reanimated" not in text:
    text = text.replace("import { View", "import Reanimated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';\nimport { View")

# 2. Make the welcomeText crossfade
# Find: <Text style={styles.welcomeText}>
# Replace with: <Reanimated.Text key={mode} entering={FadeIn} exiting={FadeOut} style={styles.welcomeText}>
text = text.replace(
    "<Text style={styles.welcomeText}>",
    "<Reanimated.Text key={mode} entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()} style={styles.welcomeText}>"
)
# And the closing tag
text = re.sub(r"(<Reanimated\.Text[^>]*>.*?)</Text>", r"\1</Reanimated.Text>", text, flags=re.DOTALL)

# 3. Add Reanimated to all conditionally rendered blocks so they fade and slide!
# We can just wrap the content inside the {} with <Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>

blocks = [
    (r"\{mode === 'signUp' && \(\s*(<View>.*?)\s*\)\}", r"{mode === 'signUp' && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"),
    (r"\{\(mode === 'signIn' \|\| mode === 'signUp' \|\| mode === 'forgotPass'\) && \(\s*(<View>.*?)\s*\)\}", r"{(mode === 'signIn' || mode === 'signUp' || mode === 'forgotPass') && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"),
    (r"\{mode === 'verifyCode' && \(\s*(<View style=\{styles.otpWrapper\}>.*?)\s*\)\}", r"{mode === 'verifyCode' && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"),
    (r"\{\(mode === 'signIn' \|\| mode === 'signUp'\) && \(\s*(<View>.*?<Text style=\{styles.label\}>Password.*?</View>)\s*\)\}", r"{(mode === 'signIn' || mode === 'signUp') && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"),
    (r"\{mode === 'signUp' && \(\s*(<View>.*?<Text style=\{styles.label\}>Confirm Password.*?</View>)\s*\)\}", r"{mode === 'signUp' && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"),
    (r"\{mode === 'createProfile' && \(\s*(<View style=\{styles.createProfileContainer\}>.*?)\s*\)\}", r"{mode === 'createProfile' && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"),
    (r"\{mode === 'signIn' && \(\s*(<View style=\{styles.optionsContainer\}>.*?)\s*\)\}", r"{mode === 'signIn' && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"),
]

for pattern, repl in blocks:
    text = re.sub(pattern, repl, text, flags=re.DOTALL)

# For the buttons (Main button, Guest button, Back to Login, Social buttons)
# Let's wrap them in layout={LinearTransition.springify()} so they slide smoothly.
# Or better, just apply layout={LinearTransition.springify()} to their parent container!
# The parent is <View style={styles.formContainer}>
text = text.replace(
    "<View style={styles.formContainer}>",
    "<Reanimated.View style={styles.formContainer} layout={LinearTransition.springify()}>"
)
text = text.replace(
    "</View>\n\n          </View>\n        </ScrollView>",
    "</Reanimated.View>\n\n          </View>\n        </ScrollView>"
)

# And social buttons:
social_pattern = r"\{\(mode === 'signIn' \|\| mode === 'signUp'\) && \(\s*(<>\s*<TouchableOpacity style=\{styles.googleBtn\}>.*?)\s*\)\}"
social_repl = r"{(mode === 'signIn' || mode === 'signUp') && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"
text = re.sub(social_pattern, social_repl, text, flags=re.DOTALL)
# wait, if it's <> ... </>, we need to replace <> with <Reanimated.View...> and </> with </Reanimated.View>
text = text.replace(
    "{(mode === 'signIn' || mode === 'signUp') && (\n                <>\n                  <TouchableOpacity style={styles.googleBtn}>",
    "{(mode === 'signIn' || mode === 'signUp') && (\n                <Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\n                  <TouchableOpacity style={styles.googleBtn}>"
)
text = text.replace(
    "                  </View>\n                </>\n              )}",
    "                  </View>\n                </Reanimated.View>\n              )}"
)

# Back to login:
back_pattern = r"\{\(mode === 'forgotPass' \|\| mode === 'verifyCode'\) && \(\s*(<TouchableOpacity style=\{styles.backToLoginContainer\}.*?</TouchableOpacity>)\s*\)\}"
back_repl = r"{(mode === 'forgotPass' || mode === 'verifyCode') && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"
text = re.sub(back_pattern, back_repl, text, flags=re.DOTALL)


# Guest button:
guest_pattern = r"\{\(mode === 'signUp' \|\| mode === 'signIn' \|\| mode === 'createProfile' \|\| mode === 'forgotPass'\) && \(\s*(<TouchableOpacity style=\{styles.guestBtn\}.*?</TouchableOpacity>)\s*\)\}"
guest_repl = r"{(mode === 'signUp' || mode === 'signIn' || mode === 'createProfile' || mode === 'forgotPass') && (<Reanimated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition.springify()}>\1</Reanimated.View>)}"
text = re.sub(guest_pattern, guest_repl, text, flags=re.DOTALL)

with open('mobile-app/src/app/(auth)/login.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

