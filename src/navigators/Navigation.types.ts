import {TCOUNTRY} from '@/types/countries.type';

export enum AuthRoutes {
  SIGNUP = 'Signup',
  LOGIN = 'Login',
  SETTINGS = 'Settings',
}

export enum AppRoutes {
  MAIN = 'Main',
  SETTINGS = 'Settings',
}

export type AuthStackParamList = {
  [AuthRoutes.SIGNUP]: {country: TCOUNTRY};
  [AuthRoutes.LOGIN]: {country: TCOUNTRY};
  [AuthRoutes.SETTINGS]: undefined;
};

export type AppStackParamList = {
  [AppRoutes.MAIN]: undefined;
  [AppRoutes.SETTINGS]: undefined;
};
