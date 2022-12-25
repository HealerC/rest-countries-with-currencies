import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SelectInput from "../components/SelectInput";
import CardCountry from "../components/CardCountry";

const Home = () => {
  const navigate = useNavigate();
  const {
    search: { results, query, filterRegion },
    countryList,
    regionList,
    handleSearch,
    handleFilter,
  } = useAppContext();

  const handleCountryClick = (cca3: string): void => {
    navigate(`/countries/${cca3}`);
  };

  const countryElements = results.map((cca3) => {
    const {
      commonName,
      population,
      region,
      capital,
      flags: { svg: flagUrl },
    } = countryList[cca3];
    return (
      <CardCountry
        cardImg={flagUrl}
        commonName={commonName}
        population={population}
        region={region}
        capital={capital}
        cca3={cca3}
        handleClick={handleCountryClick}
      />
    );
  });
  return (
    <div>
      <SearchBar value={query} handleChange={handleSearch} />
      <SelectInput
        value={filterRegion}
        onChange={handleFilter}
        items={Object.keys(regionList)}
      />
      {countryElements}
    </div>
  );
};

export default Home;
