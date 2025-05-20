export interface IMarketOption {
  label: string;
  odd: string;
}

export interface IMarket {
  name: string;
  options: IMarketOption[];
}

export interface IMarketSelected {
  name: string;
  option: IMarketOption;
}
