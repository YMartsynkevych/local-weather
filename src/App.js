import React, { useEffect, useState } from "react";
import './components/styles.css';
import useWatchLocation from "./hooks/useWatchLocation";
import { geolocationOptions } from "./constants/geolocationOptions";
import Location from "./components/Location";

function App() {
  const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);

  return (
     <div className="main">
    {/*//   <Location location={location} error={error} />*/}
    {/*// </div>*/}

    {(typeof location !== 'undefined') ? (
        <Location location={location} error={error} />
    ): (
        <div></div>
    )}
</div>
);
}

export default App;
