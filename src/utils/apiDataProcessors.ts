import { RestCountriesData, CountryList } from "./interfacesTypes";
import {
  AppCurrencyData,
  RestCountriesAPI,
  OpenExchangeAPI,
} from "./interfacesTypes";
import { Region, RegionList } from "./interfacesTypes";

export const countriesDataProcessor = (data: Object) => {
  return data;
};

export const ratesDataProcessor = (data: Object) => {
  return data;
};

export type CountryRates = {
  countries: RestCountriesAPI[];
  rates: OpenExchangeAPI;
};

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
  let regionList: RegionList = {
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
