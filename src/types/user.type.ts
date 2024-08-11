export interface User {
  name: string;
  email: string;
}

export interface SignupResponse {
  accessToken: string;
}

export interface UserDetails {
  details: {
    accountNumber: string;
    balance: number;
  };
}
