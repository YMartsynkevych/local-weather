import React from "react";
import PropTypes from "prop-types";
import { Card } from 'semantic-ui-react'
const { useState,useEffect } = React;

const Location = ({ location, error }) => {
  const weatherProxyUrl ="https://weather-proxy.freecodecamp.rocks/"
  const [userData, setUserData] = useState({});

  const getCurrentLocalWeather = async (location) => {
    const url = weatherProxyUrl+'api/current?lon='+location.longitude+'&lat='+location.latitude
    console.log(url)
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData)
    setUserData(jsonData);
  };
  useEffect(() => {
    getCurrentLocalWeather(location)
  }, [location]);
  return (
    <div>
      {(typeof userData.main !== 'undefined')  ? (
          <Card>
            <Card.Content>
              <Card.Header className="header">City Name: {userData.name}</Card.Header>
              <p>Temprature: {userData.main.temp} &deg;C</p>
              <p>Sunrise: {new Date(userData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
              <p>Sunset: {new Date(userData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
              <p>Description: {userData.weather[0].main}</p>
              <p>Humidity: {userData.main.humidity} %</p>
            </Card.Content>
          </Card>
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
