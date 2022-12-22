import { useParams } from "react-router-dom";

const Country = () => {
  const { cca3 } = useParams();

  return <div>Country {cca3}</div>;
};

export default Country;
