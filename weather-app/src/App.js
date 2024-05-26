import React, {useState} from 'react';

function App() {

// const url ='https://api.openweathermap.org/data/2.5/weather?lat=5&lon=42&appid=401186890c82b3946e39382041a4e4a1'

  return (
    <div className="App">
	<div className="container">
	  <div className='top'>
	    <div className="location">
	      <p>Nairobi</p>
            </div>
          <div className="temp">
            <h1>19°C</h1>
            <div className="description">
              <p>Windy</p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>25°C</p>
          </div>
          <div className="humidity">
            <p>87%</p>
          </div>
          <div className="wind">
            <p>18 km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
