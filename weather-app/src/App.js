import React, {useState} from 'react';
import axios from 'axios';

const API_KEY = '401186890c82b3946e39382041a4e4a1';

export default function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  
  const getCoordinates = async (location) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
    const response = await axios.get(geoUrl);
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon};
    } else {
      throw new Error("Location not found");
    }
  };

  const getWeatherData = async (lat, lon) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const response = await axios.get(weatherUrl);
    return response.data;
  };

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const { lat, lon } = await getCoordinates(location);
        const weatherData = await getWeatherData(lat, lon);
        setData(weatherData);
        console.log(weatherData);
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    }
  };

  return (
    <div className="App">
      <div className='search'>
        <input
        type="text"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'> 
        </input>
      </div>
      <div className="container">
        <div className='top'>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp - 273.15)}°C</h1> : null}
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{Math.round(data.main.feels_like - 273.15)}°C</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed} km/h</p> : null}
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
