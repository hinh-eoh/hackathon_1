import React, {useCallback, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {TextInput, View} from 'react-native';

import styles from './indexStyles';

const HomeScreen = () => {
  const [value, setValue] = useState('');

  // eslint-disable-next-line no-shadow
  const onChangeText = value => setValue(value);

  return (
    <View style={styles.wrap}>
      <View style={styles.wrapSearch}>
        <TextInput
          style={styles.search}
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      />
    </View>
  );
};

export default HomeScreen;
