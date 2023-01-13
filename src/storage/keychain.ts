import * as Keychain from 'react-native-keychain';

export const storeKeychainData = async (
  username: string,
  accessToken: string,
) => {
  try {
    await Keychain.setGenericPassword(username, accessToken);
  } catch (error) {
    console.log('Keychain could not be accessed', error);
  }
};

export const resetKeychainData = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.log('Keychain could not be accessed', error);
  }
};
