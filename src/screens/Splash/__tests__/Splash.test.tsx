/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Splash} from '../Splash';

import {render, screen} from '@testing-library/react-native';

test('render splash with Auth App Correctly', () => {
  render(<Splash />);
  expect(screen.getByText('Auth App')).toBeTruthy();
});
