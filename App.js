import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {fetchWeather, fetchWeatherByPosition} from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';
import WeatherFlatList from './components/WeatherFlatList';

export default class App extends React.Component {
  state = {
    loading: false,
    error: false,
    errorMessage: 'Could not load weather, please try a different city.',
    location: '',
    list_weather: [],
  };

  componentDidMount() {
    // this.handleUpdateLocation('London');
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        // eslint-disable-line
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeatherListByPosition(lat, lon);
        },
        () => {
          this.setState({
            loading: false,
            error: true,
            errorMessage: 'Could not fetch weather for your location',
          });
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }
  };

  getWeatherListByPosition = async (lat, lon) => {
    this.setState({loading: true}, async () => {
      try {
        const {location, list_weather} = await fetchWeatherByPosition(lat, lon);
        this.setState({
          loading: false,
          error: false,
          location,
          list_weather,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({loading: true}, async () => {
      try {
        const {location, list_weather} = await fetchWeather(city);

        this.setState({
          loading: false,
          error: false,
          location,
          list_weather,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  render() {
    const {loading, error, location, list_weather, errorMessage} = this.state;
    const image_src =
      list_weather && typeof list_weather[0] != 'undefined'
        ? getImageForWeather(list_weather[0].weather[0].main)
        : getImageForWeather('Clear');

    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={image_src}
          style={styles.imageContainer}
          imageStyle={styles.image}>
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {errorMessage}
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {list_weather && typeof list_weather[0] != 'undefined'
                        ? list_weather[0].weather[0].main
                        : ''}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {list_weather && typeof list_weather[0] != 'undefined'
                        ? `${Math.round(list_weather[0].temp.day - 273.15)}°C`
                        : '0°C'}
                    </Text>
                    <View>
                      <WeatherFlatList
                        data={
                          list_weather && typeof list_weather[0] != 'undefined'
                            ? list_weather
                            : null
                        }
                      />
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: 'white',
    paddingHorizontal: 20,
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
