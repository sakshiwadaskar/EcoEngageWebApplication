/**
 * This file contains the LandingPage component, which serves as the main landing page of the application.
 */
import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import LandingCard from "../components/LandingCard";
import LandingBar from "../components/LandingBar";
import FeatureCardRow from "../components/FeatureCardsRow";
import useFetchUser from "../hooks/fetch-user-hook";
import i18nInstance from "../i18n";
import InitiativeGrid from "../components/InitiativesGrid";

// Define the dark theme for the application
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Green color
    },
    background: {
      default: "#212121", // Dark background color
      paper: "#4caf50", // Darker background color for paper elements
    },
    text: {
      primary: "#4caf50", // White text color
    },
  },
});

/**
 * LandingPage component represents the main landing page of the application.
 */
const LandingPage: React.FC = () => {
  const user = useFetchUser(); // Use the custom hook to fetch user data

  useEffect(() => {
    i18nInstance.changeLanguage(user?.language);
  }, [user]);

  console.log("LandingPage", user);
  // Render the LandingPage component
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <LandingBar />
        <LandingCard />
        <FeatureCardRow />
        <InitiativeGrid />
      </ThemeProvider>
    </div>
  );
};
export default LandingPage;
