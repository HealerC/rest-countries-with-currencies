import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { CountryList } from "../utils/interfacesTypes";
import { Navigate } from "react-router-dom";

const Country = () => {
  const navigate = useNavigate();

  const cca3 = useParams().cca3 as string;
  const { countryList } = useAppContext();

  const handleBackButtonClick = () => {
    navigate("/");
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

  let country = checkCountryForCca3(countryList, cca3);
  if (!country) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div>
      <button onClick={handleBackButtonClick}>Back</button>
      Common name: {country.commonName}
      Native name: {Object.values(country.nativeName)}
      Population: {country.population}
      Region: {country.region}
      Subregion: {country.subregion}
      Capital: {country.capital}
      Top level domain: {country.tld}
      Languages: {Object.values(country.languages)}
      Border countries: {JSON.stringify(country.borders)}
      Currencies {JSON.stringify(country.currencies)}
      Flags {JSON.stringify(country.flags)}
    </div>
  );
};

export default Country;
