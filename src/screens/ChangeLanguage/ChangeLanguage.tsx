import React from 'react';
import {Button, View} from 'react-native';
import i18n from '@/config/i18n';
import {Text} from 'react-native';
import {useTranslation} from 'react-i18next';

export const ChangeLanguageScreen = () => {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const {t} = useTranslation();
  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Button
        testID="ar-button"
        title="Change to Arabic"
        onPress={() => changeLanguage('ar')}
      />
      <Button
        testID="hi-button"
        title="Change to Hindi"
        onPress={() => changeLanguage('hi')}
      />
      <Button
        testID="en-button"
        title="Change to English"
        onPress={() => changeLanguage('en')}
      />
    </View>
  );
};
