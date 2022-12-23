import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const {
    search: { results, query, filterRegion },
    countryList,
    handleSearch,
    handleFilter,
  } = useAppContext();

  const handleCountryClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cca3: string
  ): void => {
    navigate(`/countries/${cca3}`);
  };

  const countryElements = results.map((cca3) => {
    const { commonName, population, region, capital } = countryList[cca3];
    return (
      <div
        key={cca3}
        style={{ marginBottom: "1rem" }}
        onClick={(event) => handleCountryClick(event, cca3)}
      >
        Name: {commonName}
        Population: {population}
        Region: {region}
        Capital: {capital}
      </div>
    );
  });
  // "All" | "Africa" | "Americas" | "Asia" | "Europe" | "Oceania" | "Antarctic";
  return (
    <div>
      <input
        type="text"
        name="search"
        value={query}
        onChange={(event) => handleSearch(event.target.value)}
      />
      <select value={filterRegion} onChange={handleFilter}>
        <option value="All">All</option>
        <option value="Fav">Favourite</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antarctic</option>
      </select>
      {countryElements}
    </div>
  );
};

export default Home;
