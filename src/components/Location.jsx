// @flow
import * as React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const { useState, useEffect } = React;

const WeatherIcon = styled.div`
  color: whitesmoke;
`;
type Props = {
  location: { latitude:number,
    longitude:number},
  error: String
};

const Location = (props: Props):React.Node => {
  const weatherProxyUrl = 'https://weather-proxy.freecodecamp.rocks/';
  const [weatherData, setWeatherData] = useState({});
  const [isCelcius, setIsCelcius] = useState(true);
  const { error } = props;
  const getCurrentLocalWeather = async () => {
    const url = `${weatherProxyUrl}api/current?lon=${props.location.longitude}&lat=${props.location.latitude}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setWeatherData(jsonData);
  };

  const setCorrectTemp = () => {
    setIsCelcius(!isCelcius);
  };

  useEffect(() => {
    getCurrentLocalWeather(props.location);
  }, [props.location]);
  return (
    <div>
      {(typeof weatherData.main !== 'undefined') ? (
        <div>
          <div className="top">
            <div className="header">
              <p>{weatherData.name}</p>
            </div>
            <button id="celcius" type="submit" color="red" onClick={setCorrectTemp}>
              Celcius/Fahrenheit
            </button>
          </div>
          <div className="flex">
            <p className="day">
              {moment().format('dddd')}
              ,
              {' '}
              <span>{moment().format('LL')}</span>
            </p>
            <div className="flex">
              <WeatherIcon style={{ fontSize: 30, marginTop: 15 }}>
                {weatherData.weather[0].main}
              </WeatherIcon>
            </div>
          </div>
          <div className="flex">
            <p className="temp">
              Temprature:
              {isCelcius ? weatherData.main.temp : (weatherData.main.temp * 9) / 5 + 32}
              {' '}
              &deg;C
            </p>
            <p className="temp">
              Humidity:
              {weatherData.main.humidity}
              {' '}
              %
            </p>
          </div>

          <div className="flex">
            <p className="sunrise-sunset">
              Sunrise:
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}
            </p>
            <p className="sunrise-sunset">
              Sunset:
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}
            </p>
          </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && (
      <p className="errorMessage">
        Location Error:
        {error}
      </p>
      )}
    </div>
  );
};

export default Location;
