import {CountryeContext} from '@/providers/CountryProvider';
import {useContext} from 'react';

export const useCountry = () => {
  const {country, setCountry, isLoading, changeReagionAsync} =
    useContext(CountryeContext);
  return {country, setCountry, isLoading, changeReagionAsync};
};
