import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SharedLayout, Home, Country } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="countries" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/countries" element={<SharedLayout />}>
          <Route path=":cca3" element={<Country />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
