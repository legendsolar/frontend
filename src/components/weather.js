import { Paper, Typography, Stack } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import PropTypes from "prop-types";
import CloudyLottieJson from "../assets/weather_icons/cloudy/data.json";
import SunnyLottieJson from "../assets/weather_icons/sunny/data.json";
import RainLottieJson from "../assets/weather_icons/rain/data.json";
import RainShowerLottieJson from "../assets/weather_icons/rain_shower/data.json";
import HalfMoonLottieJson from "../assets/weather_icons/half_moon/data.json";
import SnowLottieJson from "../assets/weather_icons/snowfall/data.json";
import StarryNightJson from "../assets/weather_icons/starry_night/data.json";
import FogJson from "../assets/weather_icons/foggy/data.json";

const codeConverter = (code) => {
    const regex = {
        thunderstorm: { test: code < 233, data: RainLottieJson },
        rain: {
            test: code < 532,
            data: RainShowerLottieJson,
        },
        snow: {
            test: code < 700,
            data: SnowLottieJson,
        },
        fog: {
            test: code < 800,
            data: FogJson,
        },
        clear: {
            test: code == 800,
            data: SunnyLottieJson,
        },
        cloudy: {
            test: code > 800,
            data: CloudyLottieJson,
        },
    };

    for (const [k, v] of Object.entries(regex)) {
        if (v.test) {
            return v.data;
        }
    }

    return StarryNightJson;
};

const Weather = ({ temp, state, code }) => {
    const lottieJson = codeConverter(code);

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
                <Typography variant="headline1">{temp}&deg;</Typography>
            </Stack>

            <Player
                autoplay
                loop
                src={lottieJson}
                style={{ height: "200px", width: "200px" }}
            ></Player>

            <Typography
                variant="body1"
                align="right"
                style={{ textTransform: "capitalize" }}
            >
                {state}
            </Typography>
        </Paper>
    );
};

Weather.propTypes = {
    temp: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
};
export default Weather;
