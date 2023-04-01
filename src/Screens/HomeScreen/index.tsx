import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet} from 'react-native';

const HomeScreen = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default HomeScreen;
