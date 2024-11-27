import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConnectedDeviceItem = ({ device }) => {
  return (
    <View style={styles.deviceItem}>
      <Text>Device IP (SSID): {device.ip}</Text>
      <Text>Device MAC (BSSID): {device.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default ConnectedDeviceItem;
