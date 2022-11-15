import { Weather } from "./weather";
import { useState, useEffect } from "react";

const openWeatherApiKey = "8891a27f5e9762cd6d64fd19264db5d6";

function loadWeatherPromise(apiKey, lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

export const WeatherLive = ({ lat, lng }) => {
  const [weatherObj, setWeatherObj] = useState<any>({});

  useEffect(() => {
    loadWeatherPromise(openWeatherApiKey, lat, lng).then((response) => {
      setWeatherObj(response);
    });
  }, []);

  var description = "error loading weather";
  var temp = "-";
  var code = 0;
  if (weatherObj?.weather) {
    description = weatherObj.weather[0].description;
    temp = weatherObj.main.temp.toFixed(0);
    code = weatherObj.weather[0].id;
  }

  return <Weather temp={temp} state={description} code={code}></Weather>;
};
