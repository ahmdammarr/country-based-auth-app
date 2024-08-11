import {StyleSheet} from 'react-native';

import {CreateStylesPropsT} from '@/types/styles.type';

const createStyles = ({theme, scale}: CreateStylesPropsT) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20 * scale,
      backgroundColor: theme.backgroundColor,
    },
  });

export default createStyles;
