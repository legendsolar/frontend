import { Paper, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import CloudyLottieJson from "../assets/weather_icons/cloudy/data.json";

const openWeatherApiKey = "8891a27f5e9762cd6d64fd19264db5d6";

function loadWeatherPromise(apiKey, lat, long) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
    console.log(url);
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
}

function Weather(props) {
    const [weatherObj, setWeatherObj] = useState({});

    useEffect(() => {
        loadWeatherPromise(openWeatherApiKey, 40.712778, -74.006111).then(
            (response) => {
                setWeatherObj(response);
            }
        );
    }, []);

    var description = "error loading weather";
    var temp = "error loading temperature";
    if (weatherObj.weather) {
        description = weatherObj.weather[0].description;
        temp = weatherObj.main.temp;
    }

    return (
        <Paper
            sx={{
                minWidth: 275,
                "& .MuiTextField-root": { m: 1 },
            }}
            variant="container"
        >
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="smallHeadline">Weather</Typography>
                <Typography variant="headline1">{"32"}&deg;</Typography>
            </Stack>

            <Player
                autoplay
                loop
                src={CloudyLottieJson}
                style={{ height: "200px", width: "200px" }}
            ></Player>

            <Typography variant="body1" align="right">
                Cloudy
            </Typography>
        </Paper>
    );
}
export default Weather;
