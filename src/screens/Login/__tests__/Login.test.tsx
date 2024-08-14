/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Login} from '../Login';

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
  login: 'Login',
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
            name={AuthRoutes.LOGIN}
            options={{headerShown: false}}
            component={Login}
            initialParams={{country: 'AE'}}
          />
        </AuthStack.Navigator>
      </NavigationContainer>,
    );

    expect(screen.getAllByText('Login')).toBeTruthy();
  });
  it('handle login displays correctly', async () => {
    render(
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={AuthRoutes.LOGIN}
            options={{headerShown: false}}
            component={Login}
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
      screen.getByTestId(testIds.auth.passwordInput),
      'password123',
    );
    fireEvent.press(screen.getByTestId(testIds.auth.loginButton));
    await waitFor(() => {
      expect(Post).toHaveBeenCalledWith(ENDPOINTS.LOGIN, {
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('errors displays correctly', async () => {
    render(
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={AuthRoutes.LOGIN}
            options={{headerShown: false}}
            component={Login}
            initialParams={{country: 'AE'}}
          />
        </AuthStack.Navigator>
      </NavigationContainer>,
    );
    fireEvent.press(screen.getByTestId(testIds.auth.loginButton));
    await waitFor(() => {
      expect(screen.getByTestId(testIds.auth.emailError)).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByTestId(testIds.auth.passwordError)).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByTestId(testIds.auth.emailError)).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByTestId(testIds.auth.passwordError)).toBeTruthy();
    });
  });
});
