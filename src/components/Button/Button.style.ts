import {StyleSheet} from 'react-native';

import {CreateStylesPropsT} from '@/types/styles.type';

const createStyles = ({scale, theme}: CreateStylesPropsT) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16 * scale,
      borderRadius: 32 * scale,
      paddingHorizontal: 24 * scale,
      backgroundColor: theme.buttonBackgroundColor,
      width: '100%',
    },
    large: {
      height: 56 * scale,
    },
    medium: {
      height: 50 * scale,
    },
    small: {
      height: 40 * scale,
    },
    primary: {
      color: theme.buttonBackgroundColor,
      backgroundColor: theme.buttonBackgroundColor,
    },
    white: {
      color: '#000000',
      backgroundColor: '#FFFFFF',
    },
    disabled: {
      opacity: 0.6,
    },
    text: {
      lineHeight: 2 * 14 * scale,
    },
  });

export default createStyles;
