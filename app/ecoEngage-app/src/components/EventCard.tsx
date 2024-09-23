import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Event } from "../models/Event";
import "../assets/css/EventCard.css";
import { Box } from "@mui/material";

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

function getImageURL(name: string) {
  return new URL(`../assets/images/plantationEvents/${name}`, import.meta.url)
    .href;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  return (
    <Card
      onClick={() => onClick(event)}
      className="cardContainer"
      sx={{
        cursor: "pointer",
        maxWidth: 345,
        borderRadius: "10px",
        border: "1px solid #323232",
        backgroundColor: "#323232",
      }}
    >
      <CardMedia
        component="img"
        alt={event.title}
        height="140"
        image={getImageURL(event.images[0])}
      />
      <CardContent className="cardContentBackground">
        <Box
          sx={{
            color: "#f0ead6",
            fontFamily: "Mate",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          {event.title}
        </Box>
        <Box
          sx={{
            marginTop: "8px",
            color: "rgba(240, 234, 214, 0.7)",
            fontFamily: "Montserrat",
            fontSize: "0.8rem",
          }}
        >
          {event.description}
        </Box>
      </CardContent>
      <CardActions className="cardActionBackground">
        <Button size="small" onClick={() => navigate(`/registerEvents`)}>
          {t("learnMore")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
