import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { CountryList, AppCurrencyData } from "../utils/interfacesTypes";
import { Navigate } from "react-router-dom";
import Conversion from "../components/Conversion";
import history from "history/browser";
import ButtonSimple from "../components/ButtonSimple";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Country = () => {
  const navigate = useNavigate();

  const cca3 = useParams().cca3 as string;
  const { countryList, toggleFav, regionList } = useAppContext();

  const handleBackButtonClick = () => {
    // navigate("/");
    history.back();
  };

  const checkCountryForCca3 = (countryList: CountryList, cca3: string) => {
    console.log(countryList, cca3);
    if (countryList[cca3]) {
      return countryList[cca3];
    } else {
      // Maybe the user tried to search for the country using common name
      const queryCommonName: string = cca3.toLowerCase();
      for (let cca3key in Object.keys(countryList)) {
        const countryCommonName = countryList[cca3key].commonName.toLowerCase();

        if (queryCommonName === countryCommonName) {
          return countryList[cca3key];
        }
      }
      return undefined;
    }
  };

  type CurrenciesObject = {
    [currency: string]: AppCurrencyData;
  };
  const getCurrencyComponents = (
    currencies: CurrenciesObject
  ): React.ReactNode => {
    const components: JSX.Element[] = Object.keys(currencies).map(
      (currencyCode) => {
        const code = currencyCode;
        const symbol = currencies[currencyCode].symbol;
        const rate = currencies[currencyCode].conversionFrom1USD;
        const name = currencies[currencyCode].name;
        return (
          <Conversion
            key={code}
            code={code}
            name={name}
            symbol={symbol}
            rate={rate}
          />
        );
      }
    );
    return components;
  };
  const getBordersButtons = (
    borderCountries: string[] | undefined
  ): React.ReactNode => {
    if (borderCountries) {
      const buttonList = borderCountries.map((cca3) => {
        const commonName = countryList[cca3].commonName;
        return (
          <ButtonSimple
            sx={{ mx: 0.5 }}
            variant="contained"
            startIcon={null}
            handleClick={() => navigate(`/countries/${cca3}`)}
          >
            {commonName}
          </ButtonSimple>
        );
      });
      return buttonList;
    }
    return [];
  };

  let country = checkCountryForCca3(countryList, cca3);
  if (!country) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        px: 6,
      }}
    >
      <ButtonSimple
        sx={{ my: 6 }}
        startIcon={<KeyboardBackspaceIcon />}
        handleClick={handleBackButtonClick}
      >
        Back
      </ButtonSimple>
      <Box sx={{ display: "flex" }}>
        <Box>
          <Box
            component="img"
            src={country.flags.svg}
            alt={`${country.commonName} Flag`}
            sx={{ width: "350px", height: "auto" }}
          />
          <IconButton onClick={() => toggleFav(cca3)} aria-label="favorite">
            {regionList.Fav.includes(cca3) ? (
              <Favorite />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
        <Box sx={{ ml: 8, display: "flex", flexDirection: "column" }}>
          <Typography component="h4" variant="h6">
            {country.commonName}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography component="p" variant="body2">
                <b>Native name:</b>
                {Object.values(country.nativeName)}
              </Typography>
              <Typography component="p" variant="body2">
                <b>Population:</b>
                {country.population}
              </Typography>
              <Typography component="p" variant="body2">
                <b>Region:</b>
                {country.region}
              </Typography>
              <Typography component="p" variant="body2">
                <b>Subregion:</b>
                {country.subregion}
              </Typography>
              <Typography component="p" variant="body2">
                <b>Capital:</b>
                {country.capital}
              </Typography>
            </Box>

            <Box>
              <Typography component="p" variant="body2">
                <b>Top level domain:</b>
                {country.tld}
              </Typography>
              <Typography component="p" variant="body2">
                <b>Currencies:</b>
                {Object.keys(country.currencies)
                  .map((code) => {
                    return country?.currencies[code].name;
                  })
                  .join(",")}
              </Typography>
              <Typography component="p" variant="body2">
                <b>Languages:</b>
                {Object.values(country.languages).join(", ")}
              </Typography>
            </Box>
          </Box>

          <Box>
            {country.currencies && getCurrencyComponents(country.currencies)}
          </Box>
          <Box>Border countries: {getBordersButtons(country.borders)}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Country;
