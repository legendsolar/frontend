import Weather from 'components/weather/weather';
import {useState, useEffect} from 'react';

const openWeatherApiKey = '8891a27f5e9762cd6d64fd19264db5d6';

function loadWeatherPromise(apiKey, lat, long) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
    console.log(url);
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
}

const WeatherLive = (props) => {
    const [weatherObj, setWeatherObj] = useState({});

    useEffect(() => {
        loadWeatherPromise(openWeatherApiKey, 40.712778, -74.006111).then(
            (response) => {
                setWeatherObj(response);
            },
        );
    }, []);

    var description = 'error loading weather';
    var temp = '-';
    var code = 0;
    if (weatherObj.weather) {
        description = weatherObj.weather[0].description;
        temp = weatherObj.main.temp.toFixed(0);
        code = weatherObj.weather[0].id;
    }

    return <Weather temp={temp} state={description} code={code}></Weather>;
};

export default WeatherLive;
