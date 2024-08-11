import {StyleSheet} from 'react-native';

import {CreateStylesPropsT} from '@/types/styles.type';

const createStyles = ({theme, scale}: CreateStylesPropsT) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20 * scale,
      backgroundColor: theme.backgroundColor,
    },
    stateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20 * scale,
      backgroundColor: theme.backgroundColor,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      color: theme.textColor,
      textAlign: 'center',
    },
    button: {
      alignItems: 'center',
      marginTop: 50 * scale,
    },
    info: {
      marginTop: 10 * scale,
      alignItems: 'flex-start',
    },
  });

export default createStyles;
