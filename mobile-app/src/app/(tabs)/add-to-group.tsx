import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TabBarMenu from '../../components/TabBarMenu';
import AISup from '../../components/AISup';
import { rs } from '../../utils/scaling';

const { width } = Dimensions.get('window');
const OVERLAY_HEIGHT = width * (67 / 393);
const TABBAR_HEIGHT = 65;

const connectionsData = [
  { 
    id: '1', 
    name: 'Priya Sharma', 
    status: 'Active 5m ago', 
    mutual: '12 mutual connections', 
    avatar: require('../../../assets/images/Priya_Sharma.png'), 
    hasFlag: false 
  },
  { 
    id: '2', 
    name: 'Jake Miller', 
    status: 'Active 2h ago', 
    mutual: '4 mutual connections', 
    avatar: require('../../../assets/images/Jake_Miller.png'), 
    hasFlag: false 
  },
  { 
    id: '3', 
    name: 'Linh Nguyen', 
    status: 'Active yesterday', 
    mutual: '8 mutual connections', 
    avatar: require('../../../assets/images/Avatar_YukiTanaka.png'), 
    hasFlag: false 
  },
  { 
    id: '4', 
    name: 'Minh Tran', 
    status: 'Active now', 
    mutual: '15 mutual connections', 
    avatar: require('../../../assets/images/MinhTran_Avatar.png'), 
    hasFlag: true 
  }
];

