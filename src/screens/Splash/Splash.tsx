import {Text, View} from 'react-native';
import React from 'react';
import useStyles from '@/hooks/useStyles';
import createStyles from './Splaysh.style';
import {testIds} from '@/constants/testIds';

export const Splash = () => {
  const {styles} = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text testID={testIds.splash.title}>Auth App</Text>
    </View>
  );
};
