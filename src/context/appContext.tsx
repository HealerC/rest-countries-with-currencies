import React, { useState, useEffect, createContext, useContext } from "react";
import { AppState } from "../utils/interfacesTypes";
import { useFetcher } from "./useFetcher";
import { Region } from "../utils/interfacesTypes";

const defaultState: AppState = {
  countryList: {},
  regionList: {
    Africa: [],
    Americas: [],
    Asia: [],
    Europe: [],
    Oceania: [],
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
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let results: string[] = Object.keys(state.countryList);

    const value = event.target.value;
    if (value) {
      results = Object.keys(state.countryList).filter((key) => {
        const commonName = state.countryList[key].commonName;
        return commonName.toLowerCase().startsWith(value.toLowerCase());
      });
    }
    setState({ ...state, search: { ...state.search, query: value, results } });
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Region;
    setState({ ...state, search: { ...state.search, filterRegion: value } });
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
