/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Signup} from '../Signup/Signup';

import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthRoutes, AuthStackParamList} from '@/navigators/Navigation.types';

import {Post} from '@/service/apiClient';
import {setCredentials} from '@/config/secureStore';
import {ENDPOINTS} from '@/service/enpoints';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

jest.mock('@/service/apiClient', () => ({
  Post: jest.fn(),
}));

jest.mock('@/config/secureStore', () => ({
  setCredentials: jest.fn(),
}));

describe('Change Language ', () => {
  beforeEach(() => {
    (Post as jest.Mock).mockClear();
    (setCredentials as jest.Mock).mockClear();
  });

  it('signup displays correctly', async () => {
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
      screen.getByPlaceholderText('Email'),
      'test@example.com',
    );
    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(
      screen.getByPlaceholderText('Password'),
      'password123',
    );
    fireEvent.press(screen.getByTestId('signup-button'));
    await waitFor(() => {
      expect(Post).toHaveBeenCalledWith(ENDPOINTS.SIGNUP, {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      });
    });
    expect(screen.getByTestId('Signup')).toBeTruthy();
  });
});
