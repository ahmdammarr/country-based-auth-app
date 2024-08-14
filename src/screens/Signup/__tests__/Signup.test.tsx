/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Signup} from '../Signup';

import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthRoutes, AuthStackParamList} from '@/navigators/Navigation.types';
import * as RNLocalize from 'react-native-localize';

import {Post} from '@/service/apiClient';
import {setCredentials} from '@/config/secureStore';
import {ENDPOINTS} from '@/service/enpoints';
import {testIds} from '@/constants/testIds';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const translationsMock = {
  signup: 'Sign Up',
};
jest.mock('@/service/apiClient', () => ({
  Post: jest.fn(),
}));

jest.mock('@/config/secureStore', () => ({
  setCredentials: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: keyof typeof translationsMock) => {
      return translationsMock[key] || key;
    },
  }),
}));
(RNLocalize.getLocales as jest.Mock).mockReturnValue([
  {
    languageCode: 'en',
    isRTL: false,
  },
]);
describe('Change Language ', () => {
  beforeEach(() => {
    (Post as jest.Mock).mockClear();
    (setCredentials as jest.Mock).mockClear();
  });

  it('renders title correctly', async () => {
    render(
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={AuthRoutes.SIGNUP}
            options={{headerShown: false}}
            component={Signup}
            initialParams={{country: 'AE'}}
          />
        </AuthStack.Navigator>
      </NavigationContainer>,
    );

    expect(screen.getAllByText('Sign Up')).toBeTruthy();
  });
  it('handle signup displays correctly', async () => {
    render(
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={AuthRoutes.SIGNUP}
            options={{headerShown: false}}
            component={Signup}
            initialParams={{country: 'AE'}}
          />
        </AuthStack.Navigator>
      </NavigationContainer>,
    );
    fireEvent.changeText(
      screen.getByTestId(testIds.auth.emailInput),
      'test@example.com',
    );
    fireEvent.changeText(
      screen.getByTestId(testIds.auth.usernameInput),
      'testuser',
    );
    fireEvent.changeText(
      screen.getByTestId(testIds.auth.passwordInput),
      'password123',
    );
    fireEvent.press(screen.getByTestId(testIds.auth.signupButton));
    await waitFor(() => {
      expect(Post).toHaveBeenCalledWith(ENDPOINTS.SIGNUP, {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  it('errors displays correctly', async () => {
    render(
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={AuthRoutes.SIGNUP}
            options={{headerShown: false}}
            component={Signup}
            initialParams={{country: 'AE'}}
          />
        </AuthStack.Navigator>
      </NavigationContainer>,
    );
    fireEvent.press(screen.getByTestId(testIds.auth.signupButton));
    await waitFor(() => {
      expect(screen.getByTestId(testIds.auth.emailError)).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByTestId(testIds.auth.usernmaeError)).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByTestId(testIds.auth.emailError)).toBeTruthy();
    });
  });
});
