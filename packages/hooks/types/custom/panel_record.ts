import { UnitEnum } from "../utils/units";

export interface PanelRecord {
    panelCount: number;
    analogies: {
        [UnitEnum.DOLLARS]: string;
        [UnitEnum.CARBON]: string;
        [UnitEnum.ENERGY]: string;
    };
    totals: {
        [UnitEnum.DOLLARS]: number;
        [UnitEnum.CARBON]: number;
        [UnitEnum.ENERGY]: number;
    };
    imageUrl: {
        [UnitEnum.DOLLARS]: string;
        [UnitEnum.CARBON]: string;
        [UnitEnum.ENERGY]: string;
    };
}