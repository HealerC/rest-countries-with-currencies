import { useEffect } from "react";
import "./App.css";
import useFetch, { APIFetchArgument } from "./utils/useFetch";

const countriesProcessor = (data: Object) => {
  return { countriesData: data };
};
const ratesProcessor = (data: Object) => {
  return { ratesData: data };
};
const fetchUrlsObject: APIFetchArgument = {
  rates: [
    `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_OPEN_EXCHANGE_APP_ID}`,
    ratesProcessor,
  ],
  countries: ["https://restcountries.com/v3.1/all", countriesProcessor],
};
function App() {
  const { loading, processedData } = useFetch(fetchUrlsObject);
  useEffect(() => {
    console.log(processedData);
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
