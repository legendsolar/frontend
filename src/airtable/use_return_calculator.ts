import {AssetDocument, ProspectiveAsset} from 'components/discovery/types';
import {Record, FieldSet} from 'airtable';
import {useAirtable} from './use_airtable';
import {Document} from 'components/documents/types';
import {PanelRecord} from 'components/calculator/returns_calculator';
import {UnitEnum} from 'static/units';

const transformAirtableRecordToAnalogies = (
    r: Record<FieldSet>,
): PanelRecord => {
    return {
        panelCount: r.get('Name') as number,
        analogies: {
            [UnitEnum.DOLLARS]: r.get('Cash analogy') as string,
            [UnitEnum.CARBON]: r.get('lbs carbon analogy') as string,
            [UnitEnum.ENERGY]: r.get('kWh analogy') as string,
        },
        totals: {
            [UnitEnum.DOLLARS]: r.get('10 yr Dividends') as number,
            [UnitEnum.CARBON]: r.get('lbs Carbon') as number,
            [UnitEnum.ENERGY]: (r.get('kWh Generated') as number) * 1000,
        },
        imageUrl: {
            [UnitEnum.DOLLARS]: (r.get('Cash emoji') as any)[0].url,
            [UnitEnum.CARBON]: (r.get('Weight emoji') as any)[0].url,
            [UnitEnum.ENERGY]: (r.get('Generation emoji') as any)[0].url,
        },
    };
};

export const useReturnCalculator = () => {
    const {useBase} = useAirtable();

    const {loading, page} = useBase('Legends Return Calculator');

    const records = loading ? [] : page.map(transformAirtableRecordToAnalogies);

    console.log(records.length > 0 ? records[0].imageUrl : null);

    return {
        loading,
        records,
    };
};
