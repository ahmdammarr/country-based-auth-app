import * as Keychain from 'react-native-keychain';
import {Errors} from '@/types/error.type';

export const getCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
  } catch (error) {
    return undefined;
  }
  await Keychain.resetGenericPassword();
};

export const setCredentials = async (token: string) => {
  try {
    await Keychain.setGenericPassword('user', token);
  } catch {
    return Errors.SET_SECRE_STORE;
  }
};

export const resetCredentials = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch {
    return Errors.SET_SECRE_STORE;
  }
};
