import { RestCountriesData, CountryList } from "./interfacesTypes";
import {
  AppCurrencyData,
  RestCountriesAPI,
  OpenExchangeAPI,
} from "./interfacesTypes";
import { Region, RegionList } from "./interfacesTypes";

// Process the data from REST countries API
export const countriesDataProcessor = (data: Object) => {
  return data;
};

// Process the rates from open exchange rates API
export const ratesDataProcessor = (data: Object) => {
  return data;
};

// Describing data from the APIs (parameters to the combined processor)
export type CountryRates = {
  countries: RestCountriesAPI[];
  rates: OpenExchangeAPI;
};

// Result from combined processing of both data from API
type countryRatesDPType = (countryRates: CountryRates) => {
  countryList: CountryList;
  regionList: RegionList;
};

export const countriesRatesDataProcessor: countryRatesDPType = ({
  countries,
  rates,
}) => {
  if (!countries || !rates) {
    throw new Error(
      "You should pass an object containing keys: countries, rates"
    );
  }

  let countryList: CountryList = {};
  // Data we need from each country of the app accessed by its cca3 code
  let regionList: RegionList = {
    // Each array contains a list of countries with their cca3
    // Indicates all the countries in the different regions in addition
    // to All the regions (empty array) and user favorite countries
    All: [],
    Fav: [],
    Africa: [],
    Americas: [],
    Asia: [],
    Europe: [],
    Oceania: [],
    Antarctic: [],
  };

  countries.forEach((country) => {
    let restCountryData = {} as RestCountriesData;

    const {
      name,
      capital,
      region,
      subregion,
      borders,
      population,
      languages,
      tld,
      flags,
    } = country;

    restCountryData.commonName = name.common;

    restCountryData.nativeName = {};
    if (name.nativeName) {
      // Native name of the app will be an object with the key as
      // the native language and value the native name itself
      Object.keys(name.nativeName).forEach((keyLang) => {
        const value = name.nativeName[keyLang].common;
        restCountryData.nativeName[keyLang] = value;
      });
    }

    restCountryData.capital = capital;
    restCountryData.region = region;
    restCountryData.subregion = subregion;
    restCountryData.borders = borders;
    restCountryData.population = population;
    restCountryData.languages = languages;
    restCountryData.tld = tld;
    restCountryData.flags = flags;

    // The currency of this app is gonna have a name, a symbol
    // and it's rate conversion from $1 gotten from data from
    // Open exchange API
    const { currencies } = country;
    let tempCurrencies: {
      [key: string]: AppCurrencyData;
    } = {};

    if (currencies) {
      Object.keys(currencies).forEach((currencyCode) => {
        let conversionFrom1USD = rates.rates[currencyCode]
          ? rates.rates[currencyCode]
          : null;
        tempCurrencies[currencyCode] = {
          ...currencies[currencyCode],
          conversionFrom1USD,
        };
      });
    }
    restCountryData.currencies = tempCurrencies;

    const cca3 = country.cca3;
    regionList[region].push(cca3); // A list of countries in regions
    countryList[cca3] = restCountryData; // CCA is the key to country data
  });

  return { countryList, regionList };
};
