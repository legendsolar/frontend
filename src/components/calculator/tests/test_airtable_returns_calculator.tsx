import {ProvideAirtable} from 'airtable/use_airtable';
import {UnitEnum} from 'static/units';
import AirtableReturnsCalculator from '../airtable_returns_calculator';
import ReturnsCalculator from '../returns_calculator';

export default () => (
    <ProvideAirtable>
        <AirtableReturnsCalculator />
    </ProvideAirtable>
);
