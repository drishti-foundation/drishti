import React from 'react';

export interface AuthDetails {
  username: string | null;
  loggedIn: boolean;
  loading: boolean;
}

export interface AuthDetailsContext extends AuthDetails {
  set: (details: Partial<AuthDetails>) => void;
}

export const defaultAuth: AuthDetails = {
  username: null,
  loggedIn: false,
  loading: true,
};

const AuthContext = React.createContext<AuthDetailsContext>({
  ...defaultAuth,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set: () => {},
});

export default AuthContext;
