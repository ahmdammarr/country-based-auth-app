import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import * as RNLocalize from 'react-native-localize';

// Import translation files
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';
import hi from '@/locales/hi.json';

// Function to get device language
const getDeviceLanguage = () => {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return locale
    ? locale.replace('_', '-')
    : RNLocalize.getLocales()[0].languageTag;
};

// i18next configuration
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
    hi: {
      translation: hi,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
