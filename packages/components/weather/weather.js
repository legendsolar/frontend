import {Box, Paper, Typography, Stack} from '@mui/material';
import {Player} from '@lottiefiles/react-lottie-player';
import CloudyLottieJson from '../assets/weather_icons/cloudy/data.json';
import SunnyLottieJson from '../assets/weather_icons/sunny/data.json';
import RainLottieJson from '../assets/weather_icons/rain/data.json';
import RainShowerLottieJson from '../assets/weather_icons/rain_shower/data.json';
import SnowLottieJson from '../assets/weather_icons/snowfall/data.json';
import StarryNightJson from '../assets/weather_icons/starry_night/data.json';
import FogJson from '../assets/weather_icons/foggy/data.json';
import {Component} from '../basics/component';

export const codeConverter = (code) => {
    const regex = {
        thunderstorm: {test: code < 233, data: RainLottieJson},
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

export const Weather = ({temp, state, code}) => {
    const lottieJson = codeConverter(code);

    return (
        <Component shadow resize={true}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="smallHeadline">Weather</Typography>
                <Typography variant="headline1">{temp}&deg;</Typography>
            </Stack>

            <Player
                autoplay
                loop
                speed={0.45}
                src={lottieJson}
                style={{height: '200px', width: '200px'}}
            ></Player>

            <Typography
                variant="body1"
                align="right"
                style={{textTransform: 'capitalize'}}
            >
                {state}
            </Typography>
        </Component>
    );
};