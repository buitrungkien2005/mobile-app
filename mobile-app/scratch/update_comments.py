import re

file = 'src/components/CommentModal.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

old_comments = '''            <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: rs(20) }}>
              <CommentItem 
                name="Sarah Chen" date="15/09/2026, 08:41" tag="Public" 
                avatar={require('../../assets/images/Avatar_AlexKim.png')} 
                text="I like the overall direction, but why did we choose this muted palette?" 
                repliesCount={2} 
              />
              <CommentItem 
                name="AI Assistant" date="15/09/2026, 08:43" tag="Public" 
                avatar={require('../../assets/images/ai_login.png')} 
                text="Warmer tones could make the palette feel more inviting while keeping the same soft, premium mood." 
                isAi 
              />
              <CommentItem 
                name="Jake Miller" date="16/09/2026, 08:47" tag="Connected" 
                avatar={require('../../assets/images/avatar_v3_Sunny.png')} 
                text="The spacing between sections feels a bit tight, especially around the middle content blocks." 
                repliesCount={2} 
              />
            </ScrollView>'''

new_comments = '''            <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: rs(20) }}>
              <CommentItem 
                name="Sarah Chen" date="15/09/2026, 08:41" tag="Public" 
                avatar={require('../../assets/images/Avatar_AlexKim.png')} 
                text="I like the overall direction, but why did we choose this muted palette?" 
                repliesCount={2} 
              />
              <CommentItem 
                name="AI Assistant" date="15/09/2026, 08:43" tag="Public" 
                avatar={require('../../assets/images/ai_login.png')} 
                text="Warmer tones could make the palette feel more inviting while keeping the same soft, premium mood." 
                isAi 
              />
              <CommentItem 
                name="Jake Miller" date="16/09/2026, 08:47" tag="Connected" 
                avatar={require('../../assets/images/avatar_v3_Sunny.png')} 
                text="The spacing between sections feels a bit tight, especially around the middle content blocks." 
                repliesCount={2} 
              />
              <CommentItem 
                name="AI Assistant" date="16/09/2026, 08:49" tag="Public" 
                avatar={require('../../assets/images/ai_login.png')} 
                text="Try adding a bit more padding between sections so the layout breathes and the hierarchy is easier to scan." 
                isAi 
              />
              <CommentItem 
                name="Linh Nguyen" date="16/09/2026, 08:53" tag="Circle" 
                avatar={require('../../assets/images/avatar_v3_Honey.png')} 
                text="I love the typography. Maybe the headings could be a little bigger to feel more confident?" 
              />
              <CommentItem 
                name="AI Assistant" date="16/09/2026, 08:55" tag="Public" 
                avatar={require('../../assets/images/ai_login.png')} 
                text="Agreed - bumping the main headings to around 24px and the subheadings to 18px would help a lot." 
                isAi 
              />
              <CommentItem 
                name="Sarah Chen" date="17/09/2026, 08:58" tag="Public" 
                avatar={require('../../assets/images/Avatar_AlexKim.png')} 
                text="Has anyone checked how this looks on mobile? I'm worried the layout might feel cramped." 
              />
              <CommentItem 
                name="Jake Miller" date="17/09/2026, 09:01" tag="Connected" 
                avatar={require('../../assets/images/avatar_v3_Sunny.png')} 
                text="Good catch. Once we tighten the spacing, I think it should hold up nicely on smaller screens. 👍" 
              />
            </ScrollView>'''

if old_comments in content:
    content = content.replace(old_comments, new_comments)
else:
    print('Failed to match exact string! Trying regex fallback...')
    pattern = re.compile(r'<ScrollView style=\{styles\.commentsList\}[^>]*>.*?</ScrollView>', re.DOTALL)
    content = pattern.sub(new_comments, content)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated comments list!')
