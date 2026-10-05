import re

file = 'src/components/CommentModal.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update CommentItem to handle expanded state and replies rendering
comment_item_pattern = re.compile(r'const CommentItem = \(\{ name, date, tag, avatar, text, isAi, repliesCount \}: any\) => \{.*?\n  \};\n', re.DOTALL)

new_comment_item = '''const CommentItem = ({ name, date, tag, avatar, text, isAi, repliesCount, replies }: any) => {
  const [expanded, setExpanded] = useState(false);
  const getTagStyle = (t: string) => {
    switch (t) {
      case 'Public': return { bg: '#dcfce7', text: '#15803d' };
      case 'Connected': return { bg: '#dbeafe', text: '#1d4ed8' };
      case 'Circle': return { bg: '#f3e8ff', text: '#7e22ce' };
      default: return { bg: '#f3f4f6', text: '#4b5563' };
    }
  };
  const tagStyle = getTagStyle(tag);

  return (
    <View style={styles.commentRow}>
      <Image source={avatar} style={styles.commentAvatar} resizeMode="contain" />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={[styles.commentName, isAi && { color: '#b45309' }]}>{name}</Text>
          <Text style={styles.commentDate}>{date}</Text>
          {tag && (
            <View style={[styles.tagPill, { backgroundColor: tagStyle.bg }]}>
              <Text style={[styles.tagText, { color: tagStyle.text }]}>{tag}</Text>
            </View>
          )}
        </View>
        <View style={[styles.commentBubble, isAi && styles.aiBubble]}>
          <Text style={[styles.commentText, isAi && { color: '#78350f' }]}>{text}</Text>
        </View>
        {replies && replies.length > 0 && (
          <TouchableOpacity style={styles.repliesBtn} onPress={() => setExpanded(!expanded)}>
            <View style={styles.repliesIcon}>
              <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={rs(12)} color="#fff" />
            </View>
            <Text style={styles.repliesText}>{expanded ? "Hide replies" : `${replies.length} replies`}</Text>
          </TouchableOpacity>
        )}

        {expanded && replies && (
          <View style={styles.repliesContainer}>
            {replies.map((reply: any, index: number) => (
              <View key={index} style={styles.replyRow}>
                <View style={[styles.replyAvatar, { backgroundColor: reply.color }]} />
                <View style={styles.replyContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentName}>{reply.name}</Text>
                    <Text style={styles.commentDate}>{reply.date}</Text>
                    {reply.tag && (
                      <View style={[styles.tagPill, { backgroundColor: getTagStyle(reply.tag).bg }]}>
                        <Text style={[styles.tagText, { color: getTagStyle(reply.tag).text }]}>{reply.tag}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.replyBubble}>
                    <Text style={styles.commentText}>{reply.text}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
'''

content = comment_item_pattern.sub(new_comment_item, content)

# 2. Update COMMENTS_DATA to include the replies array
comments_data_pattern = re.compile(r'const COMMENTS_DATA = \[\s*\{.*?\}];', re.DOTALL)

new_comments_data = '''const COMMENTS_DATA = [
  { name: "Sarah Chen", date: "15/09/2026, 08:41", tag: "Public", avatar: require('../../assets/images/Avatar_AlexKim.png'), text: "I like the overall direction, but why did we choose this muted palette?", replies: [
    { name: "Jake Miller", date: "15/09, 08:45", tag: "Connected", color: "#facc15", text: "Yeah, I was wondering the same — maybe warmer tones?" },
    { name: "Linh Nguyen", date: "15/09, 08:46", tag: "Circle", color: "#d946ef", text: "The muted palette works for the premium feel though." }
  ] },
  { name: "AI Assistant", date: "15/09/2026, 08:43", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Warmer tones could make the palette feel more inviting while keeping the same soft, premium mood.", isAi: true },
  { name: "Jake Miller", date: "16/09/2026, 08:47", tag: "Connected", avatar: require('../../assets/images/avatar_v3_Sunny.png'), text: "The spacing between sections feels a bit tight, especially around the middle content blocks.", replies: [] },
  { name: "AI Assistant", date: "16/09/2026, 08:49", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Try adding a bit more padding between sections so the layout breathes and the hierarchy is easier to scan.", isAi: true },
  { name: "Linh Nguyen", date: "16/09/2026, 08:53", tag: "Circle", avatar: require('../../assets/images/avatar_v3_Honey.png'), text: "I love the typography. Maybe the headings could be a little bigger to feel more confident?" },
  { name: "AI Assistant", date: "16/09/2026, 08:55", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Agreed - bumping the main headings to around 24px and the subheadings to 18px would help a lot.", isAi: true },
  { name: "Sarah Chen", date: "17/09/2026, 08:58", tag: "Public", avatar: require('../../assets/images/Avatar_AlexKim.png'), text: "Has anyone checked how this looks on mobile? I'm worried the layout might feel cramped." },
  { name: "Jake Miller", date: "17/09/2026, 09:01", tag: "Connected", avatar: require('../../assets/images/avatar_v3_Sunny.png'), text: "Good catch. Once we tighten the spacing, I think it should hold up nicely on smaller screens. 👍" }
];'''

content = comments_data_pattern.sub(new_comments_data, content)

# 3. Pass `replies={c.replies}` in the mapping logic
mapping_pattern = re.compile(r'repliesCount=\{c\.repliesCount \|\| 0\}')
content = mapping_pattern.sub('repliesCount={c.repliesCount || 0}\n                replies={c.replies}', content)

# 4. Add styles for replies
new_styles = '''
  repliesText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13),
    color: '#9ca3af',
  },
  repliesContainer: {
    marginTop: rs(12),
  },
  replyRow: {
    flexDirection: 'row',
    marginBottom: rs(12),
  },
  replyAvatar: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(10),
    marginRight: rs(10),
    marginTop: rs(4),
  },
  replyContent: {
    flex: 1,
  },
  replyBubble: {
    backgroundColor: '#f3ece1',
    borderRadius: rs(16),
    borderTopLeftRadius: rs(4),
    padding: rs(12),
  },
'''

content = content.replace("  repliesText: {\n    fontFamily: 'AfacadFlux_500Medium',\n    fontSize: rs(13),\n    color: '#9ca3af',\n  },", new_styles)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated replies logic!')
