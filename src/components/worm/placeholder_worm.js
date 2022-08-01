import {useState} from 'react';
import Worm from 'components/worm/worm';
import {subDays} from 'date-fns';

const generateProductionData = (daysBefore, max_W) => {
    const N = 300;

    const now = new Date();

    const start = subDays(now, daysBefore);

    const interval = (now.getTime() - start.getTime()) / N;

    return Array.from({length: 300}, (_, i) => {
        return {
            time: start.getTime() + interval * i,
            wattage:
                max_W * Math.pow(Math.cos((i / N) * Math.PI * daysBefore), 4),
        };
    });
};

const PlaceholderWorm = (props) => {
    const days = 4;

    const max_W = 5000;

    const [data, setData] = useState(generateProductionData(days, max_W));

    return (
        <Worm
            rawData={data}
            loading={false}
            error={false}
            nightThreshold_W={max_W * 0.333}
        ></Worm>
    );
};

export default PlaceholderWorm;
