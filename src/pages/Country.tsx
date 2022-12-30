import { useParams, useNavigate, Navigate } from "react-router-dom";
import history from "history/browser";
import numeral from "numeral";

import { useAppContext } from "../context/appContext";
import {
  CountryList,
  AppCurrencyData,
  RestCountriesData,
} from "../utils/interfacesTypes";
import { Conversion, ButtonSimple } from "../components";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";

// Just a title with its value used to render each data, and value
type CDProps = {
  name: string;
  data: React.ReactNode;
};
const CountryData = ({ name, data = "" }: CDProps) => {
  return (
    <Typography component="p" variant="body2" sx={{ mb: 0.75 }}>
      <b style={{ marginRight: "0.5rem" }}>{name}:</b>
      {data}
    </Typography>
  );
};

const Country = () => {
  const navigate = useNavigate();

  const cca3 = useParams().cca3 as string;
  const { countryList, toggleFav, regionList } = useAppContext();

  const handleBackButtonClick = () => {
    history.back();
  };

  // Meant to handle route where user enters a common name
  // using the URL string...
  const checkCountryForCca3 = (countryList: CountryList, cca3: string) => {
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

  // The conversion component is made up of two textboxes
  // that converts between dollar and the specified currency
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

  // The border countries are buttons that on click, take you to
  // the specified country
  const getBordersButtons = (borderCountries: string[]): React.ReactNode => {
    const buttonList = borderCountries.map((cca3) => {
      const commonName = countryList[cca3].commonName;
      return (
        <ButtonSimple
          key={cca3}
          sx={{ m: 0.5 }}
          variant="contained"
          startIcon={null}
          handleClick={() => navigate(`/countries/${cca3}`)}
        >
          {commonName}
        </ButtonSimple>
      );
    });
    return buttonList;
  };

  const getNativeNames = (country: RestCountriesData): React.ReactNode => {
    let nativeNameList = Object.keys(country.nativeName).map(
      (lang, index, array) => {
        const langString = country?.languages[lang];
        const nativeName = country?.nativeName[lang];
        return (
          <Tooltip title={langString} key={langString}>
            <Box
              component="span"
              sx={
                index !== array.length - 1
                  ? { ["::after"]: { content: `", "` } }
                  : undefined
              }
            >
              {nativeName}
            </Box>
          </Tooltip>
        );
      }
    );
    return nativeNameList;
  };

  const getCurrencyList = (country: RestCountriesData): React.ReactNode => {
    return Object.keys(country.currencies)
      .map((code) => {
        return country?.currencies[code].name;
      })
      .join(",");
  };

  let country = checkCountryForCca3(countryList, cca3);
  // 404 page not found, go to home route
  if (!country) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Box
      sx={{
        display: "flex", // Stack button and country info vertically
        flexDirection: "column",
        alignItems: "flex-start",
        px: 6,
      }}
    >
      <ButtonSimple
        variant="contained"
        sx={{ my: 6 }}
        startIcon={<KeyboardBackspaceIcon />}
        handleClick={handleBackButtonClick}
      >
        Back
      </ButtonSimple>
      <Box
        sx={{
          display: "flex", // Stack contents vertically on smaller devices
          ["@media (max-width: 600px)"]: { flexDirection: "column" },
        }}
      >
        {/* The country flag and favorite button */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardActionArea onClick={() => toggleFav(cca3)}>
            <Box
              component="img"
              src={country.flags.svg}
              alt={`${country.commonName} Flag`}
              sx={{ width: "350px", height: "auto" }}
            />
          </CardActionArea>
          <IconButton
            onClick={() => toggleFav(cca3)}
            sx={{ alignSelf: "center" }}
            aria-label="favorite"
          >
            {regionList.Fav.includes(cca3) ? (
              <Favorite />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
        {/* Main country content right of the flag */}
        <Box
          sx={{
            ml: 8,
            display: "flex",
            flexDirection: "column",
            ["@media (max-width: 600px)"]: { ml: "initial" },
          }}
        >
          <Typography
            component="h4"
            variant="h6"
            sx={{ fontWeight: "800", mb: 2 }}
          >
            {country.commonName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              ["@media (max-width: 600px)"]: {
                flexDirection: "column",
                justifyContent: "initial",
              },
            }}
          >
            <Box>
              <CountryData
                name="Native name"
                data={country.nativeName ? getNativeNames(country) : ""}
              />

              <CountryData
                name="Population"
                data={
                  country.population
                    ? numeral(country.population).format("0, 0")
                    : ""
                }
              />
              <CountryData
                name="Region"
                data={country.region ? country.region : ""}
              />
              <CountryData
                name="Subregion"
                data={country.subregion ? country.subregion : ""}
              />

              <CountryData
                name="Capital"
                data={country.capital ? country.capital.join(", ") : ""}
              />
            </Box>

            <Box
              sx={{
                ["@media (max-width: 600px)"]: { mt: 3 },
              }}
            >
              <CountryData
                name="Top level domain"
                data={country.tld ? country.tld.join(", ") : ""}
              />
              <CountryData
                name="Currencies"
                data={country.currencies ? getCurrencyList(country) : ""}
              />
              <CountryData
                name="Languages"
                data={
                  country.languages
                    ? Object.values(country.languages).join(", ")
                    : ""
                }
              />
            </Box>
          </Box>

          <Box>
            {country.currencies && getCurrencyComponents(country.currencies)}
          </Box>

          <CountryData
            name="Border countries"
            data={country.borders ? getBordersButtons(country.borders) : ""}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Country;
