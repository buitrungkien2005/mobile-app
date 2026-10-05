import re
import os

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

post3 = """
          {/* Post 3: Minh Tran */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={require('../../../assets/images/Avatar_MinhTran.png')} style={styles.postAvatar} resizeMode="contain" />
              <View style={styles.postMeta}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.postAuthor}>Minh Tran</Text>
                  <Text style={{fontSize: rs(14), marginLeft: rs(4)}}>🇻🇳</Text>
                  <Ionicons name="checkmark-circle" size={rs(16)} color="#ffb703" style={{marginLeft: rs(4)}} />
                </View>
                <Text style={styles.postTime}>20/8/2026 • Ho Chi Minh City, Vietnam</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={rs(20)} color="#ffb703" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.postText}>This morning's pho was so delicious! 🍜 Nothing beats a hot bowl of pho to start a new day in Saigon...</Text>
            
            <View style={[styles.postImage, { overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }]}>
              <Image source={{uri: 'https://picsum.photos/id/102/600/300'}} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
              <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />
              
              <Ionicons name="lock-closed" size={rs(24)} color="#fff" style={{ marginBottom: rs(8) }} />
              <Text style={{ color: '#fff', fontSize: rs(16), fontWeight: 'bold', marginBottom: rs(4) }}>Connections only</Text>
              <Text style={{ color: '#e5e7eb', fontSize: rs(12), textAlign: 'center', paddingHorizontal: rs(20), marginBottom: rs(16) }}>This post is visible to BeeBuddy connections</Text>
              
              <TouchableOpacity style={{ backgroundColor: '#ffb703', paddingHorizontal: rs(20), paddingVertical: rs(8), borderRadius: rs(20), flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="people" size={rs(14)} color="#000" style={{ marginRight: rs(6) }} />
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: rs(14) }}>Connect to unlock</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.postActionsRow}>
              <View style={styles.leftActionsGroup}>
                <TouchableOpacity><Ionicons name="heart-outline" size={rs(24)} color="#000" style={styles.actionIcon} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="chatbubble-outline" size={rs(24)} color="#000" style={styles.actionIcon} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="paper-plane-outline" size={rs(24)} color="#000" /></TouchableOpacity>
              </View>
              
              <FeedPostBadges initialActive="connections" />
              <TouchableOpacity><Ionicons name="bookmark-outline" size={rs(24)} color="#000" /></TouchableOpacity>
            </View>

            <View style={styles.commentInputContainer}>
              <TextInput placeholder="Add a comment..." style={styles.commentInput} placeholderTextColor="#9ca3af" />
              <TouchableOpacity style={styles.commentSendBtn}>
                <Ionicons name="send" size={rs(14)} color="#ffb703" />
              </TouchableOpacity>
            </View>
          </View>
"""

content = content.replace("""              <View style={styles.commentInputContainer}>
                <TextInput placeholder="Add a comment..." style={styles.commentInput} placeholderTextColor="#9ca3af" />
                <TouchableOpacity style={styles.commentSendBtn}>
                  <Ionicons name="send" size={rs(14)} color="#ffb703" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
        </ScrollView>""", """              <View style={styles.commentInputContainer}>
                <TextInput placeholder="Add a comment..." style={styles.commentInput} placeholderTextColor="#9ca3af" />
                <TouchableOpacity style={styles.commentSendBtn}>
                  <Ionicons name="send" size={rs(14)} color="#ffb703" />
                </TouchableOpacity>
              </View>
            </View>
""" + post3 + """          </View>
          
        </ScrollView>""")

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Post 3 added")
