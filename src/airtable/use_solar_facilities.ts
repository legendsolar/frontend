import {AssetDocument, ProspectiveAsset} from 'components/discovery/types';
import {Record, FieldSet} from 'airtable';
import {useAirtable} from './use_airtable';
import {Document} from 'components/documents/types';

const airtableDocumentTransformer = (
    airtableDoc: Array<any>,
    assetName: string,
): Array<Document> => {
    if (airtableDoc) {
        return airtableDoc.map((doc) => ({
            id: doc.id,
            name: doc.filename,
            type: 'Invement Document',
            created: new Date(),
            facility: assetName,
            downloadLink: doc.url,
        }));
    } else {
        return [];
    }
};

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
        panelModel: r.get('Panel model') as string,
        summary: r.get('Investment Summary') as string,
        about: {
            yearTerm: r.get('About 7 Year Term') as string,
            rooftopMonitoring: r.get('About Rooftop Monitoring') as string,
            investmentTaxCredit: r.get('About Investment Tax Credit') as string,
            rainOrShine: r.get('About Rain Or Shine') as string,
            workmanshipWarrenty: r.get('About Workmanship Warrenty') as string,
        },
        documents: [
            ...airtableDocumentTransformer(
                r.get('Pro forma') as Array<any>,
                r.get('Name') as string,
            ),
            ...airtableDocumentTransformer(
                r.get('Solar energy services agreement') as Array<any>,
                r.get('Name') as string,
            ),
            ...airtableDocumentTransformer(
                r.get('Warranty') as Array<any>,
                r.get('Name') as string,
            ),
        ],
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
