import re
import os

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# I will recreate the file completely up to the point of the return statement
# I will use the middle from the repair_home.py

middle = """// =========================================================
// GIAO DIEN: 3. (user) home
// LUONG: User
// =========================================================

const FeedPostBadges = ({ initialActive = 'public' }) => {
  const [active, setActive] = useState(initialActive);
  
  const renderBadge = (id, icon, label) => {
    const isActive = active === id;
    return (
      <TouchableOpacity onPress={() => setActive(id)} activeOpacity={0.8} style={isActive ? styles.postTagPublic : styles.postTag}>
        <Ionicons name={icon} size={rs(8)} color={isActive ? "#000" : "#374151"} style={{marginRight: rs(3)}} />
        <Text style={isActive ? styles.postTagTextDark : styles.postTagText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tagsGroup}>
      {renderBadge('public', 'globe-outline', 'Public')}
      {renderBadge('connections', 'people', 'Connections')}
      {renderBadge('close', 'lock-closed', 'Close Circle')}
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    LayoutAnimation.configureNext({
      duration: 600, // Cham hon (600ms)
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.easeInEaseOut, springDamping: 0.8 },
      delete: { type: LayoutAnimation.Types.easeOut, property: LayoutAnimation.Properties.opacity },
    });
    setIsSearchActive(!isSearchActive);
  };

  return ("""

prefix = content.split('// =========================================================')[0]
suffix = content.split('<View style={styles.container}>')[1]

content = prefix + '\n' + middle + '\n    <View style={styles.container}>' + suffix
with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
