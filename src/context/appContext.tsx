import React, { useState, createContext, useContext } from "react";
import { AppState } from "../utils/interfacesTypes";

const defaultState: AppState = {
  countries: {},
  regions: {
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
};
interface AppContext extends AppState {
  toggleMode: () => void;
}

const AppContext = createContext<AppContext | undefined>(undefined);

type ProviderProps = { children: React.ReactNode };
const AppProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState<AppState>(defaultState);

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
