import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Remove the extra </View> after Post 2
content = content.replace("            </View>\n          </View>\n          \n        \n          {/* Post 3: Minh Tran */}", 
                          "            </View>\n          \n        \n          {/* Post 3: Minh Tran */}")

# Fix 2: Add </View> after Post 3
content = content.replace("                </TouchableOpacity>\n              </View>\n            </View>\n\n        </ScrollView>",
                          "                </TouchableOpacity>\n              </View>\n            </View>\n          </View>\n\n        </ScrollView>")

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed feedContainer closing tag!')
