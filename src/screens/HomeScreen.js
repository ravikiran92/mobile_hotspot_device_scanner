import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { requestPermissions } from '../permissions/requestPermissions';
import { useDeviceIP } from '../hooks/useDeviceIP';
import { useConnectedDevices } from '../hooks/useConnectedDevices';
import ConnectedDeviceItem from '../components/ConnectedDeviceItem';
import LoadingIndicator from '../components/LoadingIndicator';
import { PERMISSION_DENIED } from '../utils/constants';

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const { deviceIP, error: ipError } = useDeviceIP();
  const { connectedDevices, loading, error, fetchConnectedDevices } = useConnectedDevices();

  // Refresh connected devices every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchConnectedDevices();
    }, 10000); 

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchConnectedDevices]);

  // Request permissions when the app loads
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        await requestPermissions();
        setHasPermission(true);
      } catch (error) {
        console.error(error);
        setHasPermission(false);
      }
    };

    checkPermissions();
  }, []);

  // Manual refresh handler
  const handleManualRefresh = () => {
    fetchConnectedDevices();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mobile Hotspot Device Scanner</Text>
      
      {ipError ? (
        <Text style={styles.errorText}>{ipError}</Text>
      ) : (
        <Text>Device IP: {deviceIP}</Text>
      )}

      {hasPermission ? (
        <>
          <Button title="Scan for Connected Devices" onPress={handleManualRefresh} />
          {loading && <LoadingIndicator />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          <FlatList
            data={connectedDevices}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ConnectedDeviceItem device={item} />}
          />
        </>
      ) : (
        <Text style={styles.errorText}>{PERMISSION_DENIED}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default HomeScreen;
