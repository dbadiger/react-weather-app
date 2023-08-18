import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../../images/search.png";
import cloud_sun from "../../images/clouds-and-sun.png";
import cloudy from "../../images/cloudy.png";
import heavy_rain from "../../images/heavy-rain.png";
import snow from "../../images/snow.png";
import drizzel from "../../images/drizzel.png";
import sun from "../../images/sun.png";
import wind from "../../images/wind.png";
import humidity from "../../images/humidity.png";

const WeatherApp = () => {
  let api_key = "fd5893c09e1750330e8d55e630eedf37";

  const [wicon, setWicon] = useState(cloud_sun);

  const search = async () => {
    let element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    const location = document.getElementsByClassName("weather-loc");
    const humidity = document.getElementsByClassName("humidity-value");
    const wind = document.getElementsByClassName("wind-value");
    const temprature = document.getElementsByClassName("weather-temp");

    location[0].innerHTML = response.name;
    temprature[0].innerHTML = Math.floor(response.main.temp) + "°C";
    humidity[0].innerHTML = response.main.humidity + "%";
    wind[0].innerHTML = Math.floor(response.wind.speed) + "m/s";

    if (
      response.weather[0].icon === "01d" ||
      response.weather[0].icon === "01n"
    ) {
      setWicon(sun);
    } else if (
      response.weather[0].icon === "02d" ||
      response.weather[0].icon === "02n"
    ) {
      setWicon(cloudy);
    } else if (
      response.weather[0].icon === "03d" ||
      response.weather[0].icon === "03n" ||
      response.weather[0].icon === "04d" ||
      response.weather[0].icon === "04n"
    ) {
      setWicon(drizzel);
    } else if (
      response.weather[0].icon === "09d" ||
      response.weather[0].icon === "09n" ||
      response.weather[0].icon === "10d" ||
      response.weather[0].icon === "10n"
    ) {
      setWicon(heavy_rain);
    } else if (
      response.weather[0].icon === "13d" ||
      response.weather[0].icon === "13n"
    ) {
      setWicon(snow);
    } else {
      setWicon(cloud_sun);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          id="city"
          placeholder="Enter City Name"
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="search-icon" />
        </div>
      </div>
      <div className="weather-img">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-loc">Dharwad</div>

      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity-value">40%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind} alt="" />
          <div className="data">
            <div className="wind-value">40km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherApp;
