import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
