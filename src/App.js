import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [nextWeatherData, setNextWeatherData] = useState(null);

  const [error, setError] = useState(false);

  const apiKey = "0c0610d7593923374fcbd2bdb3babb71";
  const apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";
  const apiUrlNext = "https://api.openweathermap.org/data/2.5/forecast";

  const getWeatherData = async () => {
    try {
      const response = await axios.get(apiUrlCurrent, {
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

  const getNextWeatherData = async () => {
    try {
      const response = await axios.get(apiUrlNext, {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
          cnt: "40",
        },
      });
      setNextWeatherData(response.data);
      console.log(response);
      // const date1 = nextWeatherData.list[16].dt;
      // console.log(date1);
      setError(false);
    } catch (error) {
      setError(true);
      setNextWeatherData(null);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeatherData();
    getNextWeatherData();
  };
  const date = new Date();

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
              <div className="cityName">
                <h2 className="city">{weatherData.name}</h2>
                <div
                  style={{
                    background: `url(
                    "https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"
                  ) center no-repeat`,
                    width: "70px",
                    height: "70px",
                  }}
                ></div>
              </div>
              <p className="name-descr">
                Temperature :{" "}
                <span className="descr">{weatherData.main.temp}°C</span>
              </p>
              <p className="name-descr">
                Feels like :{" "}
                <span className="descr">{weatherData.main.feels_like}°C</span>
              </p>
              <p className="name-descr">
                Description :{" "}
                <span className="descr">
                  {weatherData.weather[0].description}
                </span>
              </p>
              <p className="name-descr">
                Humidity :{" "}
                <span className="descr">{weatherData.main.humidity}%</span>
              </p>
            </div>
          )}
          {nextWeatherData && (
            <div>
              <div className="next-box">
                <div className="next-day-box">
                  <div className="next-day">
                    {nextWeatherData.list[8].dt_txt.slice(8, 10)}-
                    {nextWeatherData.list[8].dt_txt.slice(5, 7)} <br />
                    {nextWeatherData.list[8].dt_txt.slice(0, 4)}
                  </div>
                  <p className="name-descr">
                    {nextWeatherData.list[8].main.temp}°C
                  </p>{" "}
                  <div
                    style={{
                      background: `url(
                    "https://openweathermap.org/img/wn/${nextWeatherData.list[8].weather[0].icon}@2x.png"
                  ) center no-repeat`,
                      width: "70px",
                      height: "70px",
                    }}
                  ></div>
                </div>
                <div className="next-day-box">
                  <div className="next-day">
                    {nextWeatherData.list[16].dt_txt.slice(8, 10)}-
                    {nextWeatherData.list[16].dt_txt.slice(5, 7)} <br />
                    {nextWeatherData.list[16].dt_txt.slice(0, 4)}
                  </div>
                  <p className="name-descr">
                    {nextWeatherData.list[16].main.temp}°C
                  </p>
                  <div
                    style={{
                      background: `url(
                    "https://openweathermap.org/img/wn/${nextWeatherData.list[16].weather[0].icon}@2x.png"
                  ) center no-repeat`,
                      width: "70px",
                      height: "70px",
                    }}
                  ></div>
                </div>
                <div className="next-day-box">
                  <div className="next-day">
                    {nextWeatherData.list[24].dt_txt.slice(8, 10)}-
                    {nextWeatherData.list[24].dt_txt.slice(5, 7)} <br />
                    {nextWeatherData.list[24].dt_txt.slice(0, 4)}
                  </div>
                  <p className="name-descr">
                    {nextWeatherData.list[24].main.temp}°C
                  </p>
                  <div
                    style={{
                      background: `url(
                    "https://openweathermap.org/img/wn/${nextWeatherData.list[24].weather[0].icon}@2x.png"
                  ) center no-repeat`,
                      width: "70px",
                      height: "70px",
                    }}
                  ></div>
                </div>
                <div className="next-day-box">
                  <div className="next-day">
                    {nextWeatherData.list[32].dt_txt.slice(8, 10)}-
                    {nextWeatherData.list[32].dt_txt.slice(5, 7)} <br />
                    {nextWeatherData.list[32].dt_txt.slice(0, 4)}
                  </div>
                  <p className="name-descr">
                    {nextWeatherData.list[32].main.temp}°C
                  </p>
                  <div
                    style={{
                      background: `url(
                    "https://openweathermap.org/img/wn/${nextWeatherData.list[32].weather[0].icon}@2x.png"
                  ) center no-repeat`,
                      width: "70px",
                      height: "70px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div>
              <h2 className="error">Please, enter the correct city name</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
