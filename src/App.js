import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const apiKey = "0c0610d7593923374fcbd2bdb3babb71";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const getWeatherData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      });
      setWeatherData(response.data);
      setError(false);
    } catch (error) {
      setError(true);
      setWeatherData(null);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeatherData();
  };

  return (
    <div className="fon">
      <div className="blur">
        <div className="box">
          <h1 className="header">Weather in your city</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={handleCityChange}
            />
            <button className="button" type="submit">
              Get Weather
            </button>
          </form>

          {weatherData && (
            <div>
              <h2>{weatherData.name}</h2>
              <p>Temperature : {weatherData.main.temp}°C</p>
              <p>Description : {weatherData.weather[0].description}</p>
            </div>
          )}
          {error && (
            <div>
              <h2>Please, enter the correct city name</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
