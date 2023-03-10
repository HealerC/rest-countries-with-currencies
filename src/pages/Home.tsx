import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { SearchBar, SelectInput, CardCountry } from "../components";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Region } from "../utils/interfacesTypes";
import numeral from "numeral";

const Home = () => {
  const navigate = useNavigate();
  const {
    search: { results, query, filterRegion },
    countryList,
    regionList,
    handleSearch,
    handleFilter,
  } = useAppContext();

  // Go to the detailed page for a country clicked
  const handleCountryClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    navigate(`/countries/${event.currentTarget.id}`);
  };

  // A card for every country containing all relevant details
  const countryElements = results.map((cca3) => {
    const {
      commonName,
      population,
      region,
      capital,
      flags: { svg: flagUrl },
    } = countryList[cca3];

    const content = {
      commonName,
      population: numeral(population).format("0,0"),
      region,
      capital,
    };
    // Content of each card
    const cardContent = (
      <>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{ lineHeight: "1.5rem" }}
        >
          {content.commonName}
        </Typography>
        {Object.keys(content).map((key) => {
          if (key !== "commonName") {
            // Common name is rendered above
            return (
              <Typography
                key={key}
                variant="body1"
                component="p"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                <b style={{ marginRight: "0.5rem" }}>{key}:</b>
                {content[key as keyof typeof content]}
              </Typography>
            );
          }
        })}
      </>
    );

    // Each country card is a responsive grid item
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
          },
          my: 3,
        }}
      >
        <SearchBar
          sx={{
            width: "40%",
            ["@media (max-width: 600px)"]: { mb: 4, width: "100%" },
          }}
          value={query}
          handleChange={handleSearch}
        />
        <SelectInput
          value={filterRegion}
          onChange={handleFilter}
          items={Object.keys(regionList)}
        />
      </Box>

      {/* The container containing other grid items */}
      <Grid container spacing={6} columns={{ xs: 4, md: 12 }}>
        {countryElements}
      </Grid>
    </Box>
  );
};

export default Home;
