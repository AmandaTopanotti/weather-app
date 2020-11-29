import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from '../components/Weather';

import { API_KEY } from '../utils/WeatherAPIKey';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      temperature: 0,
      weatherCondition: null,
      city: null,
      error: null,
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus',
      () => this.verifyCity());
  }

  componentWillUnmount() {
    this.focusListener();
  }

  verifyCity() {
    try {
      this.setState({
        city: this.props.route.params.cidade,
        temperature: this.props.route.params.temperatura,
        weatherCondition: this.props.route.params.condicaoTempo,
        maxTemperature: this.props.route.params.maxTemp,
        minTemperature: this.props.route.params.minTemp,
        humidity: this.props.route.params.humidade,
      });

    } catch (e) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        error => {
          this.setState({
            error: 'Erro ao tentar pegar as condições de clima'
          });
        }
      );
    }

  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          city: json.name,
          maxTemperature: json.main.temp_max,
          minTemperature: json.main.temp_min,
          humidity: json.main.humidity,
          isLoading: false
        });
      })
  }

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text></Text>
        ) : (
            <Weather weather={this.state.weatherCondition} temperature={this.state.temperature} city={this.state.city} maxTemperature={this.state.maxTemperature} minTemperature={this.state.minTemperature} humidity={this.state.humidity} />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }
});