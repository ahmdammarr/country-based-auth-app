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

import {testIds} from '@/constants/testIds';
import {COUNTRIES} from '@/constants/countries';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const translationsMock = {
  username_alphanumeric_min_5:
    'Username must be alphanumeric and at least 5 characters long',
  username_start_letter_min_6:
    'Username must start with a letter and be at least 6 characters long',
  username_alphanumeric_min_6:
    'Username must be alphanumeric and at least 6 characters long',
  username_alphanumeric_min_4:
    'Username must be alphanumeric and at least 4 characters long',
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
jest.mock('@/config/validations', () => ({
  SignupValidationSchemas: {
    AE: {
      validate: jest.fn().mockImplementation(() => {
        throw {
          inner: [
            {
              path: 'username',
              message: translationsMock.username_alphanumeric_min_5,
            },
          ],
        };
      }),
    },
    US: {
      validate: jest.fn().mockImplementation(() => {
        throw {
          inner: [
            {
              path: 'username',
              message: translationsMock.username_alphanumeric_min_6,
            },
          ],
        };
      }),
    },
    EG: {
      validate: jest.fn().mockImplementation(() => {
        throw {
          inner: [
            {
              path: 'username',
              message: translationsMock.username_alphanumeric_min_4,
            },
          ],
        };
      }),
    },
    IN: {
      validate: jest.fn().mockImplementation(() => {
        throw {
          inner: [
            {
              path: 'username',
              message: translationsMock.username_start_letter_min_6,
            },
          ],
        };
      }),
    },
  },
}));
describe('Change Language ', () => {
  beforeEach(() => {
    (Post as jest.Mock).mockClear();
    (setCredentials as jest.Mock).mockClear();
  });

  it('AE username validation is correctly working', async () => {
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
    fireEvent.changeText(screen.getByTestId(testIds.auth.usernameInput), 'tes');
    fireEvent.changeText(
      screen.getByTestId(testIds.auth.passwordInput),
      'password123',
    );
    fireEvent.press(screen.getByTestId(testIds.auth.signupButton));

    await waitFor(() => {
      expect(
        screen.getAllByText(translationsMock.username_alphanumeric_min_5),
      ).toBeTruthy();
    });
  });
  it('IN username validation is correctly working', async () => {
    render(
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={AuthRoutes.SIGNUP}
            options={{headerShown: false}}
            component={Signup}
            initialParams={{country: COUNTRIES.IN}}
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
      '6tesrfertrtrt',
    );
    fireEvent.changeText(
      screen.getByTestId(testIds.auth.passwordInput),
      'password123',
    );
    fireEvent.press(screen.getByTestId(testIds.auth.signupButton));

    await waitFor(() => {
      expect(
        screen.getAllByText(translationsMock.username_start_letter_min_6),
      ).toBeTruthy();
    });
  });
  it('EG username validation is correctly working', async () => {
    render(
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={AuthRoutes.SIGNUP}
            options={{headerShown: false}}
            component={Signup}
            initialParams={{country: COUNTRIES.EG}}
          />
        </AuthStack.Navigator>
      </NavigationContainer>,
    );

    fireEvent.changeText(
      screen.getByTestId(testIds.auth.emailInput),
      'test@example.com',
    );
    fireEvent.changeText(screen.getByTestId(testIds.auth.usernameInput), 'tes');
    fireEvent.changeText(
      screen.getByTestId(testIds.auth.passwordInput),
      'password123',
    );
    fireEvent.press(screen.getByTestId(testIds.auth.signupButton));

    await waitFor(() => {
      expect(
        screen.getAllByText(translationsMock.username_alphanumeric_min_4),
      ).toBeTruthy();
    });
  });
  it('US username validation is correctly working', async () => {
    render(
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name={AuthRoutes.SIGNUP}
            options={{headerShown: false}}
            component={Signup}
            initialParams={{country: COUNTRIES.US}}
          />
        </AuthStack.Navigator>
      </NavigationContainer>,
    );

    fireEvent.changeText(
      screen.getByTestId(testIds.auth.emailInput),
      'test@example.com',
    );
    fireEvent.changeText(screen.getByTestId(testIds.auth.usernameInput), 'tes');
    fireEvent.changeText(
      screen.getByTestId(testIds.auth.passwordInput),
      'password123',
    );
    fireEvent.press(screen.getByTestId(testIds.auth.signupButton));

    await waitFor(() => {
      expect(
        screen.getAllByText(translationsMock.username_alphanumeric_min_6),
      ).toBeTruthy();
    });
  });
});
