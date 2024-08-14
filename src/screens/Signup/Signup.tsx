import React, {FC, useState} from 'react';
import useStyles from '@/hooks/useStyles';
import createStyles from './Signup.style';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SignupValidationSchemas} from '@/config/validations';
import ThemedText from '@/components/Text/Text';
import {ThemedTextInput} from '@/components/TextInput';
import {ThemedButton} from '@/components/Button';
import {useTranslation} from 'react-i18next';
import {ApiError, Post} from '@/service/apiClient';
import {AuthResponse} from '@/types/user.type';

import {setCredentials} from '@/config/secureStore';
import {ENDPOINTS} from '@/service/enpoints';
import {AuthRoutes, AuthStackParamList} from '@/navigators/Navigation.types';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Errors} from '@/types/error.type';
import {testIds} from '@/constants/testIds';

interface ISignupForm {
  email: string;
  password: string;
  username: string;
}
type SignupScreenRouteProp = RouteProp<AuthStackParamList, AuthRoutes.SIGNUP>;

export const Signup: FC = () => {
  const {styles} = useStyles(createStyles);
  const route = useRoute<SignupScreenRouteProp>();
  const {country} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setAapiError] = useState<Errors>();
  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignupForm>({
    resolver: yupResolver(SignupValidationSchemas[country]),
  });

  const onSubmit = async (data: ISignupForm) => {
    setIsLoading(true);
    try {
      const apiResponse = await Post<ISignupForm, AuthResponse>(
        ENDPOINTS.SIGNUP,
        data,
      );

      await setCredentials(apiResponse.data.accessToken);
      setIsLoading(false);
      navigate(AuthRoutes.LOGIN, {country});
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
        testID={testIds.auth.signUpTitle}
        size="text26"
        fontWeight="medium"
        isDanger={true}
        children={t('signup')}
      />
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <ThemedTextInput
              testID={testIds.auth.emailInput}
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
            testID={testIds.auth.emailError}
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
          name="username"
          render={({field: {onChange, value}}) => (
            <ThemedTextInput
              testID={testIds.auth.usernameInput}
              placeholder={t('username')}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.username && (
          <ThemedText
            testID={testIds.auth.usernmaeError}
            size="text14"
            fontWeight="medium"
            isDanger={true}
            children={errors.username?.message}
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
              testID={testIds.auth.passwordInput}
              placeholder={t('password')}
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <ThemedText
            testID={testIds.auth.passwordError}
            size="text14"
            fontWeight="medium"
            isDanger={true}
            children={errors.password?.message}
            style={styles.error}
          />
        )}

        <ThemedButton
          testID={testIds.auth.signupButton}
          style={styles.button}
          text={t('signup')}
          onPress={handleSubmit(onSubmit)}
        />
        <ThemedButton
          style={styles.button}
          testID="login-button"
          text={t('login')}
          onPress={() => navigate(AuthRoutes.LOGIN, {country})}
        />
        <ThemedButton
          style={styles.button}
          testID="settings-button"
          text={t('settings')}
          onPress={() => navigate(AuthRoutes.SETTINGS)}
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
