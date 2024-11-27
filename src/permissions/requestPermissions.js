import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestPermissions = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result !== RESULTS.GRANTED) {
      throw new Error('Permission denied');
    }
  } catch (error) {
    throw new Error('Error requesting permissions');
  }
};
