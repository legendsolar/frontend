import Airtable from 'airtable';
import {AirtableBase} from 'airtable/lib/airtable_base';

export const initAirtable = (): AirtableBase => {
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'keyHZqGBOiy3V49N7',
    });
    var base = Airtable.base('appCuKA1pZiCb6bEV');

    return base;
};
