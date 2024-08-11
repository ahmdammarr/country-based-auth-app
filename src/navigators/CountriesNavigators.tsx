import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings} from '@/screens/Settings';
import {COUNTRIES} from '@/constants/countries';
import {AppRoutes, AppStackParamList} from './Navigation.types';
import {Main} from '@/screens/Main/Main';

const Stack = createNativeStackNavigator<AppStackParamList>();
export const navigators = {
  // Thos selector can be used to hide screen for some regions
  [COUNTRIES.AE]: (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={AppRoutes.MAIN} component={Main} />
        <Stack.Screen name={AppRoutes.SETTINGS} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  ),
  [COUNTRIES.US]: (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={AppRoutes.MAIN} component={Main} />
        <Stack.Screen name={AppRoutes.SETTINGS} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  ),
  [COUNTRIES.IN]: (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={AppRoutes.MAIN} component={Main} />
        <Stack.Screen name={AppRoutes.SETTINGS} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  ),
  [COUNTRIES.EG]: (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={AppRoutes.MAIN} component={Main} />
        <Stack.Screen name={AppRoutes.SETTINGS} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  ),
};
