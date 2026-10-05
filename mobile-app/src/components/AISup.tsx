import React, { useRef } from 'react';
import { TouchableOpacity, Image, StyleSheet, Animated, PanResponder } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rs } from '../utils/scaling';

const TABBAR_HEIGHT = 65;

interface AISupProps {
  isGuest?: boolean;
}

export default function AISup({ isGuest = false }: AISupProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.floatingBee,
        { 
          bottom: rs(TABBAR_HEIGHT + 20) + insets.bottom,
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }
      ]}
    >
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => router.push({ pathname: '/ai-chat', params: { isGuest: isGuest ? 'true' : 'false' } })}
      >
        <Image
          source={require('../../assets/images/ai_login.png')}
          style={styles.floatingBeeImg}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  floatingBee: {
    position: 'absolute',
    left: rs(20),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  floatingBeeImg: {
    width: rs(96),
    height: rs(88),
  },
});
