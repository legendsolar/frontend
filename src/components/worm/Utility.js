import { differenceInSeconds } from "date-fns";
import { useEffect, useRef } from "react";

function simSolarOutput(t, max) {
    var date = new Date(t);
    date.setHours(0, 0, 0, 0);
    var timeAfterNoon = differenceInSeconds(date, new Date(t));

    var sineVal = Math.sin(
        (timeAfterNoon / (12.0 * 60 * 60)) * Math.PI + Math.PI / 2
    );

    var rawValue = (0.5 / (1 + Math.exp(3 * sineVal))) * (1 - sineVal);

    var seededRandom = Math.sin(date.getTime()) * 1000;
    seededRandom = seededRandom - Math.floor(seededRandom);
    seededRandom = seededRandom / 2 + 0.5;

    return rawValue * max * seededRandom;
}

function timeInterpolatedValues(startTime, endTime, N) {
    const timeDelta = (endTime - startTime) / N;
    let array = Array.from(Array(N), (x, i) => {
        return startTime + timeDelta * i;
    });
    return array;
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export { useInterval, simSolarOutput, timeInterpolatedValues };
