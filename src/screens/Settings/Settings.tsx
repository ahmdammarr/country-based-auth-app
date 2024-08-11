import React, {FC, useEffect} from 'react';
import {Button, View} from 'react-native';
import i18n from '@/config/i18n';
import {useTranslation} from 'react-i18next';
import useStyles from '@/hooks/useStyles';
import createStyles from './Settings.styles';
import {Get} from '@/service/apiClient';
import {ENDPOINTS} from '@/service/enpoints';
import ThemedText from '@/components/Text/Text';
import {useCountry} from '@/hooks/useCountry';

import {COUNTRIES} from '@/constants/countries';

export const Settings: FC = () => {
  const {changeReagionAsync} = useCountry();
  const changeLanguage = async (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const {t} = useTranslation();
  const {styles} = useStyles(createStyles);

  useEffect(() => {
    const fetchDetails = async () => {
      await Get(ENDPOINTS.GETUSER);
    };
    fetchDetails;
  }, []);

  return (
    <View style={styles.container}>
      <ThemedText size="text26" fontWeight="regular" children={t('hello')} />
      <ThemedText
        size="text26"
        fontWeight="medium"
        children={t('change-lang')}
      />
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
      <ThemedText
        size="text26"
        fontWeight="medium"
        children={t('change-reagion')}
      />
      <Button
        testID="ae-button"
        title={t('ae')}
        onPress={async () => await changeReagionAsync(COUNTRIES.AE)}
      />
      <Button
        testID="in-button"
        title={t('in')}
        onPress={async () => await changeReagionAsync(COUNTRIES.IN)}
      />
      <Button
        testID="eg-button"
        title={t('eg')}
        onPress={async () => await changeReagionAsync(COUNTRIES.EG)}
      />
      <Button
        testID="us-button"
        title={t('us')}
        onPress={async () => await changeReagionAsync(COUNTRIES.US)}
      />
    </View>
  );
};
