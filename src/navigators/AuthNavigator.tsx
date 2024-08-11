import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCountry} from '@/hooks/useCountry';

import {Signup} from '@/screens/Signup/Signup';

import {AuthRoutes, AuthStackParamList} from './Navigation.types';
import {Login} from '@/screens/Login/Login';
import {Settings} from '@/screens/Settings';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const {country} = useCountry();

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name={AuthRoutes.SIGNUP}
          options={{headerShown: false}}
          component={Signup}
          initialParams={{country}}
        />
        <AuthStack.Screen
          name={AuthRoutes.LOGIN}
          options={{headerShown: false}}
          component={Login}
          initialParams={{country}}
        />
        <AuthStack.Screen name={AuthRoutes.SETTINGS} component={Settings} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
