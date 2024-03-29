import { numberToWords } from "../../../utils/number_utils";
import {
  currencyFormatter,
  numberFormatter,
} from "../../../utils/number_formatter";

export enum UnitEnum {
  DOLLARS = "DOLLARS",
  ENERGY = "ENERGY",
  CARBON = "CARBON",
  PANELS = "PANELS",
}

export interface Unit {
  title: string;
  unit: string;
  enum: UnitEnum;
  unitDescription: string;
  unitSubHeading?: string;
  color: string;
  format(u: number, includeUnit?: boolean, width?: number): string;
}

export const dollars: Unit = {
  unit: "DOLLARS",
  enum: UnitEnum.DOLLARS,
  unitDescription: "Dollars",
  unitSubHeading: "per hour",
  title: "Cash Earned",
  color: "legendaryGreen",
  format: (u: number, includeUnit: boolean = true, width?: number) => {
    if (includeUnit) {
      return currencyFormatter(u);
    } else {
      return `${numberFormatter(u, width, false)}`;
    }
  },
};

export const energy: Unit = {
  unit: "KWH",
  enum: UnitEnum.ENERGY,
  unitSubHeading: "",
  unitDescription: "Kilowatts",
  title: "Generation",
  color: "pencilYellow",
  format: (u: number, includeUnit: boolean = true, width?: number) => {
    if (includeUnit) {
      return `${numberFormatter(u, width, true)}Wh`;
    } else {
      return `${numberFormatter(u, width, true)}`;
    }
  },
};

export const carbonEnglish: Unit = {
  unit: "LBS",
  enum: UnitEnum.CARBON,
  unitDescription: "Pounds ",
  unitSubHeading: "per hour",
  title: "Carbon Aversion",
  color: "skyBlue",
  format: (u: number, includeUnit: boolean = true, width?: number) => {
    if (u > 2000) {
      return `${numberFormatter(u / 2000, width, true)} tons`;
    }

    if (includeUnit) {
      return `${numberFormatter(u, width, true)} LBS`;
    } else {
      return `${numberFormatter(u, width, true)}`;
    }
  },
};

export const panels: Unit = {
  unit: "Panels",
  unitDescription: "panels ",
  enum: UnitEnum.PANELS,
  title: "Panels",
  color: "blackDusk",
  format: (u: number, includeUnit: boolean = true, width?: number) => {
    if (!includeUnit) {
      return `${u.toFixed(0)}`;
    }

    const number = numberToWords(Math.floor(u));

    if (u === 1) {
      return `${number.charAt(0).toUpperCase() + number.slice(1)} panel`;
    } else {
      return `${number.charAt(0).toUpperCase() + number.slice(1)} panels`;
    }
  },
};
