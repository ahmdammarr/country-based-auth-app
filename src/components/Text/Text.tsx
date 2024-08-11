import React, {FC, useMemo} from 'react';
import {Text} from 'react-native';

import createStyles from './Text.style';
import {TextPropsT} from './Text.type';

import useStyles from '@/hooks/useStyles';

const ThemedText: FC<TextPropsT> = ({
  children,
  style,
  size = 'text14',
  fontWeight = 'regular',
  textAlign,
  textTransform,
  isDanger = false,
  ...props
}) => {
  const {styles} = useStyles(createStyles);

  const fontStyle = useMemo(() => styles[fontWeight], [styles, fontWeight]);
  const sizeStyle = useMemo(() => styles[size], [styles, size]);
  const dangerStyle = useMemo(
    () => (isDanger ? styles.danger : {}),
    [styles, isDanger],
  );
  return (
    <Text
      {...props}
      style={[
        styles.base,
        fontStyle,
        sizeStyle,
        dangerStyle,
        {
          textAlign,
          textTransform,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default ThemedText;
