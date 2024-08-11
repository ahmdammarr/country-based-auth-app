/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Settings} from '../Settings';
import * as RNLocalize from 'react-native-localize';

import {render, fireEvent, screen} from '@testing-library/react-native';

describe('Change Language ', () => {
  it('should display "Hello" in English when English button is clicked', async () => {
    (RNLocalize.getLocales as jest.Mock).mockReturnValue([
      {
        languageCode: 'en',
        isRTL: false,
      },
    ]);
    render(<Settings />);

    fireEvent.press(screen.getByTestId('en-button'));

    expect(screen.getByText('Hello')).toBeTruthy();
  });
  it('should display "Hello" in Arabic when Arabic button is clicked', async () => {
    (RNLocalize.getLocales as jest.Mock).mockReturnValue([
      {
        languageCode: 'ar',
        isRTL: true,
      },
    ]);
    render(<Settings />);

    fireEvent.press(screen.getByTestId('ar-button'));

    expect(screen.getByText('مرحبا')).toBeTruthy();
  });
  it('should display "Hello" in Hindi when Hindi button is clicked', async () => {
    (RNLocalize.getLocales as jest.Mock).mockReturnValue([
      {
        languageCode: 'ar',
        isRTL: true,
      },
    ]);
    render(<Settings />);

    fireEvent.press(screen.getByTestId('hi-button'));

    expect(screen.getByText('नमस्ते')).toBeTruthy();
  });
});
