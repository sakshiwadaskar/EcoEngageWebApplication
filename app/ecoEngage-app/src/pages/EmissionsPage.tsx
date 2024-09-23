import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { EmissionsService, Gas } from "../services/emissions-service";
import LandingBar from "../components/LandingBar";
import CountUp from "react-countup";

const EmissionsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const [selectedGas, setSelectedGas] = useState<Gas>(Gas.Methane);
  const [emissions, setEmissions] = useState<number>(4500097084.147939);
  const [selectedInterval, setSelectedInterval] = useState<string>("year");
  const [_loading, setLoading] = useState<boolean>(true);

  const handleGasChange = (event: any) => {
    let gas: Gas;

    switch (event.target.value as string) {
      case "methane":
        gas = Gas.Methane;
        break;
      case "carbonmonoxide":
        gas = Gas.CarbonMonoxide;
        break;
      case "ozone":
        gas = Gas.Ozone;
        break;
      case "nitrogendioxide":
        gas = Gas.NitrogenDioxide;
        break;
      default:
        gas = Gas.Methane;
    }

    setSelectedGas(gas);
  };

  const handleIntervalChange = (event: any) => {
    console.log(event.target.value);
    setSelectedInterval(event.target.value);
  };

  const fetchNewData = async () => {
    setLoading(true);
    console.log(selectedInterval);
    const data = await EmissionsService.getEmissions(
      selectedGas,
      selectedInterval
    );
    setEmissions(data);
    setLoading(false);
  };

  useEffect(() => {
    console.log(selectedGas);
    console.log(selectedInterval);
    fetchNewData(); // This will log the updated value after each render
  }, [selectedInterval, selectedGas]); // This effect will run whenever selectedInterval changes

  const dropDownStyle = {
    fontSize: "1.75rem",
    fontFamily: "Mate",
    color: "#f0ead6",
    fontWeight: "bold",
    marginLeft: "16px",
    backgroundColor: "#121212",
    height: "100%",
    width: "100%",
  };

  return (
    <Box>
      <LandingBar />
      <Box
        sx={{
          backgroundColor: "#121212",
          width: "100vw",
          height: "100vh",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              fontSize: "8rem",
              fontFamily: "Mate",
              color: "#f0ead6",
              marginBottom: "6px",
            }}
          >
            <CountUp
              start={0}
              end={emissions}
              duration={2.75}
              separator=","
              decimals={0}
              decimal="."
            ></CountUp>
          </Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontFamily: "Mate",
              color: "#f0ead6",
              marginBottom: "32px",
              fontWeight: "bold",
            }}
          >
            {t("text1")}
          </Typography>
          <Select
            value={selectedGas}
            onChange={handleGasChange}
            autoWidth
            sx={{
              backgroundColor: "transparent",
              color: "#000000",
              minWidth: "120px",
              borderRadius: "60px",
              borderColor: "#f0ead6",
              borderWidth: "1px",
              borderStyle: "solid",
              marginBottom: "24px",
            }}
          >
            <MenuItem value="methane">
              <Typography sx={dropDownStyle}>{t("methane")}</Typography>
            </MenuItem>
            <MenuItem value="carbonmonoxide">
              <Typography sx={dropDownStyle}>{t("carbonMonoxide")}</Typography>
            </MenuItem>
            <MenuItem value="ozone">
              <Typography sx={dropDownStyle}>{t("ozone")}</Typography>
            </MenuItem>
            <MenuItem value="nitrogendioxide">
              <Typography sx={dropDownStyle}>{t("nitrogenDioxide")}</Typography>
            </MenuItem>
          </Select>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontFamily: "Mate",
              color: "#f0ead6",
              marginTop: "12px",
              fontWeight: "bold",
            }}
          >
            {t("text2")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Select
            value={selectedInterval}
            onChange={handleIntervalChange}
            fullWidth
            sx={{
              backgroundColor: "transparent",
              color: "#000000",
              minWidth: "120px",
              borderRadius: "60px",
              borderColor: "#f0ead6",
              borderWidth: "1px",
              borderStyle: "solid",
              marginTop: "16px",
            }}
          >
            <MenuItem value="year">
              <Typography sx={dropDownStyle}>{t("year")}</Typography>
            </MenuItem>
            <MenuItem value="month">
              {" "}
              <Typography sx={dropDownStyle}>{t("month")}</Typography>
            </MenuItem>
            <MenuItem value="week">
              {" "}
              <Typography sx={dropDownStyle}>{t("week")}</Typography>
            </MenuItem>
            <MenuItem value="day">
              {" "}
              <Typography sx={dropDownStyle}>{t("day")}</Typography>
            </MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default EmissionsPage;
