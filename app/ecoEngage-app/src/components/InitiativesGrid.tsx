import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { Initiative } from "../models/Initiative";
import { InitiativeService } from "../services/initiatives-service";
import InitiativeCard from "./InitiativeCard";
import { useTranslation } from "react-i18next";

const InitiativeGrid: React.FC = () => {
  const [initData, setInitData] = useState<Initiative[]>([]);

  useEffect(() => {
    // Fetch the initiatives data from the service
    InitiativeService.getInitiatives().then((data) => {
      setInitData(data);
    });
  }, []);

  const { t } = useTranslation("common");

  return (
    <Box sx={{ backgroundColor: "#121212" }}>
      <Box
        sx={{
          color: "#f0ead6",
          textAlign: "center",
          fontFamily: "Mate",
          fontWeight: "bold",
          fontSize: "3rem",
        }}
      >
        {t("initiativeTitle")}
      </Box>
      <Grid
        container
        spacing={6}
        sx={{
          height: "100%",
          marginTop: "-10px",
          padding: "0px 4vw",
          paddingBottom: "10vh",
        }}
      >
        {initData.map((card) => (
          <Grid key={card.name} item xs={6} sx={{}}>
            <InitiativeCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InitiativeGrid;
