export type CountryList = {
  [cca3: string]: RestCountriesData;
};

export type RegionList =
  | "All"
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania";

export type AppState = {
  countries: CountryList;
  regions: {
    Africa: string[];
    Americas: string[];
    Asia: string[];
    Europe: string[];
    Oceania: string[];
  };
  lightMode: boolean;
  search: {
    query: string;
    filterRegion: RegionList;
    results: CountryList;
  };
  favCountries: string[];
};

export type RestCountriesData = {
  commonName: string;
  nativeName: {
    [language: string]: string;
  };
  capital: string[];
  region: string;
  subRegion: string;
  population: number;
  tld: string[];
  languages: {
    [language: string]: string;
  };
  currencies: {
    [currency: string]: {
      name: string;
      symbol: string;
      conversionFrom1USD: number | null;
    };
  };
  borders: string[];
};

export interface RestCountriesAPI {
  name: {
    common: string;
    nativeName: {
      [lang: string]: {
        common: string;
      };
    };
  };

  tld: string[];
  cca3: string;

  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };

  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [languageAbbr: string]: string;
  };
  borders: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
  };
}

export interface OpenExchangeAPI {
  base: string;
  rates: {
    [currencyCode: string]: number;
  };
}
