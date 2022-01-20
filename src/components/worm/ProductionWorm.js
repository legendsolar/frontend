import "chartjs-adapter-date-fns";
import styles from "./ProductionWorm.module.css";
import React, { useRef, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    addHours,
    differenceInHours,
    monthsToQuarters,
    differenceInSeconds,
    setHours,
    differenceInDays,
    format,
} from "date-fns";

import { easeInOutCubic } from "js-easing-functions";
import Chart from "chart.js/auto";

var tinycolor = require("tinycolor2");

const chartColorGrader = (chart, args, options) => {
    const params = options.params;
    // gradient for worm
    const nightYpos = chart.scales["yAxes"].getPixelForValue(
        params.worm.nightThreshold_W
    );
    const gradientFill = chart.ctx.createLinearGradient(0, 0, 0, chart.height);

    if (chart.height == 0 || nightYpos == undefined || isNaN(nightYpos)) {
        return;
    }

    let midpoint = nightYpos / chart.height;
    midpoint = midpoint > 1.0 ? 1 : midpoint;
    midpoint = midpoint < 0.0 ? 0 : midpoint;

    gradientFill.addColorStop(0, params.worm.dayColor);
    gradientFill.addColorStop(midpoint, params.worm.dayColor);
    gradientFill.addColorStop(midpoint, params.worm.nightColor);
    gradientFill.addColorStop(1, params.worm.nightColor);

    // Need to set both background and border
    chart.data.datasets[0].backgroundColor = gradientFill;
    chart.data.datasets[0].borderColor = gradientFill;

    // gradient for chart background
    const gradientFillGrey = chart.ctx.createLinearGradient(
        0,
        0,
        0,
        chart.height
    );
    gradientFillGrey.addColorStop(0, params.background.dayRegionColor);
    gradientFillGrey.addColorStop(midpoint, params.background.dayRegionColor);
    gradientFillGrey.addColorStop(midpoint, params.background.nightRegionColor);
    gradientFillGrey.addColorStop(1, params.background.nightRegionColor);

    let ctx = chart.canvas.getContext("2d");
    ctx.save();

    // Sun / Moon Icons
    ctx.globalCompositeOperation = "destination-over";
    ctx.beginPath();
    ctx.arc(
        chart.width - params.dayNightIcons.rightMargin,
        nightYpos - params.dayNightIcons.iconSpacing,
        params.dayNightIcons.dayIconRadius,
        0,
        2 * Math.PI
    );
    ctx.fillStyle = params.background.nightRegionColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
        chart.width -
            params.dayNightIcons.rightMargin +
            params.dayNightIcons.nightIconRadius * (3.5 / 4.5),
        nightYpos + params.dayNightIcons.iconSpacing,
        params.dayNightIcons.nightIconRadius,
        0,
        2 * Math.PI
    );
    ctx.fillStyle = params.background.nightRegionColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
        chart.width - params.dayNightIcons.rightMargin,
        nightYpos + params.dayNightIcons.iconSpacing,
        params.dayNightIcons.nightIconRadius,
        0,
        2 * Math.PI
    );
    ctx.fillStyle = params.background.dayRegionColor;
    ctx.fill();

    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = gradientFillGrey;
    ctx.fillRect(0, 0, chart.width, chart.height);

    ctx.restore();
};

const sunIconDrawer = (chart, args, options) => {
    const params = options.params;
    const nightYpos = chart.scales["yAxes"].getPixelForValue(
        params.worm.nightThreshold_W
    );

    var point = chart._metasets[0].data[options.arrayPosition];

    if (!point) {
        // todo error
        return;
    }
    var sunColor =
        point.y > nightYpos
            ? params.wormSunIcon.nightColor
            : params.wormSunIcon.dayColor;

    const lowAlphaSunColor = tinycolor(sunColor.toRgbString());
    lowAlphaSunColor.setAlpha(0);

    const sunGradient = chart.ctx.createRadialGradient(
        point.x,
        point.y,
        0,
        point.x,
        point.y,
        params.wormSunIcon.radius
    );

    sunGradient.addColorStop(0, sunColor.toRgbString());
    sunGradient.addColorStop(0.5, sunColor.toRgbString());
    sunGradient.addColorStop(0.8, lowAlphaSunColor.toRgbString());

    chart.data.datasets[0]["pointBackgroundColor"] = sunGradient;
    chart.data.datasets[0]["pointBorderColor"] = sunGradient;

    let ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.restore();
};

