import {AuthContext} from '@/providers/AuthProvider';

import {useContext} from 'react';

export const useAuth = () => {
  const {isAuthonticated, isLoading, setIsAuthonticated} =
    useContext(AuthContext);
  return {isAuthonticated, isLoading, setIsAuthonticated};
};
