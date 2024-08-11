import {TouchableOpacityProps} from 'react-native';

export type ButtonColorT = 'primary' | 'white' | 'transparent';

export interface ButtonPropsT extends TouchableOpacityProps {
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: 'large' | 'medium' | 'small';
  color?: ButtonColorT;
}

export type ButtonColorsT = ButtonColorT;
