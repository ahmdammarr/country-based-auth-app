import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemesT} from '@/types/styles.type';
import {getCountry} from 'react-native-localize';
import {countriesCodes} from '@/constants/countries';
import {StoreKeys} from '@/constants/storeKeys';
import {resetCredentials} from '@/config/secureStore';
import RNRestart from 'react-native-restart';

type ICountryContext = {
  country: ThemesT;
  setCountry: (country: ThemesT) => void;
  isLoading: boolean;
  changeReagionAsync: (country: ThemesT) => Promise<void>;
};

export const CountryeContext = createContext<ICountryContext>({
  country: 'AE',
  setCountry: () => {},
  isLoading: true,
  changeReagionAsync: async () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const CountryProvider = ({children}: ThemeProviderProps) => {
  const [country, setCountry] = useState<ThemesT>('AE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(StoreKeys.COUNTRY)
      .then(storedTheme => {
        if (storedTheme) {
          setCountry(storedTheme as ThemesT);
        } else {
          const defaultCountry = countriesCodes.includes(getCountry())
            ? getCountry()
            : 'AE';
          setCountry((storedTheme || defaultCountry) as ThemesT);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(StoreKeys.COUNTRY, country);
  }, [country]);
  const changeReagionAsync = async (selectedCountry: ThemesT) => {
    setCountry(selectedCountry);
    await AsyncStorage.setItem(StoreKeys.COUNTRY, country);
    await resetCredentials();
    RNRestart.restart();
  };
  return (
    <CountryeContext.Provider
      value={{
        country,
        setCountry,
        isLoading,
        changeReagionAsync,
      }}>
      {children}
    </CountryeContext.Provider>
  );
};
