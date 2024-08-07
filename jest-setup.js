/* eslint-disable no-undef */

import '@testing-library/react-native/extend-expect';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-localize', () => ({
  getLocales: jest.fn(),
  findBestAvailableLanguage: jest.fn(),
  getNumberFormatSettings: jest.fn(),
  getCalendar: jest.fn(),
  getCountry: jest.fn(),
  getCurrencies: jest.fn(),
  getTemperatureUnit: jest.fn(),
  getTimeZone: jest.fn(),
  uses24HourClock: jest.fn(),
  usesMetricSystem: jest.fn(),
  usesAutoDateAndTime: jest.fn(),
  usesAutoTimeZone: jest.fn(),
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en-US',
      AppleLanguages: ['ar-US', 'hi-US', 'en-US'],
    },
  };
  return RN;
});
