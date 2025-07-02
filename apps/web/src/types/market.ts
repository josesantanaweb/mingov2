export interface IMarketSportOption {
  label: string;
  odd: string;
}

export interface IMarketSport {
  name: string;
  options: IMarketSportOption[];
}

export interface IMarket {
  id: string;
  name: string;
  icon: string;
  description: string;
}
export interface IMarketOption {
  id: string;
  name: string;
  odds: number;
}

export interface IMarketSportSelected {
  name: string;
  option: IMarketSportOption;
}
