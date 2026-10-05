import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor 
} from 'react-native-reanimated';
import { rs } from '../utils/scaling';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function CustomSwitch({ value, onValueChange }: CustomSwitchProps) {
  // 0 means OFF, 1 means ON
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 250 });
  }, [value, progress]);

  const trackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#d1d5db', '#ffbb00'] // Grey for OFF, Orange for ON
    );
    return { backgroundColor };
  });

  const thumbStyle = useAnimatedStyle(() => {
    const translateX = progress.value * 24; // Track is 52, Thumb is 24, padding is 2. Range: 2 to 26 (Delta = 24)
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: rs(52),
    height: rs(28),
    borderRadius: rs(14),
    padding: rs(2),
    justifyContent: 'center',
  },
  thumb: {
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    backgroundColor: '#ffffff',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
