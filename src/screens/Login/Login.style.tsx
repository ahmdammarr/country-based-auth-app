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
    title: {
      fontSize: 24,
      marginBottom: 16,
      color: theme.textColor,
      textAlign: 'center',
    },
    inputContainer: {
      width: '100%',
      height: 70 * scale,
    },
    error: {
      marginTop: 10 * scale,
    },
    button: {
      marginTop: 10 * scale,
    },
    info: {
      marginTop: 10 * scale,
      alignItems: 'center',
    },
  });

export default createStyles;
