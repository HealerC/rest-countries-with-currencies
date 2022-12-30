import React, { useState, useEffect, createContext, useContext } from "react";
import { AppState, Region } from "../utils/interfacesTypes";
import { useFetcher } from "./useFetcher";
import { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import appTheme from "../appTheme";

const defaultState: AppState = {
  countryList: {},
  regionList: {
    All: [],
    Fav: [],
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
  loading: true,
};
interface AppContext extends AppState {
  toggleMode: () => void;
  toggleFav: (cca3: string) => void;
  handleSearch: (value: string) => void;
  handleFilter: (event: SelectChangeEvent) => void;
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
            results: Object.keys(data.countryList), // All the cca3 is rendered
          },
        };
      }
      return { ...prevState, loading }; // App is still loading
    });
  }, [loading]);

  // Toggle light mode on/off
  const toggleMode = () => {
    setState({ ...state, lightMode: !state.lightMode });
  };

  // Toggle the fav status of a country... Add its cca3 to the Fav list
  const toggleFav = (cca3: string) => {
    let fav = state.regionList.Fav;
    if (fav.includes(cca3)) {
      fav = fav.filter((data) => data !== cca3);
    } else {
      fav.push(cca3);
    }
    setState({ ...state, regionList: { ...state.regionList, Fav: fav } });
  };

  // Basically filter the countries by commonName with search query
  // Params: The list of countries to search (cca3) and the query string
  const globalResultsFilter = (results: string[], value: string) => {
    results = results.filter((key) => {
      const commonName = state.countryList[key].commonName;
      return commonName.toLowerCase().startsWith(value.toLowerCase());
    });
    return results;
  };

  // Searching for data by inputing on the search input field
  const handleSearch = (value: string = state.search.query) => {
    // Search only within the filter
    let results =
      state.search.filterRegion === "All"
        ? Object.keys(state.countryList)
        : state.regionList[state.search.filterRegion];

    if (value) {
      // If nothing in the search box, return all results
      results = globalResultsFilter(results, value);
    }
    setState({ ...state, search: { ...state.search, query: value, results } });
  };

  const handleFilter = (event: SelectChangeEvent) => {
    let results: string[] = Object.keys(state.countryList);

    const value = event.target.value as Region;
    if (value !== "All") {
      results = state.regionList[value];
    }
    const searchValue = state.search.query;
    // Even after filtering, still search using the search box (if any)
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
      value={{ ...state, toggleMode, toggleFav, handleSearch, handleFilter }}
    >
      <ThemeProvider
        theme={state.lightMode ? appTheme("light") : appTheme("dark")}
      >
        <CssBaseline />
        {children}
      </ThemeProvider>
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
