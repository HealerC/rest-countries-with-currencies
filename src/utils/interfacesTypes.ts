// All the country data in this app arranged in a map with
// the key as the country cca3 code
export type CountryList = {
  [cca3: string]: RestCountriesData;
};

export type Region =
  | "All"
  | "Fav"
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania"
  | "Antarctic";

// All the regions plus extra with cca3 values, countries
// in the regions
export type RegionList = {
  [key in Region]: string[];
};

// The state of the app to be distributed by app context
export type AppState = {
  countryList: CountryList;
  regionList: RegionList;
  lightMode: boolean;
  search: {
    // Searching the countries
    query: string;
    filterRegion: Region; // Filter the countries by regions
    results: string[]; // Results of the search (cca3's)
  };
  loading: boolean;
};

// Currency data of a country. conversionFrom1USD gotten from API
// used to compute conversion between US $ and country currency
export type AppCurrencyData = {
  name: string;
  symbol: string;
  conversionFrom1USD: number | null;
};

// Describing the data received from REST countries API
// Describing just the data required by the app
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

// A single country data extending that from the API
// but with some additional values with some rearrangement/renaming
export interface RestCountriesData extends RestCountriesAPI {
  commonName: string;
  nativeName: {
    [language: string]: string;
  };
  currencies: {
    [currency: string]: AppCurrencyData;
  };
}

// Describing the data received by the API for computing rates
export interface OpenExchangeAPI {
  base: string;
  rates: {
    [currencyCode: string]: number;
  };
}
