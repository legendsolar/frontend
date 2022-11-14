import {ProspectiveAsset} from '@project/components/discover/types';

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
        panelModel: 'Best Panels Ever',
        address: {
            streetAddress: '2826 Dutton Meadow',
            city: 'Santa Rosa',
            state: 'CA',
            postalCode: '95407',
        },
        about: {
            yearTerm: 'Lorum',
            rooftopMonitoring: 'Lorum',
            investmentTaxCredit: 'Lorum',
            rainOrShine: 'Lorum',
            workmanshipWarrenty: 'Lorum',
        },
        summary: 'Lorum',
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
        documents: [],
        location: {
            lat: 21.315603,
            lng: -157.858093,
        },
    },
];

export default assetData;
