const getLocales = () => [
  {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
  {countryCode: 'IN', languageTag: 'hi-IN', languageCode: 'hi', isRTL: false},
  {countryCode: 'SA', languageTag: 'ar-SA', languageCode: 'ar', isRTL: true},
];

const findBestAvailableLanguage = () => ({
  languageTag: 'en-US',
  isRTL: false,
});

const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
});

const getCalendar = () => 'gregorian';

const getCountry = () => 'US';

const getCurrencies = () => ['USD'];

const getTemperatureUnit = () => 'celsius';

const getTimeZone = () => 'America/New_York';

const uses24HourClock = () => false;

const usesMetricSystem = () => true;

const usesAutoDateAndTime = () => true;

const usesAutoTimeZone = () => true;

export {
  getLocales,
  findBestAvailableLanguage,
  getNumberFormatSettings,
  getCalendar,
  getCountry,
  getCurrencies,
  getTemperatureUnit,
  getTimeZone,
  uses24HourClock,
  usesMetricSystem,
  usesAutoDateAndTime,
  usesAutoTimeZone,
};
