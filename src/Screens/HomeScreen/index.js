import React, {useCallback, useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

const {width} = Dimensions.get('window');

import styles from './indexStyles';
import {convertToSlug} from '../../Utils/Utils';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import Device from '../../Config/Device';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

const markers = [
  {
    id: 1,
    title: 'title1',
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 2,
    title: 'title2',
    coordinate: {
      latitude: 37.71825,
      longitude: -122.4124,
    },
  },
  {
    id: 3,
    title: 'title3',
    coordinate: {
      latitude: 37.73825,
      longitude: -122.3324,
    },
  },
];

const renderItem = ({item, index}) => {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const textinputRef = useRef();
  const casualRef = useRef();
  const mapRef = useRef();

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.75825,
    longitude: -122.4324,
  });
  const [value, setValue] = useState('');
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const [results, setResults] = useState(markers);
  const [activeLocation, setActiveLocation] = useState({});

  // eslint-disable-next-line no-shadow
  const onSearch = value => {
    setValue(value);
    if (!value) {
      setResults(markers);
    }
    setResults(
      markers.filter(marker =>
        convertToSlug(marker.title).includes(convertToSlug(value)),
      ),
    );
  };

  const onSnapToItem = index => {
    setActiveLocation(results[index]);
    mapRef.current.animateToRegion(results[index].coordinate, 1000);
  };

  const getCurrentLcation = useCallback(async () => {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (result !== RESULTS.GRANTED) {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(res => {
        console.log('kkkkk2', res);
        Geolocation.getCurrentPosition(
          position => {
            console.log({position});
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            setCurrentLocation({
              latitude: 37.78825,
              longitude: -122.4324,
            });
            // See error code charts below.
            console.log('kkkk1', error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
    } else {
      Geolocation.getCurrentPosition(
        position => {
          console.log({position});
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          setCurrentLocation({
            latitude: 37.78825,
            longitude: -122.4324,
          });
          // See error code charts below.
          console.log('kkkk1', error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, []);

  const onDirectionReady = useCallback(result => {
    mapRef.current.fitToCoordinates(
      result.coordinates.concat(result.coordinates),
      {
        edgePadding: {
          right: 16 * (Device.isIOS ? 1 : Device.pixelRatio), //width / 5,
          bottom:
            (320 + getBottomSpace()) * (Device.isIOS ? 1 : Device.pixelRatio), //height,
          left: 16 * (Device.isIOS ? 1 : Device.pixelRatio), //width / 5,
          top:
            (getStatusBarHeight(true) + 80) *
            (Device.isIOS ? 1 : Device.pixelRatio), //height / 2,
        },
        animated: true,
      },
    );
  }, []);

  useEffect(() => {
    getCurrentLcation();
  }, [getCurrentLcation]);

  return (
    <View style={styles.wrap}>
      <View style={styles.wrapSearch}>
        <TextInput
          ref={textinputRef}
          style={styles.search}
          value={value}
          onChangeText={onSearch}
          onFocus={() => setIsShowSuggestions(true)}
          onBlur={() => setIsShowSuggestions(false)}
        />
        {isShowSuggestions && (
          <View style={styles.wrapSuggestion}>
            {results.map(item => (
              <TouchableOpacity
                style={styles.itemSuggestion}
                onPress={() => {
                  setActiveLocation(item);
                  console.log(item.title);
                  setValue(item.title);
                  mapRef.current.animateToRegion(item.coordinate, 1000);
                  textinputRef.current.blur();
                }}>
                <Text id={item.id.toString()} style={styles.textItemSuggestion}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <MapViewDirections
          origin={currentLocation}
          destination={activeLocation.coordinate}
          apikey={'AIzaSyCF1Q-WFXCnfAHhOeXRF9WK7eT-TtxO9ss'}
          strokeWidth={5}
          strokeColor={'#00979D'}
          onReady={onDirectionReady}
        />
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}
        <Marker coordinate={currentLocation} title={'Current Location'} />
      </MapView>
      <View style={styles.wrapCarousel}>
        <Carousel
          ref={casualRef}
          data={results}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width - 100}
          onSnapToItem={onSnapToItem}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
