import { Box, Button } from "@mui/material";
import { Initiative } from "../models/Initiative";

type ModalProps = {
  card: Initiative;
  handleClose: () => void;
};

export const InitiativeModal: React.FC<ModalProps> = ({
  card,
  handleClose,
}) => {
  console.log(card.link);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(12,12,12,1)",
        borderRadius: "16px",
        borderColor: "rgba(240, 234, 214, 0.1)",
        borderWidth: "1px",
        borderStyle: "solid",
        padding: "32px",
      }}
    >
      <Box
        sx={{
          color: "#f0ead6",
          fontFamily: "Mate",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {card.name}
      </Box>
      <Box
        sx={{
          marginTop: "16px",
          color: "rgba(240, 234, 214, 0.5)",
          fontFamily: "Montserrat",
          fontSize: "1rem",
        }}
      >
        {card.description}
      </Box>
      <Box
        sx={{
          marginTop: "48px",
          color: "rgba(240, 234, 214, 0.75)",
          fontFamily: "Montserrat",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        Why should I donate?
      </Box>
      <Box
        sx={{
          marginTop: "16px",
          color: "rgba(240, 234, 214, 0.5)",
          fontFamily: "Montserrat",
          fontSize: "1rem",
        }}
      >
        {card.donate}
      </Box>
      <a href={card.link} target="_blank" rel="noopener noreferrer">
        <Box
          sx={{
            marginTop: "32px",
            marginBottom: "-32px",
            color: "rgba(0, 0, 0, 0.75)",
            fontFamily: "Montserrat",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "rgba(240, 234, 214, 1)",
            borderRadius: "100px",
            textAlign: "center",
            padding: "16px 16px",
          }}
        >
          Donate Now
        </Box>
      </a>

      <Button onClick={handleClose} sx={{ mt: 2 }}></Button>
    </Box>
  );
};
