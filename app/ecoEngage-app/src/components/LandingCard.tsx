import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { getRandomImage } from "../services/background-image-service";
import { getRandomQuote } from "../services/quotes-service";

/**
 * Renders the main container component for the landing card.
 * This component displays a background image and a quote.
 */
const LandingCard = () => {
  const [backgroundImage, setBackgroundImage] = useState(getRandomImage());
  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    console.log("useEffect");
    updateImageAndQuote();
  }, []);

  /**
   * Updates the background image and quote at regular intervals.
   */
  const updateImageAndQuote = () => {
    setInterval(() => {
      setBackgroundImage(getRandomImage());
      setQuote(getRandomQuote());
    }, 4000);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-image 0.5s ease-in-out", // Fade animation for background image
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(20,56,36, 0.7)", // Adjust opacity as needed
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          fontFamily: "Mate",
          color: "#f0ead6",
          fontSize: "2.5rem",
          fontWeight: "bold",
          fontStyle: "italic",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20vh 20vw",
          transition: "opacity 0.5s ease-in-out", // Fade animation for text and image
          opacity: 1, // Initial opacity
        }}
      >
        " {quote} "
      </Box>
    </Box>
  );
};

export default LandingCard;
