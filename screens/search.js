import React from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';

import { API_KEY } from '../utils/WeatherAPIKey';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      lugar: '',
      temperature: 0,
      weatherCondition: 0,
      city: '',
      maxTemperature: 0,
      minTemperature: 0,
      humidity: 0,
      showAlert: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  fetchWeather() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.lugar}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        try {
          this.setState({
            temperature: json.main.temp,
            weatherCondition: json.weather[0].main,
            city: json.name,
            maxTemperature: json.main.temp_max,
            minTemperature: json.main.temp_min,
            humidity: json.main.humidity,
          });
        } catch (e) {
          this.showAlert();
        }

      })
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const { showAlert } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', padding: 64 }}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
            <MaterialCommunityIcons
              size={30}
              name={'chevron-left'}
              color={'#000'}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val) => this.updateInputVal(val, 'lugar')}
            onSubmitEditing={this.fetchWeather.bind(this)}
          />
        </View>

        {this.state.city == '' ? (<Text></Text>
        ) : (<TouchableOpacity style={styles.cityBox} onPress={() => {
          this.props.navigation.navigate('Weather', { cidade: this.state.city, temperatura: this.state.temperature, condicaoTempo: this.state.weatherCondition, maxTemp: this.state.maxTemperature, minTemp: this.state.minTemperature, humidade: this.state.humidity })
        }
        }>
          <Text style={styles.cityText}> {this.state.city}</Text>
          <Text style={styles.temperatureText}> {this.state.temperature}°C</Text>
        </TouchableOpacity>)
        }

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Cidade não encontrada!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="Procurar por outra cidade"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#e5e5e5',
    width: windowWidth - 96,
    height: windowHeight / 11,
    borderRadius: 50,
    padding: 24,
    marginHorizontal: 12,
  },
  cityBox: {
    margin: 32,
    width: windowWidth - 64,
    backgroundColor: '#e5e5e5',
    borderRadius: 50,
    padding: 32,
  },
  temperatureText: {
    fontSize: 40,
  },
  cityText: {
    fontSize: 20,
  }
});

export default Search
