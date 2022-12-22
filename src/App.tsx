import "./App.css";
import { useAppContext } from "./context/appContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout, Home, Country } from "./pages";

function App() {
  const { loading, lightMode, toggleMode, countryList, regionList } =
    useAppContext();

  return (
    // <div>
    //   Hello world
    //   <h2>Lightmode: {lightMode ? "true" : "false"}</h2>
    //   <button onClick={toggleMode}>Toggle mode</button>
    //   <h2>{loading ? "loading..." : "loaded successfully"}</h2>
    //   <h4>{JSON.stringify({ countryList, regionList })}</h4>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="countries" element={<Home />} />
        </Route>
        <Route path="/countries" element={<SharedLayout />}>
          <Route path=":cca3" element={<Country />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
