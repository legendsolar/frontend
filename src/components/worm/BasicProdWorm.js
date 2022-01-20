import { timeInterpolatedValues, simSolarOutput } from "./Utility";
import { easeInOutQuad } from "js-easing-functions";
import { addHours } from "date-fns";
import Paper from "@mui/material/Paper";
import { useObject } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { database } from "../../Firebase";
import ProductionWorm from "./ProductionWorm";

var tinycolor = require("tinycolor2");

const defaultChartDisplayParams = {
    timeAxisLabels: true,
    currentTimeDisplay: true,

    background: {
        dayRegionColor: tinycolor("rgb(243,243,243)"),
        nightRegionColor: tinycolor("rgb(255,255,255)"),
    },

    wormSunIcon: {
        dayColor: tinycolor("rgb(250,223,79)"),
        nightColor: tinycolor("rgb(33,30,32)"),
        gradientSteps: { 0: 1, 0.6: 1, 0.8: 0 },
        radius: 15,
    },

    worm: {
        dayColor: tinycolor("#30A462"),
        nightColor: tinycolor("rgb(33,30,32)"),
        nightThreshold_W: 2000,
        width: 4.3,
    },

    dayNightIcons: {
        rightMargin: 20,
        iconSpacing: 8 + 8.5,
        dayIconColor: tinycolor("rgb(255,255,255)"),
        nightIconColor: tinycolor("rgb(243,243,243)"),
        dayIconRadius: 8.5,
        nightIconRadius: 8.5,
    },

    animation: {
        time_s: 2.5,
        steps: 50,
        lengthHours: 10,
        // look at https://easings.net/ for examples
        easingFunction: easeInOutQuad,
        reset: (func) => {
            window.customFunction = func;
        },
    },

    data: {
        totalHours: 64,
        max_W: 10000,
        timeIdxCount: 100,
    },

    gauge: {
        display: true,
    },
};

const time_ms = timeInterpolatedValues(
    addHours(Date.now(), -64).getTime(),
    Date.now(),
    200
);
const chartData = Array.from(Array(time_ms.length), (x, i) => {
    return simSolarOutput(time_ms[i], defaultChartDisplayParams.data.max_W);
});

function BasicProdWorm(props) {
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";

    const [assetData, assetDataLoading, assetDataError] = useObject(
        ref(database, "production/" + assetId + "/history_15min")
    );

    if (assetDataLoading || assetDataError) {
        return (
            <Paper sx={{ p: 2 }}>
                <ProductionWorm
                    chartDataTime={time_ms}
                    chartData_W={chartData}
                    params={defaultChartDisplayParams}
                />
            </Paper>
        );
    } else {
        const data = [];
        const time = [];
        var i = 0;
        console.log(assetData.val());

        Object.entries(assetData.val()).forEach((entry) => {
            if (i < 150) {
                const [t, d] = entry;
                time.push(parseInt(t));
                data.push(d);
                i++;
            }
        });

        console.log(data);
        console.log(time);

        return (
            <Paper sx={{ p: 2 }}>
                <ProductionWorm
                    chartDataTime={time}
                    chartData_W={data}
                    params={defaultChartDisplayParams}
                />
            </Paper>
        );
    }
}

export default BasicProdWorm;
