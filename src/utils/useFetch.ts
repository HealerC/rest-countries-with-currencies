import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface APIFetchArgument {
  [key: string]: [
    url: string,
    dataProcessor: (data: Object | Object[]) => Object
  ];
}

type ProcessedData = {
  [key: string]: Object;
};
interface APIFetchResponse {
  loading: boolean;
  processedData: ProcessedData;
}

const defaultState: APIFetchResponse = {
  loading: true,
  processedData: {},
};

export default function useFetch(fetchArgs: APIFetchArgument) {
  const [data, setData] = useState<APIFetchResponse>(defaultState);

  const getData = useCallback(() => {
    const apiAxiosKeys = Object.keys(fetchArgs);

    // Create an array (from the url argument passed into the function)
    // containing axios promises that will all be resolved at once
    const apiAxiosList = apiAxiosKeys.map((key) => {
      const url = fetchArgs[key][0]; // 0 is url, 1 is processor function
      return axios.get(url);
    });

    // Resolve all the url's passed to be fetched
    Promise.all(apiAxiosList)
      .then((results) => {
        const resultsProcessedData: ProcessedData = {};

        results.forEach((result, index) => {
          const key = apiAxiosKeys[index];
          // The indices of the result follows the indices of the keys
          // in the same order as defined in the object

          const resultProcessor = fetchArgs[key][1];
          const processedData = resultProcessor(result.data);
          resultsProcessedData[key] = processedData;
        });

        // The entire result of the hook set as the state
        setData((prevState) => ({
          ...prevState,
          processedData: resultsProcessedData,
        }));
      })
      .catch((error) => {
        throw new Error(error);
      })
      .then(() => {
        setData((prevState) => ({ ...prevState, loading: false }));
      });
  }, [fetchArgs]);

  useEffect(() => {
    getData();
  }, [fetchArgs, getData]);

  return data;
}
