import {Document} from '@project/components/documents/types';

export const placeholderDocumentPageDocuments = [
    {
        title: 'Purchase Agreement',
        color: 'legendaryGreen',
    },
    {
        title: 'Income Statement',
        color: 'skyBlue',
    },
    {
        title: 'Platform Agreement',
        color: 'pencilYellow',
    },
];

export const documents: Array<Document> = [
    {
        id: 'ea52959f-cf20-419e-acfc-a79bca49ea75',
        name: '2021 income statement',
        type: 'Income statement',
        created: new Date('August 10, 2022'),
        facility: 'Barnyard Solar',
        downloadLink: 'www.google.com',
    },
    {
        id: 'el52659f-cf20-419e-acfc-a79bca49ea75',
        name: 'Barnyard Solar Service Agreement',
        type: 'Service Agreement',
        created: new Date('June 10, 2022'),
        facility: 'Barnyard Solar',
        downloadLink: 'www.google.com',
    },
];
