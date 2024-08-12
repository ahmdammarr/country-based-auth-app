import React, {useEffect} from 'react';
import {useCountry} from '@/hooks/useCountry';
import {Splash} from '@/screens/Splash/Splash';

import {I18nManager} from 'react-native';
import i18n from '@/config/i18n';

import {navigators} from './CountriesNavigators';
import {AuthNavigator} from './AuthNavigator';
import {useAuth} from '@/hooks/useAuth';

export const Root = () => {
  const {isLoading: isCountryLoading, country} = useCountry();
  const {isAuthonticated, isLoading: isAuthLoading} = useAuth();

  const isLoading = isCountryLoading || isAuthLoading;

  useEffect(() => {
    if (i18n.language.includes('ar')) {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  }, []);

  if (isLoading) {
    return <Splash />;
  }
  if (!isAuthonticated) {
    return <AuthNavigator />;
  }
  return navigators[country];
};
