import React from 'react';
import './components/styles.css';
import useWatchLocation from './hooks/useWatchLocation';
import { geolocationOptions } from './constants/geolocationOptions';
import Location from './components/Location';

function App() {
  const { location, error } = useWatchLocation(geolocationOptions);

  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <div className="main">
      {(typeof location !== 'undefined') ? (
        <Location location={location} error={error} />
      ) : (
        <div />
      )}
    </div>
  );
}

export default App;
