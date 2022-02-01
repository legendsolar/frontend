import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
const openWeatherApiKey = "8891a27f5e9762cd6d64fd19264db5d6";

function loadWeatherPromise(apiKey, lat, long) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
    console.log(url);
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        });
}

function Weather(props) {
    const [weatherObj, setWeatherObj] = useState({});

    useEffect(() => {
        loadWeatherPromise(openWeatherApiKey, 40.712778, -74.006111).then(
            (response) => {
                console.log("not sure");
                console.log(response);
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
                p: 2,
                "& .MuiTextField-root": { m: 1 },
            }}
        >
            <Typography variant="dashboardHeader" gutterBottom>
                New York, NY
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Weather
            </Typography>

            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                {description}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Temperature
            </Typography>

            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                {temp} F
            </Typography>
        </Paper>
    );
}
export default Weather;
