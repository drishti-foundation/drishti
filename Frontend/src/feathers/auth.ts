import client from '.';

// Log in either using the given email/password or the token from storage
export const login = async (credentials?: Credentials): Promise<string | null> => {
  try {
    if (!credentials) {
      // Try to authenticate using an existing token
      const { user } = await client.reAuthenticate();
      return user.username;
    } else {
      // Otherwise log in with the `local` strategy using the credentials we got
      await client.authenticate({
        strategy: 'local',
        ...credentials,
      });
      return credentials.username;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// create account with otp
export const signup = async (credentials: Credentials, otp: string) => {
  try {
    await client.service('users').create(credentials, {
      query: { otp },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const logout = async () => {
  try {
    await client.logout();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
