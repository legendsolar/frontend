import {UnitEnum} from 'static/units';
import ReturnsCalculator from '../returns_calculator';

export default () => (
    <ReturnsCalculator
        maxYears={10}
        minPanels={1}
        maxPanels={10}
        panelCost={250}
        panelRecords={Array.from({length: 10}).map((_, i) => ({
            panelCount: i,
            analogies: {
                [UnitEnum.DOLLARS]: i + 'd',
                [UnitEnum.CARBON]: i + 'c',
                [UnitEnum.ENERGY]: i + 'e',
            },
            totals: {
                [UnitEnum.DOLLARS]: i * 1000,
                [UnitEnum.CARBON]: i * 100,
                [UnitEnum.ENERGY]: i * 10000,
            },
            imageUrl: {
                [UnitEnum.DOLLARS]:
                    'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
                [UnitEnum.CARBON]:
                    'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
                [UnitEnum.ENERGY]:
                    'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
            },
        }))}
    />
);
