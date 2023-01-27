import { useEffect, useState } from 'react';
import './App.css';

import { RouteSelector } from "./components/RouteSelector";
import { RouteDirectionInput } from "./components/RouteDirectionInput";
import { StopSelector } from "./components/StopSelector";
import { DepartureTimes } from './components/DepartureTimes';

function App() {
  const [route, setRoute] = useState(null);
  const [directions, setDirections] = useState([]);
  const [stop, setStop] = useState(null);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    setStop(null);
  }, [route]);

  const setSelectedRoute = (event) => {
    setRoute(event.name);
    setDirections(event.directions);
  };

  const setSelectedStop = (event) => {
    setStop(event);
  }

  const setSelectedDirection = (event) => {
    setDirection(event);
  }

  return (
    <div className="app-container">
      <header>
        MBTA Train Schedule
      </header>

      <div className="container">
        <RouteSelector updateRoute={setSelectedRoute} />
        {
          route && 
          <StopSelector
            route={route}
            updateStop={setSelectedStop}
          />
        }
        {
          stop && 
          directions && 
          <RouteDirectionInput 
            directions={directions}
            updateDirection={setSelectedDirection}  
          />
        }
        {
          route &&
          direction &&
          stop &&
          <DepartureTimes 
            route={route}
            stop={stop}
            direction={direction}
          />
        }
      </div>
    </div>
  );
}

export default App;
