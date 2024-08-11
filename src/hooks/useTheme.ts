import {useMemo} from 'react';

import {themes} from '@/themes';

import {ThemesT} from '@/types/styles.type';
import {useCountry} from './useCountry';

export const useTheme = () => {
  const {country: appTheme, setCountry, isLoading} = useCountry();

  const theme = useMemo(
    () => themes[appTheme as keyof typeof themes],
    [appTheme],
  );

  const changeTheme = async (selectedTheme: ThemesT) => {
    setCountry(selectedTheme);
  };

  return {theme, changeTheme, isLoading};
};
