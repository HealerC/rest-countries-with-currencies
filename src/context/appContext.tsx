import React, { useState, useEffect, createContext, useContext } from "react";
import { AppState } from "../utils/interfacesTypes";
import { useFetcher } from "./useFetcher";

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
    results: {},
  },
  favCountries: [],
  loading: true,
};
interface AppContext extends AppState {
  toggleMode: () => void;
}

const AppContext = createContext<AppContext | undefined>(undefined);

type ProviderProps = { children: React.ReactNode };
const AppProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState<AppState>(defaultState);
  const { loading, data } = useFetcher();

  useEffect(() => {
    setState((prevState) => {
      if (data) {
        return { ...prevState, loading, ...data };
      }
      return { ...prevState, loading };
    });
  }, [loading]);

  const toggleMode = () => {
    setState({ ...state, lightMode: !state.lightMode });
  };

  return (
    <AppContext.Provider value={{ ...state, toggleMode }}>
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
