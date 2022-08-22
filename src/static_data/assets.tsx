import {ProspectiveAsset} from 'components/discovery/types';

const assetData: Array<ProspectiveAsset> = [
    {
        id: '9e99c6d8-7de8-45df-b2ee-a1196616b83e',
        title: 'Santa Rosa Solar',
        minInvestment: 131000,
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
        content: [
            {
                headline: `
                Legends Incorporated is offering equity in four separate
                commercial solar facilities to accredited investors.`,
                paragraphs: [
                    `Two facilities are in in New Jersey and two in
                        California. Each solar facility is on an ‘Extra Space
                        Mini Storage’ managed property owned by the REIT Merit
                        Hill Capital.`,
                    `Once operational, these facilities will earn a stream of
                        payments from Extra Space as well as tax benefits.
                        Payments will be fixed, regardless of solar
                        productivity.
                    `,

                    `To effectively monetize the tax benefits this investment
                        provides, you should meet the following criteria:`,

                    `Up to ~55% of net return will be attributable to tax
                        incentives. The remaining return is derived from power
                        purchase payments from Merit Hill. These power purchase
                        payments are shielded from federal income taxes via
                        depreciation benefits. Please carefully review the
                        attached pro forma and discuss if it is right for you
                        with your financial advisors. As always, feel free to
                        reach out to me with additional questions.`,
                ],
            },
            {
                headline: `
                About Merit Hill and Extra Space `,
                paragraphs: [
                    `Merit Hill is a leading self-storage owner/operator with
                    more than 200 properties in 33 states. Extra Space Mini
                    Storage manages and operates dozens of Merit Hill
                    properties. Once operational, these facilities will earn
                    a stream of payments from Extra Space as well as tax
                    benefits. Payments will be fixed, regardless of solar
                    productivity.`,

                    `Once operational, these facilities will earn a stream of
                        payments from Extra Space as well as tax benefits.
                        Payments will be fixed, regardless of solar
                        productivity.
                    `,

                    `Merit Hill will both be the only source of revenue and
                    the purchaser of this facility after the 7 year holding
                    period.`,
                ],
            },
        ],
        location: {
            lat: 38.44466,
            lng: -122.720306,
        },
    },

    {
        id: '45c97a26-2985-4861-9c18-a37130b37888',
        title: 'Glassboro Solar',
        minInvestment: 131000,
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
            lat: 39.702892,
            lng: -75.111839,
        },
    },

    {
        id: '734645a9-40ea-464f-aaa9-4de40ea585c1',
        title: 'Lake Elsinore Solar',
        minInvestment: 131000,
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
            lat: 33.66808,
            lng: -117.32726,
        },
    },

    {
        id: 'f07864f4-3786-4c77-ac86-e4a365338f22',
        title: 'Lindenwold Solar',

        minInvestment: 131000,
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
            lat: 39.817226,
            lng: -74.988892,
        },
    },

    {
        id: '1d5456ea-6c8f-4608-99bc-f381b6524bd4',
        title: 'Honolulu Solar',

        minInvestment: 131000,

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
