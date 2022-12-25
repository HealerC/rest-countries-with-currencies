import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SelectInput from "../components/SelectInput";
import CardCountry from "../components/CardCountry";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home = () => {
  const navigate = useNavigate();
  const {
    search: { results, query, filterRegion },
    countryList,
    regionList,
    handleSearch,
    handleFilter,
  } = useAppContext();

  const handleCountryClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    navigate(`/countries/${event.currentTarget.id}`);
  };

  const countryElements = results.map((cca3) => {
    const {
      commonName,
      population,
      region,
      capital,
      flags: { svg: flagUrl },
    } = countryList[cca3];
    const cardContent = (
      <>
        <Typography gutterBottom variant="h5" component="h2">
          {commonName}
        </Typography>

        <Box>
          <Typography variant="h6" component="h3">
            Population
          </Typography>
          <Typography variant="body2" component="p">
            {population}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="h3">
            Region
          </Typography>
          <Typography variant="body2" component="p">
            {region}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="h3">
            Capital
          </Typography>
          <Typography variant="body2" component="p">
            {capital}
          </Typography>
        </Box>
      </>
    );
    return (
      <CardCountry
        cardImg={{ url: flagUrl, alt: commonName }}
        cardContent={cardContent}
        id={cca3}
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
