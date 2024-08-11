import {useMemo} from 'react';

import useScale from './useScale';
import {useTheme} from './useTheme';

import {CreateStylesPropsT} from '@/types/styles.type';

const useStyles = <T>(createStyles: (props: CreateStylesPropsT) => T) => {
  const {scale} = useScale();
  const {theme, changeTheme} = useTheme();

  const styles = useMemo(
    () =>
      createStyles({
        scale,
        theme,
      }),
    [createStyles, scale, theme],
  );

  return {
    scale,
    theme,
    changeTheme,
    styles,
  };
};

export default useStyles;
