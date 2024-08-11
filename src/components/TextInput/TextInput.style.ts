import {I18nManager, StyleSheet} from 'react-native';

import {APP_DIRECTION} from '@/constants/appDirection';
import {CreateStylesPropsT} from '@/types/styles.type';

const createStyles = ({theme, scale}: CreateStylesPropsT) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
      borderColor: theme.textColor,
      borderBottomWidth: 2 * scale,
    },
    input: {
      flexGrow: 1,
      flexShrink: 1,
      height: 34 * scale,
      writingDirection: APP_DIRECTION,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      color: theme.textColor,
    },
    disabledInput: {
      color: theme.backgroundColor,
    },
  });

export default createStyles;
