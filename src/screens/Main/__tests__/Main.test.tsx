import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';

import {Get} from '@/service/apiClient';
import {UserDetails} from '@/types/user.type';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRoutes, AppStackParamList} from '@/navigators/Navigation.types';
import {Main} from '../Main';
import * as RNLocalize from 'react-native-localize';

const Stack = createNativeStackNavigator<AppStackParamList>();
const translationsMock = {
  'account-num': 'Account Number',
  balance: 'Balance',
};
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/service/apiClient', () => ({
  Get: jest.fn(),
}));
export const mockUserDetails: {data: UserDetails} = {
  data: {
    details: {
      accountNumber: '1234567890',
      balance: 5000,
    },
  },
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: keyof typeof translationsMock) => {
      return translationsMock[key] || key;
    },
  }),
}));
(RNLocalize.getLocales as jest.Mock).mockReturnValue([
  {
    languageCode: 'en',
    isRTL: false,
  },
]);

describe('Main Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render account details as expected', async () => {
    (Get as jest.Mock).mockResolvedValueOnce(mockUserDetails);

    render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={AppRoutes.MAIN}
            options={{headerShown: false}}
            component={Main}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    await waitFor(() => {
      expect(Get).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          `${translationsMock['account-num']}: ${mockUserDetails.data.details.accountNumber}`,
        ),
      ).toBeTruthy();
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          `${translationsMock.balance}: ${mockUserDetails.data.details.balance}`,
        ),
      ).toBeTruthy();
    });
  });
});
