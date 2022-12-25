import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";

type Props = {
  cardImg: string;
  commonName: string;
  population: number;
  region: string;
  capital: string[];
  cca3: string;
  handleClick: (cca3: string) => void;
};
const CardCountry = ({
  cardImg,
  commonName,
  population,
  region,
  capital,
  cca3,
  handleClick,
}: Props) => {
  return (
    <Card
      component="div"
      sx={{ maxWidth: 345 }}
      onClick={(e) => handleClick(cca3)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cardImg}
          alt={commonName}
        />
        <CardContent>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardCountry;
