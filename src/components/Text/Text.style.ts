import {APP_DIRECTION} from '@/constants/appDirection';
import {StyleSheet} from 'react-native';

import {CreateStylesPropsT} from '@/types/styles.type';

const createStyles = ({theme, scale}: CreateStylesPropsT) =>
  StyleSheet.create({
    base: {
      writingDirection: APP_DIRECTION,
      color: theme.textColor,
    },
    regular: {
      fontWeight: '100',
    },
    medium: {
      fontWeight: '400',
    },
    bold: {
      fontWeight: '900',
    },
    danger: {
      color: theme.danger,
    },

    text74: {
      fontSize: 74 * scale,
      lineHeight: 1.5 * 74 * scale,
    },
    text50: {
      fontSize: 50 * scale,
      lineHeight: 1.5 * scale,
    },
    text36: {
      fontSize: 36 * scale,
      lineHeight: 36 * scale,
    },
    text26: {
      fontSize: 26 * scale,
      lineHeight: 26 * scale,
    },
    text16: {
      fontSize: 16 * scale,
      lineHeight: 16 * scale,
    },
    text14: {
      fontSize: 14 * scale,
      lineHeight: 14 * scale,
    },
    text12: {
      fontSize: 12 * scale,
      lineHeight: 12 * scale,
    },
    text10: {
      fontSize: 10 * scale,
      lineHeight: 10 * scale,
    },
  });

export default createStyles;
