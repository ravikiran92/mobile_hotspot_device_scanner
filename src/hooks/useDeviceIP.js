import { useState, useCallback, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { DEVICE_IP_ERROR } from '../utils/constants';

export const useDeviceIP = () => {
    const [deviceIP, setDeviceIP] = useState('');
    const [error, setError] = useState('');

    const fetchDeviceIP = useCallback(async () => {
        try {
            const ip = await DeviceInfo.getIpAddress();
            setDeviceIP(ip);
        } catch (error) {
            setError(DEVICE_IP_ERROR);
            console.error(DEVICE_IP_ERROR, error);
        }
    }, []);

    useEffect(() => {
        fetchDeviceIP();
    }, [fetchDeviceIP]);

    return { deviceIP, error };
};
