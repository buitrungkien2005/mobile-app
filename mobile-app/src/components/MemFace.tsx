import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { rs } from '../utils/scaling';

interface MemFaceProps {
  othersCount?: string;
}

export default function MemFace({ othersCount = '+1,195 others' }: MemFaceProps) {
  const avatars = [
    require('../../assets/images/Ava1.png'),
    require('../../assets/images/Ava2.png'),
    require('../../assets/images/Ava3.png'),
    require('../../assets/images/Ava4.png'),
    require('../../assets/images/Ava5.png'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        {avatars.map((ava, idx) => (
          <Image 
            key={idx} 
            source={ava} 
            style={[styles.avatar, idx > 0 && styles.avatarOverlap]} 
          />
        ))}
      </View>
      <View style={styles.badgePill}>
        <Text style={styles.othersText}>{othersCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(8),
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rs(8),
  },
  avatar: {
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  avatarOverlap: {
    marginLeft: -rs(6),
  },
  badgePill: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    borderRadius: rs(12),
  },
  othersText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: rs(11),
    color: '#4b5563',
  },
});
