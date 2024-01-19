// WeatherApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CloudDiagram = () => {
  return (
    <div className="cloud-diagram">
      {/* Your cloud diagram SVG or image goes here */}
    
    </div>
  );
};

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=145b2f15c8f2e85cc3a133e518735390&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData('DEFAULT_CITY'); // Set a default city

  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    setWeatherData(null); // Clear previous data
    fetchData(city);
  };

  return (
    <div className="wrapper">
      <CloudDiagram />

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weatherData && (
        <div className="weather-container">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          {/* Display other weather information here */}
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Rain: {weatherData.rain ? `${weatherData.rain['1h']} mm` : 'N/A'}</p>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
