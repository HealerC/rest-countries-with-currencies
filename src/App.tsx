import { useEffect } from "react";
import "./App.css";
import useFetch, { APIFetchArgument } from "./utils/useFetch";
import {
  countriesDataProcessor,
  ratesDataProcessor,
  countriesRatesDataProcessor,
  CountryRates,
} from "./utils/apiDataProcessors";

const local = "http://localhost:5000/rates";
const remote = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_OPEN_EXCHANGE_APP_ID}`;
const fetchUrlsObject: APIFetchArgument = {
  rates: [local, ratesDataProcessor],
  countries: ["https://restcountries.com/v3.1/all", countriesDataProcessor],
};

function App() {
  const { loading, processedData } = useFetch(fetchUrlsObject);
  useEffect(() => {
    if (
      processedData.countries &&
      Array.isArray(processedData.countries) &&
      processedData.rates
    ) {
      const final = countriesRatesDataProcessor(processedData as CountryRates);
      console.log(final);
    }
  }, [processedData]);
  return (
    <div>
      Hello world
      <h2>{loading ? "loading..." : "loaded successfully"}</h2>
      <h4>{JSON.stringify(processedData)}</h4>
    </div>
  );
}

export default App;
