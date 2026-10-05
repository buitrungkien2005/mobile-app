import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { rs } from '../utils/scaling';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: rs(14),
    lineHeight: rs(20),
    fontWeight: 500,
  },
  smallBold: {
    fontSize: rs(14),
    lineHeight: rs(20),
    fontWeight: 700,
  },
  default: {
    fontSize: rs(16),
    lineHeight: rs(24),
    fontWeight: 500,
  },
  title: {
    fontSize: rs(48),
    fontWeight: 600,
    lineHeight: rs(52),
  },
  subtitle: {
    fontSize: rs(32),
    lineHeight: rs(44),
    fontWeight: 600,
  },
  link: {
    lineHeight: rs(30),
    fontSize: rs(14),
  },
  linkPrimary: {
    lineHeight: rs(30),
    fontSize: rs(14),
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: rs(12),
  },
});
