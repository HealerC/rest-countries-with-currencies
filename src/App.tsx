import "./App.css";
import { useAppContext } from "./context/appContext";

function App() {
  const { loading, lightMode, toggleMode, countryList, regionList } =
    useAppContext();
  return (
    <div>
      Hello world
      <h2>Lightmode: {lightMode ? "true" : "false"}</h2>
      <button onClick={toggleMode}>Toggle mode</button>
      <h2>{loading ? "loading..." : "loaded successfully"}</h2>
      <h4>{JSON.stringify({ countryList, regionList })}</h4>
    </div>
  );
}

export default App;
