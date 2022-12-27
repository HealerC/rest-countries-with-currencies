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
import { CardActionArea } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import numeral from "numeral";

type CDProps = {
  name: string;
  data: React.ReactNode;
};
const CountryData = ({ name, data }: CDProps) => {
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
        variant="contained"
        sx={{ my: 6 }}
        startIcon={<KeyboardBackspaceIcon />}
        handleClick={handleBackButtonClick}
      >
        Back
      </ButtonSimple>
      <Box
        sx={{
          display: "flex",
          ["@media (max-width: 600px)"]: { flexDirection: "column" },
        }}
      >
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
            <Box sx={{ backgroundColor: "pink" }}>
              <CountryData
                name="Native name"
                data={Object.keys(country.nativeName).map(
                  (lang, index, array) => {
                    const langString = country?.languages[lang];
                    const nativeName = country?.nativeName[lang];
                    return (
                      <Tooltip title={langString}>
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
                )}
              />
              <CountryData
                name="Population"
                data={numeral(country.population).format("0, 0")}
              />
              <CountryData name="Region" data={country.region} />
              <CountryData name="Subregion" data={country.subregion} />
              <CountryData name="Capital" data={country.capital.join(", ")} />
            </Box>

            <Box
              sx={{
                backgroundColor: "yellow",
                ["@media (max-width: 600px)"]: { mt: 3 },
              }}
            >
              <CountryData
                name="Top level domain"
                data={country.tld.join(", ")}
              />
              <CountryData
                name="Currencies"
                data={Object.keys(country.currencies)
                  .map((code) => {
                    return country?.currencies[code].name;
                  })
                  .join(",")}
              />
              <CountryData
                name="Languages"
                data={Object.values(country.languages).join(", ")}
              />
            </Box>
          </Box>

          <Box>
            {country.currencies && getCurrencyComponents(country.currencies)}
          </Box>
          <CountryData
            name="Border countries"
            data={getBordersButtons(country.borders)}
          />
          {/* <Box component="p">
            Border countries: {getBordersButtons(country.borders)}
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Country;
