import {StyleProp, TextInputProps, ViewStyle} from 'react-native';

export interface TextInputPropsT extends TextInputProps {
  label?: string;
  error?: string;
  isDisabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
