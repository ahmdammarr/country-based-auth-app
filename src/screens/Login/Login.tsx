import React, {FC, useState} from 'react';
import useStyles from '@/hooks/useStyles';
import createStyles from './Login.style';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginValidationScem} from '@/config/validations';
import ThemedText from '@/components/Text/Text';
import {ThemedTextInput} from '@/components/TextInput';
import {ThemedButton} from '@/components/Button';
import {useTranslation} from 'react-i18next';
import {ApiError, Post} from '@/service/apiClient';
import {AuthResponse} from '@/types/user.type';

import {setCredentials} from '@/config/secureStore';
import {ENDPOINTS} from '@/service/enpoints';

import {Errors} from '@/types/error.type';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AuthRoutes, AuthStackParamList} from '@/navigators/Navigation.types';
import {triggerNotification} from '@/config/notifications';
import {useAuth} from '@/hooks/useAuth';

interface ILoginForm {
  email: string;
  password: string;
}
type LoginScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.SIGNUP>;

export const Login: FC = () => {
  const {styles} = useStyles(createStyles);
  const route = useRoute<LoginScreenRouteProp>();
  const {country} = route.params;

  const {setIsAuthonticated} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setAapiError] = useState<Errors>();
  const {t} = useTranslation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginValidationScem),
  });
  const onSubmit = async (data: ILoginForm) => {
    setIsLoading(true);
    try {
      const apiResponse = await Post<ILoginForm, AuthResponse>(
        ENDPOINTS.LOGIN,
        data,
      );

      await setCredentials(apiResponse.data.accessToken);
      setIsLoading(false);
      triggerNotification();
      setIsAuthonticated(true);
    } catch (err) {
      const error = err as ApiError;
      setAapiError(error.details);
    }
    setIsLoading(false);
  };
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <View style={styles.container}>
      <ThemedText
        size="text26"
        fontWeight="medium"
        isDanger={true}
        children={t('login')}
      />
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <ThemedTextInput
              placeholder={t('email')}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
          )}
        />

        {errors.email && (
          <ThemedText
            size="text14"
            fontWeight="medium"
            isDanger={true}
            children={errors.email?.message}
            style={styles.error}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}}) => (
            <ThemedTextInput
              placeholder={t('password')}
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <ThemedText
            size="text14"
            fontWeight="medium"
            isDanger={true}
            children={errors.password?.message}
            style={styles.error}
          />
        )}

        <ThemedButton
          style={styles.button}
          text={t('login')}
          onPress={handleSubmit(onSubmit)}
        />
        <ThemedButton
          style={styles.button}
          text={t('signup')}
          onPress={() => navigate(AuthRoutes.SIGNUP, {country})}
        />
        {isLoading ? (
          <View style={styles.info}>
            <ThemedText
              size="text14"
              fontWeight="medium"
              children={t('loading')}
              style={styles.error}
            />
          </View>
        ) : null}
        {apiError ? (
          <View style={styles.info}>
            <ThemedText
              size="text14"
              isDanger
              fontWeight="medium"
              children={t(apiError)}
              style={styles.error}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};
