import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

type CardProps = {
  cardImg: { url: string; alt: string };
  cardContent: React.ReactNode;
  id: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
const CardCountry = ({
  cardImg: { url, alt },
  cardContent,
  id,
  handleClick,
}: CardProps) => {
  return (
    <Card component="div" id={id} sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={url} alt={alt} />
        <CardContent>{cardContent}</CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardCountry;
