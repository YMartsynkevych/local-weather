import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import styled from "styled-components";
const { useState,useEffect } = React;

const Location = ({ location, error }) => {
  const weatherProxyUrl ="https://weather-proxy.freecodecamp.rocks/"
  const [weatherData, setWeatherData] = useState({});
  const WeatherIcon = styled.div`
  color: whitesmoke;
`;
  const getCurrentLocalWeather = async (location) => {
    const url = weatherProxyUrl+'api/current?lon='+location.longitude+'&lat='+location.latitude

    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData)
    setWeatherData(jsonData);
  };

  useEffect(() => {
    getCurrentLocalWeather(location)
  }, [location]);
  return (
    <div>
      {(typeof weatherData.main !== 'undefined')  ? (
        <div>
          <div className="top">
            <div className="header">
                <p>{weatherData.name}</p>
            </div>
          </div>
          <div className="flex">
            <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
            <div className="flex">
              <WeatherIcon style={{fontSize:30,marginTop:15}}>{weatherData.weather[0].main}</WeatherIcon>
            </div>
          </div>
            <div className="flex">
              <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
              <p className="temp">Humidity: {weatherData.main.humidity} %</p>
            </div>

            <div className="flex">
              <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
              <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>


        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p className="errorMessage">Location Error: {error}</p>}
    </div>
  );
};

Location.propTypes = {
  location: PropTypes.object,
  error: PropTypes.string,
};

export default Location;
