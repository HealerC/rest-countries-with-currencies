import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SelectInput from "../components/SelectInput";
import CardCountry from "../components/CardCountry";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

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
      <Grid xs={4} sm={2} md={4} lg={3} key={cca3}>
        <CardCountry
          cardImg={{ url: flagUrl, alt: commonName }}
          cardContent={cardContent}
          id={cca3}
          handleClick={handleCountryClick}
        />
      </Grid>
    );
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          ["@media (max-width: 600px)"]: {
            flexDirection: "column",
            "& > *": {
              margin: "10px",
            },
          },
          my: 3,
        }}
      >
        <SearchBar value={query} handleChange={handleSearch} />
        <SelectInput
          value={filterRegion}
          onChange={handleFilter}
          items={Object.keys(regionList)}
        />
      </Box>
      <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
        {countryElements}
      </Grid>
    </Box>
  );
};

export default Home;