export default function AddToGroupScreen() {
  const router = useRouter();

  // State
  const [selectedIds, setSelectedIds] = useState<string[]>(['1', '2', '3']);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupName, setGroupName] = useState('Weekend Crew');

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCreateGroup = () => {
    router.push({
      pathname: '/(tabs)/group-chat',
      params: {
        groupName: groupName.trim() || 'Weekend Crew',
      }
    });
  };

  const filteredConnections = connectionsData.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Background Watermark Pattern */}
      <Image 
        source={require('../../../assets/images/Hex_Background.png')} 
        style={styles.hexBg} 
        resizeMode="cover" 
      />

      {/* FIXED TOP HEADER */}
      <View style={[styles.headerContainer, { height: OVERLAY_HEIGHT + rs(65) }]}>
        <Image 
          source={require('../../../assets/images/profile_overlay_new.png')} 
          style={[styles.overlay, { position: 'absolute', top: 0, left: 0, height: OVERLAY_HEIGHT }]} 
          resizeMode="cover" 
        />
        <View style={[styles.headerTop, { paddingTop: rs(75) }]}>
          <View style={styles.headerLeftGroup}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()} 
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={rs(22)} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add to group</Text>
          </View>

          <Image 
            source={require('../../../assets/images/BrandLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
      </View>

      {/* SCROLLABLE MAIN CONTENT */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Search Input Box */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search connections..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Selected Count Badge Pill */}
        <View style={styles.selectedCountBadge}>
          <Text style={styles.selectedCountText}>
            {selectedIds.length} selected
          </Text>
        </View>

        {/* Connection Cards List */}
        <View style={styles.connectionsList}>
          {filteredConnections.map(user => {
            const isSelected = selectedIds.includes(user.id);
            return (
              <TouchableOpacity
                key={user.id}
                style={styles.userCard}
                onPress={() => toggleSelect(user.id)}
                activeOpacity={0.8}
              >
                <View style={styles.userInfoLeft}>
                  <Image source={user.avatar} style={styles.avatar} />
                  <View style={styles.userDetails}>
                    <View style={styles.nameRow}>
                      <Text style={styles.userName}>{user.name}</Text>
                      {user.hasFlag && <Text style={styles.flag}>🇻🇳</Text>}
                    </View>
                    <Text style={styles.userStatus}>{user.status}</Text>
                    <Text style={styles.userMutual}>{user.mutual}</Text>
                  </View>
                </View>

                {/* Selection Checkbox */}
                <View style={[
                  styles.checkCircle,
                  isSelected ? styles.checkCircleSelected : styles.checkCircleUnselected
                ]}>
                  {isSelected && (
                    <Ionicons name="checkmark" size={rs(16)} color="#ffffff" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Group Name Section */}
        <View style={styles.groupNameSection}>
          <Text style={styles.inputLabel}>Group name</Text>
          <TextInput
            style={styles.groupNameInput}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Weekend Crew"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Create Group CTA Button */}
        <TouchableOpacity
          style={styles.createGroupBtn}
          onPress={handleCreateGroup}
          activeOpacity={0.85}
        >
          <Text style={styles.createGroupBtnText}>Create group</Text>
        </TouchableOpacity>

        {/* Bottom padding for TabBar and Floating Mascot */}
        <View style={{ height: TABBAR_HEIGHT + rs(65) }} />
      </ScrollView>

      {/* FLOATING AISUP MASCOT */}
      <AISup isGuest={false} />

      {/* TABBAR MENU */}
      <TabBarMenu activeTab="messages" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff' 
  },
  hexBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.35,
  },
  headerContainer: { 
    width: width, 
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  overlay: { 
    width: width,
  },
  headerTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: rs(20) 
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: rs(36),
    height: rs(36),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(8),
  },
  headerTitle: { 
    fontFamily: 'AfacadFlux_700Bold', 
    fontSize: rs(20), 
    color: '#111827',
  },
  logo: { 
    width: rs(35), 
    height: rs(35) 
  },

  /* SCROLL CONTENT */
  scrollContent: { 
    paddingTop: rs(10), 
  },

  /* Search Box */
  searchContainer: { 
    paddingHorizontal: rs(16), 
    marginBottom: rs(16) 
  },
  searchInput: { 
    height: rs(46), 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    borderRadius: rs(12), 
    paddingHorizontal: rs(16), 
    fontFamily: 'AfacadFlux_400Regular', 
    fontSize: rs(15), 
    color: '#111827', 
    backgroundColor: '#ffffff' 
  },

  /* Selected Count Pill */
  selectedCountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffbb00',
    paddingHorizontal: rs(14),
    paddingVertical: rs(6),
    borderRadius: rs(16),
    marginHorizontal: rs(16),
    marginBottom: rs(14),
  },
  selectedCountText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(13),
    color: '#ffffff',
  },

  /* Connections List */
  connectionsList: { 
    paddingHorizontal: rs(16), 
    gap: rs(12) 
  },
  userCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: rs(14), 
    backgroundColor: '#ffffff', 
    borderRadius: rs(16), 
    borderWidth: 1, 
    borderColor: '#ede8df',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  userInfoLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  avatar: { 
    width: rs(48), 
    height: rs(48), 
    borderRadius: rs(24), 
    marginRight: rs(14) 
  },
  userDetails: { 
    flex: 1, 
    paddingRight: rs(10) 
  },
  nameRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: rs(2) 
  },
  userName: { 
    fontFamily: 'AfacadFlux_700Bold', 
    fontSize: rs(16), 
    color: '#111827', 
    marginBottom: rs(2) 
  },
  userStatus: { 
    fontFamily: 'AfacadFlux_400Regular', 
    fontSize: rs(13), 
    color: '#9ca3af', 
    marginBottom: rs(3) 
  },
  userMutual: { 
    fontFamily: 'AfacadFlux_600SemiBold', 
    fontSize: rs(12), 
    color: '#d97706' 
  },
  flag: { 
    marginLeft: rs(4), 
    fontSize: rs(14) 
  },

  /* Selection Circle */
  checkCircle: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: {
    backgroundColor: '#ffbb00',
  },
  checkCircleUnselected: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#d1d5db',
  },

  /* Group Name Section */
  groupNameSection: {
    paddingHorizontal: rs(16),
    marginTop: rs(18),
    marginBottom: rs(16),
  },
  inputLabel: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(14),
    color: '#111827',
    marginBottom: rs(8),
  },
  groupNameInput: {
    height: rs(46),
    borderWidth: 1,
    borderColor: '#ede8df',
    borderRadius: rs(12),
    paddingHorizontal: rs(16),
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(15),
    color: '#111827',
    backgroundColor: '#ffffff',
  },

  /* CTA Button */
  createGroupBtn: {
    marginHorizontal: rs(16),
    backgroundColor: '#ffbb00',
    borderRadius: rs(24),
    height: rs(48),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffbb00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  createGroupBtnText: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(16),
    color: '#ffffff',
  },
});
