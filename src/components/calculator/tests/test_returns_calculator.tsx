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
        }))}
    />
);
