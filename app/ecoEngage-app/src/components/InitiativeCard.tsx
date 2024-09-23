import { Box, Card, Modal } from "@mui/material";
import { Initiative } from "../models/Initiative";
import { useState } from "react";
import { InitiativeModal } from "./InitiativeModal";

const InitiativeCard: React.FC<{ card: Initiative }> = ({ card }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Card
        onClick={() => setOpen(true)}
        sx={{
          height: "100%",
          backgroundColor: "rgba(240, 234, 214, 0.02)",
          borderRadius: "16px",
          borderColor: "rgba(240, 234, 214, 0.1)",
          borderWidth: "1px",
          borderStyle: "solid",
          transition:
            "box-shadow 0.5s ease, background-color 0.5s ease, border-color 0.5s ease",
          "&:hover": {
            boxShadow: `0px 0px 40px rgba(240, 234, 214, 0.1)`, // Larger shadow on hover
            borderColor: "rgba(240, 234, 214, 0.5)",
            backgroundColor: "rgba(240, 234, 214, 0.1)",
          },
        }}
      >
        <Box sx={{ padding: "32px" }}>
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
            {card.description.length > 100
              ? `${card.description.slice(0, 200)}...`
              : card.description}
          </Box>
        </Box>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <InitiativeModal card={card} handleClose={handleClose} />
      </Modal>
    </Box>
  );
};

export default InitiativeCard;
