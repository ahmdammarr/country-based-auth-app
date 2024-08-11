import React, {FC, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';

import createStyles from './Button.style';
import {ButtonPropsT} from './Button.type';

import useStyles from '@/hooks/useStyles';
import ThemedText from '../Text/Text';
import {useTranslation} from 'react-i18next';

export const ThemedButton: FC<ButtonPropsT> = ({
  text,
  isDisabled = false,
  isLoading = false,
  size = 'large',
  style,
  ...props
}) => {
  const {styles} = useStyles(createStyles);

  const sizeStyle = useMemo(() => styles[size], [styles, size]);
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      {...props}
      disabled={isDisabled || isLoading}
      style={[
        styles.button,
        sizeStyle,
        style,
        (isDisabled || isLoading) && styles.disabled,
      ]}>
      {isLoading ? (
        <ThemedText fontWeight="regular" style={styles.text}>
          {t('loading')}
        </ThemedText>
      ) : (
        <>
          <ThemedText fontWeight="regular" style={styles.text}>
            {text}
          </ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
};
