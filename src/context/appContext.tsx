import React, { useState, useEffect, createContext, useContext } from "react";
import { AppState } from "../utils/interfacesTypes";
import { useFetcher } from "./useFetcher";
import { Region } from "../utils/interfacesTypes";

const defaultState: AppState = {
  countryList: {},
  regionList: {
    All: [],
    Africa: [],
    Americas: [],
    Asia: [],
    Europe: [],
    Oceania: [],
    Antarctic: [],
  },
  lightMode: true,
  search: {
    query: "",
    filterRegion: "All",
    results: [],
  },
  favCountries: [],
  loading: true,
};
interface AppContext extends AppState {
  toggleMode: () => void;
  handleSearch: (value: string) => void;
  handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AppContext = createContext<AppContext | undefined>(undefined);

type ProviderProps = { children: React.ReactNode };
const AppProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState<AppState>(defaultState);
  const { loading, data } = useFetcher();

  useEffect(() => {
    setState((prevState) => {
      if (data) {
        return {
          ...prevState,
          loading,
          ...data,
          search: {
            ...prevState.search,
            results: Object.keys(data.countryList),
          },
        };
      }
      return { ...prevState, loading };
    });
  }, [loading]);

  const toggleMode = () => {
    setState({ ...state, lightMode: !state.lightMode });
  };

  const globalResultsFilter = (results: string[], value: string) => {
    results = results.filter((key) => {
      const commonName = state.countryList[key].commonName;
      return commonName.toLowerCase().startsWith(value.toLowerCase());
    });
    return results;
  };
  const handleSearch = (value: string = state.search.query) => {
    let results =
      state.search.filterRegion === "All"
        ? Object.keys(state.countryList)
        : state.regionList[state.search.filterRegion];

    if (value) {
      results = globalResultsFilter(results, value);
    }
    setState({ ...state, search: { ...state.search, query: value, results } });
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let results: string[] = Object.keys(state.countryList);

    const value = event.target.value as Region;
    if (value !== "All") {
      results = state.regionList[value];
    }

    const searchValue = state.search.query;
    if (searchValue) {
      results = globalResultsFilter(results, searchValue);
    }
    setState({
      ...state,
      search: { ...state.search, filterRegion: value, results },
    });
  };

  return (
    <AppContext.Provider
      value={{ ...state, toggleMode, handleSearch, handleFilter }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useContext must be inside a Provider with a value");

  return context;
};

export { AppProvider, useAppContext };
