import useFetch from "../utils/useFetch";
import { APIFetchArgument } from "../utils/useFetch";
import { ratesDataProcessor } from "../utils/apiDataProcessors";
import { countriesDataProcessor } from "../utils/apiDataProcessors";
import { countriesRatesDataProcessor } from "../utils/apiDataProcessors";
import { CountryRates } from "../utils/apiDataProcessors";

const local = "http://localhost:5000/rates";
const localIp = "http://192.168.43.240:5000/rates";
const remote = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_OPEN_EXCHANGE_APP_ID}`;

export const fetchUrlsObject: APIFetchArgument = {
  rates: [local, ratesDataProcessor],
  countries: ["https://restcountries.com/v3.1/all", countriesDataProcessor],
};

export const useFetcher = () => {
  const { loading, processedData } = useFetch(fetchUrlsObject);
  //   useEffect(() => {
  //     if (
  //       processedData.countries &&
  //       Array.isArray(processedData.countries) &&
  //       processedData.rates
  //     ) {
  //       const final = countriesRatesDataProcessor(processedData as CountryRates);
  //       console.log(final);
  //     }
  //   }, [processedData]);

  if (
    processedData.countries &&
    Array.isArray(processedData.countries) &&
    processedData.rates
  ) {
    const final = countriesRatesDataProcessor(processedData as CountryRates);
    return { loading, data: final };
  }

  return { loading, data: null };
};
