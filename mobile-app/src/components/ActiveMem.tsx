import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { rs } from '../utils/scaling';

export interface ActiveMemberItem {
  id: string;
  name: string;
  avatar: any;
}

interface ActiveMemProps {
  members?: ActiveMemberItem[];
}

const DEFAULT_MEMBERS: ActiveMemberItem[] = [
  { id: 'm1', name: 'Linh', avatar: require('../../assets/images/Linh.png') },
  { id: 'm2', name: 'Minh', avatar: require('../../assets/images/Minh.png') },
  { id: 'm3', name: 'An', avatar: require('../../assets/images/An.png') },
  { id: 'm4', name: 'Khoa', avatar: require('../../assets/images/Khoa.png') },
  { id: 'm5', name: 'Vy', avatar: require('../../assets/images/Vy.png') },
  { id: 'm6', name: 'Duc', avatar: require('../../assets/images/Duc.png') },
];

export default function ActiveMem({ members = DEFAULT_MEMBERS }: ActiveMemProps) {
  return (
    <View style={styles.container}>
      {members.map(member => (
        <TouchableOpacity key={member.id} style={styles.memberItem} activeOpacity={0.8}>
          <View style={styles.avatarBorder}>
            <Image source={member.avatar} style={styles.avatar} />
          </View>
          <Text style={styles.nameText} numberOfLines={1}>{member.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rs(4),
  },
  memberItem: {
    alignItems: 'center',
  },
  avatarBorder: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    borderWidth: 2,
    borderColor: '#f59e0b',
    padding: 1,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: rs(20),
    resizeMode: 'cover',
  },
  nameText: {
    fontFamily: 'Inter_500Medium',
    fontSize: rs(11),
    color: '#111827',
    marginTop: rs(5),
    textAlign: 'center',
  },
});
