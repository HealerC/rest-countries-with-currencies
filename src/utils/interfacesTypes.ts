export type CountryList = {
  [cca3: string]: RestCountriesData;
};

export type Region =
  | "All"
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania"
  | "Antarctic";

export type RegionList = {
  [key in Region]: string[];
};

export type AppState = {
  countryList: CountryList;
  regionList: {
    Africa: string[];
    Americas: string[];
    Asia: string[];
    Europe: string[];
    Oceania: string[];
  };
  lightMode: boolean;
  search: {
    query: string;
    filterRegion: Region;
    results: CountryList;
  };
  favCountries: string[];
  loading: boolean;
};

export type AppCurrencyData = {
  name: string;
  symbol: string;
  conversionFrom1USD: number | null;
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
  region: Region;
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
export interface RestCountriesData extends RestCountriesAPI {
  commonName: string;
  nativeName: {
    [language: string]: string;
  };
  currencies: {
    [currency: string]: AppCurrencyData;
  };
}
export interface OpenExchangeAPI {
  base: string;
  rates: {
    [currencyCode: string]: number;
  };
}
