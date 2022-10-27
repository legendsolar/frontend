import {useState} from 'react';
import Worm from 'components/worm/worm';
import {generateFakeProductionData} from 'utils/fake_data';

const PlaceholderWorm = (props) => {
    const days = 4;

    const max_W = 5000;

    const [data, setData] = useState(generateFakeProductionData(days, max_W));

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
