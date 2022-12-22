import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const {
    search: { results },
  } = useAppContext();

  const handleCountryClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cca3: string
  ): void => {
    navigate(`/countries/${cca3}`);
  };

  const countryElements = Object.keys(results).map((cca3) => {
    const { commonName, population, region, capital } = results[cca3];
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

  return <div>{countryElements}</div>;
};

export default Home;
