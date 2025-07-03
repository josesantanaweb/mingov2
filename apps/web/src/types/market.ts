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
  marketOptions: IMarketOption[];
  marketType: IMarketType;
}

export interface IMarketOption {
  id: string;
  name: string;
  odds: number;
}

export interface IMarketType {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: boolean;
}

export interface IMarketSportSelected {
  name: string;
  option: IMarketSportOption;
}