function formatTimeAxisTicks(value, idx, values) {
    let midnight = new Date().setHours(0, 0, 0, 0);
    let noon = new Date().setHours(12, 0, 0, 0);

    if (value == "12PM") {
        return format(new Date(values[idx].value), "EEEE");
        // if (differenceInHours(midnight, new Date(values[idx].value)) < 0) {
        // } else if (
        //     differenceInHours(midnight, new Date(values[idx].value)) < 24
        // ) {
        //     return "Yesterday";
        // } else if (
        //     differenceInHours(midnight, new Date(values[idx].value)) < 48
        // ) {
        //     return format(new Date(values[idx].value), "EEEE");
        // }
    } else if (idx == values.length - 2) {
        if (differenceInHours(noon, new Date(values[idx].value)) > 1) {
            return ["Today", ""];
        }
    }
    return undefined;
}

const currentTimeTickDrawer = (chart, args, options) => {
    if (options.params.currentTimeDisplay) {
        var ctx = chart.ctx;
        var xAxis = chart.scales.xAxes;
        var yAxis = chart.scales.yAxes;

        if (xAxis && xAxis.ticks.length > 0) {
            ctx.save();
            var x = xAxis.getPixelForValue(
                xAxis.ticks[xAxis.ticks.length - 1].value
            );
            ctx.textAlign = "center";
            ctx.font = "200 12px Be Vietnam Pro ";
            ctx.fillStyle = "#636E72";
            ctx.fillText(format(new Date(), "h:mm aa"), x, yAxis.bottom + 36);
            ctx.restore();
        }
    }
};

const ProductionWormGauge = (props) => {
    const chartDataTime_ms = props.chartDataTime;
    const chartData_W = props.chartData_W;
    const params = props.params;

    const additionalClassName = props.className ? props.className : "";

    var lastValidDataIdx = chartData_W.length - 1;
    chartData_W.forEach((w, i) => {
        if (!w && chartData_W[i - 1]) {
            lastValidDataIdx = i - 1;
        }
    });

    if (!params) {
        // params = defaultChartDisplayParams;
    }

    const timeSeries = chartDataTime_ms.map((t) => {
        return t;
    });

    const pointRadius = Array.from({ length: timeSeries.length }, (x, i) => 0);
    pointRadius[lastValidDataIdx] = params.wormSunIcon.radius;

    const pointBorder = Array.from({ length: timeSeries.length }, (x, i) => {
        if (i < lastValidDataIdx) {
            return params.worm.width;
        }
        return 0;
    });

    const data = {
        labels: timeSeries,
        datasets: [
            {
                label: "wattage",
                data: chartData_W,
                fill: false,
                pointRadius: pointRadius,
                borderWidth: pointBorder,
            },
        ],
    };

    const options = {
        clip: {
            left: 0,
            right: false,
            top: true,
            bottom: false,
        },
        animation: {
            duration: 0,
        },
        tooltips: false,
        responsiveAnimationDuration: 0,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            chartColorGrader: {
                params: params,
                arrayPosition: lastValidDataIdx,
                sunAnimation: 0,
            },

            currentTimeTickDrawer: {
                params: params,
            },

            sunIconDrawer: {
                arrayPosition: lastValidDataIdx,
                params: params,
            },
        },
        layout: {
            padding: {
                left: 10,
                right: 55,
                bottom: params.currentTimeDisplay ? 10 : 0,
            },
        },
        scales: {
            xAxes: {
                type: "time",
                display: true,
                ticks: {
                    display: true,
                    color: params.worm.nightColor.toHex(),
                    font: {
                        size: 12,
                        weight: 300,
                        "font-family": "Be Vietnam Pro",
                    },
                    align: "center",
                    callback: formatTimeAxisTicks,
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                gridLines: {
                    display: false,
                },
                // afterFit: (axis) => {
                //     axis.paddingRight = 0;
                //     axis.paddingLeft = 0;
                // },
            },

            yAxes: {
                beginAtZero: true, // minimum will be 0, unless there is a lower value.
                max: 1.1 * params.data.max_W, // minimum value will be 0.
                min: 0.0, // minimum value will be 0.
                display: false,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                gridLines: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className={`${styles.chart} ${additionalClassName}`}>
            <div className={styles.container}>
                <Line
                    data={data}
                    options={options}
                    plugins={[
                        {
                            id: "sunIconDrawer",
                            beforeDraw: sunIconDrawer,
                        },
                        {
                            id: "chartColorGrader",
                            beforeDraw: chartColorGrader,
                        },
                        {
                            id: "currentTimeTickDrawer",
                            afterDraw: currentTimeTickDrawer,
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default ProductionWormGauge;
