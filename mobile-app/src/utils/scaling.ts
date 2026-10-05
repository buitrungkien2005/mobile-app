import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Standard design width and height
const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

/**
 * Calculates a scaled size based on the screen width relative to the design base width.
 */
export const scale = (size: number) => (width / guidelineBaseWidth) * size;

/**
 * Calculates a scaled size based on the screen height relative to the design base height.
 */
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

/**
 * Moderately scales a size. Useful for things like font sizes where you don't want
 * a strictly linear scale. Factor controls how aggressive the scaling is.
 */
export const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;

/**
 * Quick responsive size shortcut, using a moderate scale factor of 0.4.
 * Use this for widths, heights, margins, paddings, and fonts.
 */
export const rs = (size: number) => moderateScale(size, 0.4);
