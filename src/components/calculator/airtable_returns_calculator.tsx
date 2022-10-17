import {useReturnCalculator} from 'airtable/use_return_calculator';
import {UnitEnum} from 'static/units';
import ReturnsCalculator from './returns_calculator';

const AirtableReturnsCalculator = () => {
    const {loading, records} = useReturnCalculator();

    if (loading) {
        return <></>;
    }

    return (
        <ReturnsCalculator
            maxPanels={records.length}
            maxYears={10}
            minPanels={1}
            panelCost={250}
            panelRecords={records}
        ></ReturnsCalculator>
    );
};

export default AirtableReturnsCalculator;
