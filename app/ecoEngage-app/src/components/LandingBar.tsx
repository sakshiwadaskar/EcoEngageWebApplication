import styled from "@emotion/styled";
import { createTheme } from "@mui/material/styles";
import { Toolbar, List } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/**
 * LandingBar component represents the navigation bar at the top of the page.
 * It displays the EcoEngage Portal logo and a list of sections.
 */
const LandingBar: React.FC = () => {
  /**
   * Section interface represents a section in the navigation bar.
   * It contains a title and a URL.
   */
  interface Section {
    title: string;
    url: string;
  }
  const { t } = useTranslation("common");
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#121212",
      },
    },
  });

  const eggshell = "#f0ead6";

  const LogoStyle = styled.h1`
    font-family: "Mate";
    color: #f0ead6;
    font-size: 1.5rem;
  `;

  const sections: Section[] = [
    { title: t("home"), url: "/landingPage" },
    { title: t("treeCampaign"), url: "/treeCampaignPage" },
    { title: t("myFeed"), url: "/feed" },
    { title: t("globalEmissions"), url: "/emissions" },
    { title: t("myProfile"), url: "/myProfile" },
  ];

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/landingPage");
  };

  return (
    <React.Fragment>
      <div
        className="landingBarContainer"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
      >
        <Toolbar
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: darkTheme.palette.primary.main,
          }}
        >
          <LogoStyle>{t("ecoEngagePortal1")}</LogoStyle>
          <List
            component="nav"
            sx={{
              color: "#ffffff",
              display: "flex",
              gap: "40px",
              "& a": {
                textDecoration: "none",
                color: eggshell,
                fontFamily: "Montserrat, sans-serif", // Custom font for section links
                letterSpacing: "0.5px",
                fontWeight: "900",
                transition: "border-bottom 0.75s ease", // Animation for underline
                borderBottom: "2px solid transparent", // Initially transparent underline
                "&:hover": {
                  marginBottom: "-2px", // Move underline up
                  borderBottom: `2px solid ${eggshell}`, // White underline on hover
                },
              },
            }}
          >
            {sections.map((section, index) => (
              <a key={index} href={section.url}>
                {section.title}
              </a>
            ))}
          </List>
        </Toolbar>
      </div>
    </React.Fragment>
  );
};

export default LandingBar;
