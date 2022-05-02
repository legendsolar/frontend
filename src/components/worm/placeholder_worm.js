import {useEffect, useState} from 'react';
import {get, query, orderByKey, ref, startAt, endAt} from 'firebase/database';
import Worm from 'components/worm/worm';
import {subWeeks, subDays, setDate} from 'date-fns';
import {useDatabase} from 'reactfire';

const generateProductionData = (daysBefore) => {
    const N = 300;

    const now = new Date();

    const start = subDays(now, daysBefore);

    const interval = (now.getTime() - start.getTime()) / N;

    return Array.from({length: 300}, (_, i) => {
        return {
            time: start.getTime() + interval * i,
            wattage:
                1000 * Math.pow(Math.cos((i / N) * Math.PI * daysBefore), 4) +
                400,
        };
    });
};

const PlaceholderWorm = (props) => {
    const days = 4;

    const [data, setData] = useState(generateProductionData(days));

    return <Worm rawData={data} loading={false} error={false}></Worm>;
};

export default PlaceholderWorm;
