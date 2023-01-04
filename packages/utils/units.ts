import { numberToWords } from "./number_utils";
import { currencyFormatter, numberFormatter } from "./number_formatter";

export enum UnitEnum {
  DOLLARS = "DOLLARS",
  ENERGY_KWH = "ENERGY_KWH",
  WATTS_KW = "WATTS_KW",
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
  formatWithUnit(
    u: number,
    width?: number
  ): {
    value: string;
    unit: string;
  };
}

export const dollars: Unit = {
  unit: "Dollars",
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
  formatWithUnit: (u: number, width?: number) => {
    return {
      value: `${numberFormatter(u, width, false)}`,
      unit: "$",
    };
  },
};

export const energy_kWh: Unit = {
  unit: "KWH",
  enum: UnitEnum.ENERGY_KWH,
  unitSubHeading: "per hour",
  unitDescription: "KWh",
  title: "Generation",
  color: "pencilYellow",
  format: (u: number, includeUnit: boolean = true, width?: number) => {
    if (includeUnit) {
      return `${numberFormatter(1000 * u, width, true)}Wh`;
    } else {
      return `${numberFormatter(u, width, true)}`;
    }
  },
  formatWithUnit: (u: number, width?: number) => {
    const number = numberFormatter(u, width, true);
    const matches = number.match(/([\d.]+)(\w+)/);

    if (matches && matches.length >= 2) {
      if (matches[1] === "K") {
        matches[1] = "k";
      }

      return {
        value: matches[0],
        unit: matches[1] + "Wh",
      };
    } else {
      return {
        value: "-",
        unit: "kWh",
      };
    }
  },
};

export const watts_kW: Unit = {
  unit: "KW",
  enum: UnitEnum.WATTS_KW,
  unitSubHeading: "per hour",
  unitDescription: "Watts",
  title: "Generation",
  color: "pencilYellow",
  format: (u: number, includeUnit: boolean = true, width?: number) => {
    if (includeUnit) {
      return `${numberFormatter(u, width, true)}W`;
    } else {
      return `${numberFormatter(u, width, true)}`;
    }
  },

  formatWithUnit: (u: number, width?: number) => {
    const number = numberFormatter(u, width, true);
    const matches = number.match(/([\d.]+)([a-zA-Z]+)?/);

    if (matches?.length === 3 && !!matches[2]) {
      if (matches[2] === "K") {
        matches[2] = "k";
      }

      return {
        value: matches[1],
        unit: matches[2] + "W",
      };
    } else if (matches?.length === 3 && !matches[2]) {
      return {
        value: matches[1],
        unit: "kW",
      };
    } else {
      return {
        value: "-",
        unit: "kW",
      };
    }
  },
};

export class UnitaryValue {
  public value: number = 0;
  public unitStr: string = "";

  constructor(value: number, unitStr: string) {
    this.value = value;
    this.unitStr = unitStr;
  }

  public toString = (): string => {
    return this.value + this.unitStr;
  };
}

const test = new UnitaryValue(10, "kWh");

export const carbonEnglish: Unit = {
  unit: "Pounds",
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
  formatWithUnit: (u: number, width?: number) => {
    if (u > 2000) {
      return {
        value: numberFormatter(u / 2000, width, false),
        unit: "tons",
      };
    } else {
      return {
        value: numberFormatter(u, width, false),
        unit: "lbs",
      };
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
  formatWithUnit: (u: number, width?: number) => {
    return {
      value: numberFormatter(u, width, false),
      unit: "panels",
    };
  },
};
