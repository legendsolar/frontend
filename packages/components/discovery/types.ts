import {Address, Location} from '@p/schema';
import {Metric} from '../summary/metric_list';
import {Document} from '../documents/types';

export interface AssetDocument {
    title: string;
    url: string;
}
export interface ProspectiveAsset {
    id: string;
    title: string;
    color: string;
    estimatedROI: number;
    minInvestment: number;
    numberOfPanels: number;
    capacity_kW: number;
    holdTerm_years: number;
    address: Address;
    metrics: Array<Metric>;
    location: Location;
    panelModel: string;
    summary: string;
    about: {
        yearTerm: string;
        rooftopMonitoring: string;
        investmentTaxCredit: string;
        rainOrShine: string;
        workmanshipWarrenty: string;
    };
    documents: Array<Document>;
    content?: any;
}
