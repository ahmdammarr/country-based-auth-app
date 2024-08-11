import {StyleSheet} from 'react-native';

import {CreateStylesPropsT} from '@/types/styles.type';

const createStyles = ({theme, scale}: CreateStylesPropsT) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20 * scale,
      alignItems: 'flex-start',
      backgroundColor: theme.backgroundColor,
    },
  });

export default createStyles;
