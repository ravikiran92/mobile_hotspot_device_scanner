import { useState, useCallback } from 'react';
import WifiManager from 'react-native-wifi-reborn';
import { ERROR_FETCHING_DEVICES } from '../utils/constants';

export const useConnectedDevices = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchConnectedDevices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const wifiList = await WifiManager.loadWifiList();
      const devices = wifiList.map(device => ({
        id: device.BSSID,
        ip: device.SSID,
      }));
      setConnectedDevices(devices);
    } catch (error) {
      setError(ERROR_FETCHING_DEVICES);
      console.error(ERROR_FETCHING_DEVICES, error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { connectedDevices, loading, error, fetchConnectedDevices };
};
