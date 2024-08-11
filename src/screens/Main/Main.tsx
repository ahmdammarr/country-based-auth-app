import React, {FC, useEffect, useReducer} from 'react';
import useStyles from '@/hooks/useStyles';
import createStyles from './Main.style';
import {View} from 'react-native';

import ThemedText from '@/components/Text/Text';

import {useTranslation} from 'react-i18next';
import {Get} from '@/service/apiClient';

import {ENDPOINTS} from '@/service/enpoints';
import {Errors} from '@/types/error.type';
import {UserDetails} from '@/types/user.type';

import {} from '@react-navigation/native';
import {AppRoutes, AppStackParamList} from '@/navigators/Navigation.types';

import {ThemedButton} from '@/components/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
type Action =
  | {type: 'SET_USER_DETAILS'; payload: UserDetails | null}
  | {type: 'SET_IS_LOADING'; payload: boolean}
  | {type: 'SET_API_ERROR'; payload: Errors | null};

interface State {
  userDetails: UserDetails | null;
  isLoading: boolean;
  apiError: Errors | null;
}
const initialState: State = {
  userDetails: null,
  isLoading: true,
  apiError: null,
};

export const Main: FC = () => {
  const {styles} = useStyles(createStyles);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_USER_DETAILS':
        return {...state, userDetails: action.payload};
      case 'SET_IS_LOADING':
        return {...state, isLoading: action.payload};
      case 'SET_API_ERROR':
        return {...state, apiError: action.payload};
      default:
        return state;
    }
  }

  const [{apiError, isLoading, userDetails}, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const {t} = useTranslation();

  useEffect(() => {
    dispatch({type: 'SET_IS_LOADING', payload: true});
    const fetch = async () => {
      try {
        const user = await Get<UserDetails>(ENDPOINTS.GETUSER);
        console.log('user', user?.data?.details);

        if (user.data?.details) {
          dispatch({type: 'SET_USER_DETAILS', payload: user?.data});
        }
      } catch (err) {
        dispatch({type: 'SET_API_ERROR', payload: Errors.SERVER_ERROR});
      }
    };
    fetch();
    dispatch({type: 'SET_IS_LOADING', payload: false});
  }, []);
  const {navigate} = useNavigation<NavigationProp<AppStackParamList>>();
  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ThemedText size="text26" fontWeight="medium" children={t('loading')} />
      </View>
    );
  }

  if (apiError) {
    return (
      <View style={styles.stateContainer}>
        <ThemedText
          size="text14"
          isDanger
          fontWeight="medium"
          children={`${t('SERVER_ERROR')}`}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <ThemedText
          size="text26"
          fontWeight="regular"
          children={`${t('account-num')}: ${
            userDetails?.details?.accountNumber
          }`}
        />
        <ThemedText
          size="text26"
          fontWeight="regular"
          children={`${t('balance')}: ${userDetails?.details?.balance}`}
        />
      </View>
      <View>
        <ThemedButton
          style={styles.button}
          size="medium"
          text={t('settings')}
          onPress={() => navigate(AppRoutes.SETTINGS)}
        />
      </View>
    </View>
  );
};
