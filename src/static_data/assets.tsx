import {ProspectiveAsset} from 'components/discovery/types';

const assetData: Array<ProspectiveAsset> = [
    {
        id: '1d5456ea-6c8f-4608-99bc-f381b6524bd4',
        title: 'Honolulu Solar',

        minInvestment: 131000,
        capacity_kW: 45.2,
        holdTerm_years: 7,
        color: '#B4615F',
        estimatedROI: 0.097,
        numberOfPanels: 105,
        address: {
            streetAddress: '2826 Dutton Meadow',
            city: 'Santa Rosa',
            state: 'CA',
            postalCode: '95407',
        },
        metrics: [
            {
                metric: 'Number of panels',
                value: '114',
            },
            {
                metric: 'Make & model',
                value: 'Phono Solar 400W',
            },
            {
                metric: 'Watts Installed',
                value: '45,600 W',
            },
        ],
        location: {
            lat: 21.315603,
            lng: -157.858093,
        },
    },

    {
        id: 'd9f40fcd-7164-4bf6-8de1-717d8d240e59',
        title: 'Fairbanks Solar',
        minInvestment: 131000,
        capacity_kW: 45.2,
        holdTerm_years: 7,
        color: '#EAB31E',
        estimatedROI: 0.097,
        numberOfPanels: 105,
        address: {
            streetAddress: '2826 Dutton Meadow',
            city: 'Santa Rosa',
            state: 'CA',
            postalCode: '95407',
        },
        metrics: [
            {
                metric: 'Number of panels',
                value: '114',
            },
            {
                metric: 'Make & model',
                value: 'Phono Solar 400W',
            },
            {
                metric: 'Watts Installed',
                value: '45,600 W',
            },
        ],
        location: {
            lat: 64.835365,
            lng: -147.776749,
        },
    },
];

export default assetData;
