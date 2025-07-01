export interface IMarketSportOption {
  label: string;
  odd: string;
}

export interface IMarketSport {
  name: string;
  options: IMarketSportOption[];
}

export interface IMarket {
  name: string;
  icon: string;
  description: string;
}

export interface IMarketSportSelected {
  name: string;
  option: IMarketSportOption;
}
