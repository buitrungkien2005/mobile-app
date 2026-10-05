import re

file = 'src/app/(tabs)/profile-info.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Import CommentModal
if 'import CommentModal' not in content:
    content = content.replace("import { rs } from '../../utils/scaling';", "import { rs } from '../../utils/scaling';\nimport CommentModal from '../../components/CommentModal';")

# 2. Add state
if 'const [isCommentModalVisible' not in content:
    content = content.replace('const [isInviteModalVisible, setInviteModalVisible] = useState(false);', 'const [isInviteModalVisible, setInviteModalVisible] = useState(false);\n  const [isCommentModalVisible, setCommentModalVisible] = useState(false);')

# 3. Add open/close functions
if 'const openCommentModal =' not in content:
    modal_funcs = '''  const openCommentModal = () => setCommentModalVisible(true);
  const closeCommentModal = () => setCommentModalVisible(false);'''
    content = content.replace('const openInviteModal = () => {', modal_funcs + '\n\n  const openInviteModal = () => {')

# 4. Add onPress to chatbubble-outline
content = content.replace("<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>\n                      <Ionicons name=\"chatbubble-outline\"", "<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openCommentModal}>\n                      <Ionicons name=\"chatbubble-outline\"")

# 5. Render CommentModal
if '<CommentModal' not in content:
    content = content.replace('{/* Share Post Modal */}', '<CommentModal visible={isCommentModalVisible} onClose={closeCommentModal} />\n\n        {/* Share Post Modal */}')

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated profile-info.tsx!')
