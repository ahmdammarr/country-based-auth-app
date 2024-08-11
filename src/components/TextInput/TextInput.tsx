import React, {FC} from 'react';
import {TextInput, View} from 'react-native';

import createStyles from './TextInput.style';
import {TextInputPropsT} from './TextInput.type';

import useStyles from '@/hooks/useStyles';

export const ThemedTextInput: FC<TextInputPropsT> = ({
  placeholder,
  isDisabled = false,
  style,
  containerStyle,
  ...props
}) => {
  const {styles} = useStyles(createStyles);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        editable={!isDisabled}
        placeholder={placeholder}
        style={[styles.input, isDisabled && styles.disabledInput, style]}
      />
    </View>
  );
};
