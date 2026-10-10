import React, { useRef } from 'react';
import { TouchableOpacity, Image, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rs } from '../utils/scaling';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BEE_WIDTH = rs(96);
const BEE_HEIGHT = rs(88);
const INITIAL_LEFT = rs(20);
const TABBAR_HEIGHT_LOGICAL = 55; // Matches TabBarMenu's base height

// Global state to persist position across screen mounts
let globalPan = { x: 0, y: 0 };

interface AISupProps {
  isGuest?: boolean;
}

export default function AISup({ isGuest = false }: AISupProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Initialize Animated.ValueXY with the global persisted offset
  const pan = useRef(new Animated.ValueXY({ x: globalPan.x, y: globalPan.y })).current;

  // The base bottom calculation used in the style
  const initialBottom = rs(TABBAR_HEIGHT_LOGICAL + 20) + insets.bottom;

  // Calculate safe boundaries
  const minX = -INITIAL_LEFT;
  const maxX = SCREEN_WIDTH - INITIAL_LEFT - BEE_WIDTH;
  
  // For Y: moving UP is negative dy, moving DOWN is positive dy.
  // We don't want it to go above the status bar (insets.top).
  // Y coordinate of top of bee = SCREEN_HEIGHT - initialBottom - BEE_HEIGHT + pan.y
  // We want: SCREEN_HEIGHT - initialBottom - BEE_HEIGHT + pan.y >= insets.top
  // So: pan.y >= insets.top - SCREEN_HEIGHT + initialBottom + BEE_HEIGHT
  const minY = insets.top - SCREEN_HEIGHT + initialBottom + BEE_HEIGHT;
  
  // We don't want it to go below the TabBar top edge.
  // Bottom of bee = initialBottom - pan.y
  // TabBar top edge distance from bottom = rs(TABBAR_HEIGHT_LOGICAL) + insets.bottom
  // We want: initialBottom - pan.y >= rs(TABBAR_HEIGHT_LOGICAL) + insets.bottom
  // So: pan.y <= initialBottom - (rs(TABBAR_HEIGHT_LOGICAL) + insets.bottom)
  const maxY = initialBottom - (rs(TABBAR_HEIGHT_LOGICAL) + insets.bottom);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        // Stop any ongoing animations
        pan.stopAnimation();
        // Set the current globalPan as the base offset, and reset value to 0 for this drag
        pan.setOffset({ x: globalPan.x, y: globalPan.y });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        let nextX = gestureState.dx;
        let nextY = gestureState.dy;

        // Absolute position if we apply this drag
        const absX = globalPan.x + nextX;
        const absY = globalPan.y + nextY;

        // Clamp dx/dy based on absolute boundaries
        let clampedDx = nextX;
        let clampedDy = nextY;

        if (absX < minX) clampedDx = minX - globalPan.x;
        if (absX > maxX) clampedDx = maxX - globalPan.x;

        if (absY < minY) clampedDy = minY - globalPan.y;
        if (absY > maxY) clampedDy = maxY - globalPan.y;

        pan.setValue({ x: clampedDx, y: clampedDy });
      },
      onPanResponderRelease: () => {
        // Merge offset into value, set offset to 0
        pan.flattenOffset();
        
        // Save the new clamped position globally so it persists when switching screens
        globalPan.x = (pan.x as any)._value;
        globalPan.y = (pan.y as any)._value;
      }
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.floatingBee,
        { 
          bottom: initialBottom,
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
    left: INITIAL_LEFT,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  floatingBeeImg: {
    width: BEE_WIDTH,
    height: BEE_HEIGHT,
  },
});
