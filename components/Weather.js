import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';
import { useNavigation } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Weather = ({ weather, temperature, city, maxTemperature, minTemperature, humidity }) => {
  const navigation = useNavigation()

  return (
    <SafeAreaView
    >
      <Image
        style={styles.img}
        source={weatherConditions[weather].uri}
        blurRadius={0.5}
      />

      <View style={styles.weatherContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Search') }}>
          <MaterialCommunityIcons
            size={30}
            name={'magnify'}
            color={'#fff'}
          />
        </TouchableOpacity>

        <View style={styles.headerContainer}>

          <View style={styles.temperatureContainer}>
            <Text style={styles.cityText}>{city}</Text>
          </View>

          <MaterialCommunityIcons
            size={150}
            name={weatherConditions[weather].icon}
            style={styles.lupa}
            color={'#fff'}
          />

          <View style={styles.temperatureContainer}>
            <Text style={styles.tempText}>{temperature}˚C</Text>
            <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          </View>

          <View style={styles.bottomContainer}>
            <View style={{ margin: 10 }}>
              <Text style={[styles.title, { fontWeight: 'bold' }]}>Temperatura{'\n'}máxima</Text>
              <Text style={styles.title}>{maxTemperature}˚C</Text>
            </View>

            <View style={{ margin: 10 }}>
              <Text style={[styles.title, { fontWeight: 'bold' }]}>Temperatura{'\n'}mínima</Text>
              <Text style={styles.title}>{minTemperature}˚C</Text>
            </View>

            <View style={{ justifyContent: 'space-between', margin: 10 }}>
              <Text style={[styles.title, { fontWeight: 'bold' }]}>Humidade</Text>
              <Text style={styles.title}>{humidity}%</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
  city: PropTypes.string,
};

const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    height: windowHeight + 64,
    resizeMode: 'cover',
  },
  lupa: {
    padding: 16,
  },
  weatherContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    padding: 32,
    position: 'absolute',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  tempText: {
    fontSize: 50,
    color: '#fff',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    elevation: 5,

  },
  cityText: {
    fontFamily: 'notoserif',
    fontSize: 30,
    color: '#fff',
    elevation: 5,
  },
  temperatureContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
    elevation: 5,
  }
});

export default Weather;