import {Text, View} from 'react-native';
import React from 'react';
import useStyles from '@/hooks/useStyles';
import createStyles from './Splaysh.style';

export const Splash = () => {
  const {styles} = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text>Auth App</Text>
    </View>
  );
};
