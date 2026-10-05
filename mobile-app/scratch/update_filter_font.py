import re

file = 'src/components/CommentModal.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update font families
content = content.replace("fontFamily: 'AfacadFlux_700Bold',\n    fontSize: rs(13),", "fontFamily: 'AfacadFlux_600SemiBold',\n    fontSize: rs(13),")
content = content.replace("fontFamily: 'AfacadFlux_700Bold',\n    fontSize: rs(15),", "fontFamily: 'AfacadFlux_500Medium',\n    fontSize: rs(15),")
content = content.replace("fontFamily: 'AfacadFlux_400Regular',\n    fontSize: rs(12),", "fontFamily: 'AfacadFlux_500Medium',\n    fontSize: rs(12),")
content = content.replace("fontFamily: 'AfacadFlux_700Bold',\n    fontSize: rs(10),", "fontFamily: 'AfacadFlux_500Medium',\n    fontSize: rs(10),")
content = content.replace("fontFamily: 'AfacadFlux_400Regular',\n    fontSize: rs(14),", "fontFamily: 'AfacadFlux_500Medium',\n    fontSize: rs(14),")

# 2. Extract comments to data array and implement mapping logic
# We need to replace the ScrollView contents inside CommentModal
old_scroll_view_pattern = re.compile(r'(<ScrollView style=\{styles\.commentsList\} showsVerticalScrollIndicator=\{false\} contentContainerStyle=\{\{ paddingBottom: rs\(20\) \}\}>).*?(</ScrollView>)', re.DOTALL)

data_array = """
const COMMENTS_DATA = [
  { name: "Sarah Chen", date: "15/09/2026, 08:41", tag: "Public", avatar: require('../../assets/images/Avatar_AlexKim.png'), text: "I like the overall direction, but why did we choose this muted palette?", repliesCount: 2 },
  { name: "AI Assistant", date: "15/09/2026, 08:43", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Warmer tones could make the palette feel more inviting while keeping the same soft, premium mood.", isAi: true },
  { name: "Jake Miller", date: "16/09/2026, 08:47", tag: "Connected", avatar: require('../../assets/images/avatar_v3_Sunny.png'), text: "The spacing between sections feels a bit tight, especially around the middle content blocks.", repliesCount: 2 },
  { name: "AI Assistant", date: "16/09/2026, 08:49", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Try adding a bit more padding between sections so the layout breathes and the hierarchy is easier to scan.", isAi: true },
  { name: "Linh Nguyen", date: "16/09/2026, 08:53", tag: "Circle", avatar: require('../../assets/images/avatar_v3_Honey.png'), text: "I love the typography. Maybe the headings could be a little bigger to feel more confident?" },
  { name: "AI Assistant", date: "16/09/2026, 08:55", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Agreed - bumping the main headings to around 24px and the subheadings to 18px would help a lot.", isAi: true },
  { name: "Sarah Chen", date: "17/09/2026, 08:58", tag: "Public", avatar: require('../../assets/images/Avatar_AlexKim.png'), text: "Has anyone checked how this looks on mobile? I'm worried the layout might feel cramped." },
  { name: "Jake Miller", date: "17/09/2026, 09:01", tag: "Connected", avatar: require('../../assets/images/avatar_v3_Sunny.png'), text: "Good catch. Once we tighten the spacing, I think it should hold up nicely on smaller screens. 👍" }
];
"""

# Insert COMMENTS_DATA before export default function CommentModal
content = content.replace("export default function CommentModal", data_array + "\nexport default function CommentModal")

new_scroll_view_content = """<ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: rs(20) }}>
            {COMMENTS_DATA.filter(c => activeFilter === 'All' || c.tag === activeFilter).map((c, index) => (
              <CommentItem 
                key={index}
                name={c.name}
                date={c.date}
                tag={c.tag}
                avatar={c.avatar}
                text={c.text}
                isAi={c.isAi}
                repliesCount={c.repliesCount || 0}
              />
            ))}
          </ScrollView>"""

content = old_scroll_view_pattern.sub(new_scroll_view_content, content)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated comments filtering and fonts!')
