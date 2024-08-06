/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import { NavigationContainer } from '@react-navigation/native';

// Note: import explicitly to use the types shipped with jest.

import { render, screen } from '@testing-library/react-native';
// Note: test renderer must be required after react-native.


test('basic test', () => {
  render(<App />);
  expect(screen.getByText('Home Screen')).toBeOnTheScreen();
});
