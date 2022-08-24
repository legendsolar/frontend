import {Address, Location} from 'schema/schema_gen_types';
import {Metric} from 'components/summary/metric_list';

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
    content?: any;
}
