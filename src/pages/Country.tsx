import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { CountryList, AppCurrencyData } from "../utils/interfacesTypes";
import { Navigate } from "react-router-dom";
import Conversion from "../components/Conversion";
import history from "history/browser";
import ButtonSimple from "../components/ButtonSimple";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

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
    <div>
      <ButtonSimple
        startIcon={<ArrowBackIcon />}
        handleClick={handleBackButtonClick}
      >
        Back
      </ButtonSimple>
      <IconButton onClick={() => toggleFav(cca3)} aria-label="favorite">
        {regionList.Fav.includes(cca3) ? <Favorite /> : <FavoriteBorderIcon />}
      </IconButton>
      Common name: {country.commonName}
      Native name: {Object.values(country.nativeName)}
      Population: {country.population}
      Region: {country.region}
      Subregion: {country.subregion}
      Capital: {country.capital}
      Top level domain: {country.tld}
      Languages: {Object.values(country.languages)}
      Flags {JSON.stringify(country.flags)}
      {country.currencies && getCurrencyComponents(country.currencies)}
      Border countries: {getBordersButtons(country.borders)}
    </div>
  );
};

export default Country;
