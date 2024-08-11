import React, {createContext, useState, useEffect} from 'react';
import {getCredentials} from '@/config/secureStore';
import {Get} from '@/service/apiClient';
import {ENDPOINTS} from '@/service/enpoints';

type IAuthContext = {
  isAuthonticated: boolean;
  isLoading: boolean;
  setIsAuthonticated: (isAuthonticated: boolean) => void;
};

export const AuthContext = createContext<IAuthContext>({
  isAuthonticated: false,
  isLoading: true,
  setIsAuthonticated: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({children}: ThemeProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthonticated, setIsAuthonticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      setIsLoading(true);
      try {
        const token = await getCredentials();

        if (token) {
          const validatedToken = await Get<string>(ENDPOINTS.VALIDATE);
          if (validatedToken.status === 200) {
            setIsAuthonticated(true);
            setIsLoading(false);
          }
        }
      } catch {
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthonticated,
        isLoading,
        setIsAuthonticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
