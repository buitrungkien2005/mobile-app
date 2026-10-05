import re

file = 'src/app/(tabs)/notifications.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# State
content = content.replace("const [activeFilter, setActiveFilter] = useState('All');", "const [activeFilter, setActiveFilter] = useState('All');\n  const [isEmpty, setIsEmpty] = useState(false);")

# Mark all read
content = content.replace(
'''        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markReadText}>Mark all read</Text>
          </TouchableOpacity>
        </View>''',
'''        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Notifications</Text>
          {!isEmpty && (
            <TouchableOpacity onPress={() => setIsEmpty(true)}>
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>'''
)

# Content Block
content = content.replace(
'''        {/* Filter Pills */}
        <View style={styles.filtersRow}>
          {['All', 'Activity', 'Updates'].map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications List */}
        <View style={styles.listContainer}>
          {NOTIFICATIONS.map(item => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </View>''',
'''        {!isEmpty ? (
          <>
            {/* Filter Pills */}
            <View style={styles.filtersRow}>
              {['All', 'Activity', 'Updates'].map((filter) => (
                <TouchableOpacity 
                  key={filter}
                  style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Notifications List */}
            <View style={styles.listContainer}>
              {NOTIFICATIONS.map(item => (
                <NotificationItem key={item.id} item={item} />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Image source={require('../../../assets/images/download_5.gif')} style={styles.emptyGif} resizeMode="contain" />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtext}>
              When you get updates, connection alerts,{"\\n"}and reminders, they will appear here!
            </Text>
          </View>
        )}'''
)

# Styles
content = content.replace(
'''});''',
'''  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: rs(40),
    marginTop: rs(40),
  },
  emptyGif: {
    width: rs(200),
    height: rs(150),
    marginBottom: rs(20),
  },
  emptyTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(20),
    color: '#111827',
    marginBottom: rs(10),
  },
  emptySubtext: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(14),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: rs(22),
  },
});'''
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Applied empty state!')
