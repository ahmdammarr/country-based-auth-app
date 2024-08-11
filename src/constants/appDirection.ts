import {I18nManager} from 'react-native';

export enum DirectionT {
  RTL = 'rtl',
  LTR = 'ltr',
}

export const APP_DIRECTION = I18nManager.isRTL
  ? DirectionT.RTL
  : DirectionT.LTR;
