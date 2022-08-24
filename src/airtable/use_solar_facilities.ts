import {ProspectiveAsset} from 'components/discovery/types';
import {Record, FieldSet} from 'airtable';
import {useAirtable} from './use_airtable';

const transformAirtableRecordToAsset = (
    r: Record<FieldSet>,
): ProspectiveAsset => {
    return {
        id: r.getId(),
        title: r.get('Name') as string,
        minInvestment: r.get('Investor funds') as number,
        estimatedROI: r.get('Estimated return on investment') as number,
        numberOfPanels: r.get('Number of panels') as number,
        address: {
            city: r.get('City') as string,
            state: r.get('State') as string,
            postalCode: r.get('Zip code') as string,
            streetAddress: r.get('Street address') as string,
        },
        metrics: [
            {
                metric: 'Location',
                value: '2868 Dutton Meadow Santa Rosa, CA 95407',
            },
            {
                metric: 'Panels',
                value: '114',
            },
            {
                metric: 'Watts Installed',
                value: '46,600',
            },
            {
                metric: 'Total Investment',
                value: '$131,000',
            },
        ],
        capacity_kW: r.get('Kilowatts installed') as number,
        color: r.get('Theme color') as string,
        holdTerm_years: r.get('Hold term (Years)') as number,

        location: {
            lat: r.get('latitude') as number,
            lng: r.get('longitude') as number,
        },
    };
};

export const useSolarFacilities = () => {
    const {useBase} = useAirtable();

    const {loading, page} = useBase('Solar facilities');

    const assets = loading ? [] : page.map(transformAirtableRecordToAsset);

    return {
        loading,
        assets,
    };
};
