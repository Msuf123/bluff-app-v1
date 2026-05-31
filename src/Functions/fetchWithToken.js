import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';

export default async function fetchWithToken(url, objs, otherOps) {
  try {
    let obj = { ...objs };
    if (Platform.OS !== 'web') {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const tokenPresent = credentials.password;
        obj['Token'] = tokenPresent;
      } else {
      }
    }
    let response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Platform: Platform.OS,

        ...obj,
      },
      ...otherOps,
    });
    if (!response.ok) {
      throw new Error('Newtork request not okay');
    } else {
      return response;
    }
  } catch (e) {
    return null;
  }
}
