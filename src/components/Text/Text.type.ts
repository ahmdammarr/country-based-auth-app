import {TextProps, TextStyle} from 'react-native';

export type TextSizeT =
  | 'text74'
  | 'text50'
  | 'text36'
  | 'text26'
  | 'text16'
  | 'text14'
  | 'text12'
  | 'text10';

export type TextWeightT = 'regular' | 'medium' | 'bold';

export interface TextPropsT extends TextProps {
  size?: TextSizeT;
  fontWeight?: TextWeightT;
  textAlign?: TextStyle['textAlign'];
  textTransform?: TextStyle['textTransform'];
  isDanger?: boolean;
}
