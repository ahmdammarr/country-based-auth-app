/**
 * @format
 */

import 'react-native';
import React from 'react';
import {ChangeLanguageScreen} from '../ChangeLanguage';
import * as RNLocalize from 'react-native-localize';

import {render, fireEvent, screen} from '@testing-library/react-native';

describe('Change Language ', () => {
  it('should display "Welcome" in English when English button is clicked', async () => {
    (RNLocalize.getLocales as jest.Mock).mockReturnValue([
      {
        languageCode: 'en',
        isRTL: false,
      },
    ]);
    render(<ChangeLanguageScreen />);

    fireEvent.press(screen.getByTestId('en-button'));

    expect(screen.getByText('Welcome')).toBeTruthy();
  });
  it('should display "Welcome" in Arabic when Arabic button is clicked', async () => {
    (RNLocalize.getLocales as jest.Mock).mockReturnValue([
      {
        languageCode: 'ar',
        isRTL: true,
      },
    ]);
    render(<ChangeLanguageScreen />);

    fireEvent.press(screen.getByTestId('ar-button'));

    expect(screen.getByText('أهلا بك')).toBeTruthy();
  });
  it('should display "Welcome" in Hindi when Hindi button is clicked', async () => {
    (RNLocalize.getLocales as jest.Mock).mockReturnValue([
      {
        languageCode: 'ar',
        isRTL: true,
      },
    ]);
    render(<ChangeLanguageScreen />);

    fireEvent.press(screen.getByTestId('hi-button'));

    expect(screen.getByText('स्वागत है')).toBeTruthy();
  });
});
