import { Box, Typography } from "@mui/material";
import React from "react";
import ParkIcon from "@mui/icons-material/Park";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import TableChartIcon from "@mui/icons-material/TableChart";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

type FeatureCardProps = {
  title: string;
  description: string;
  color: string;
  index: number;
};

export const FeatureCard: React.FC<FeatureCardProps> = (card) => {
  const hexColor = card.color.slice(1);

  // Convert hex color to RGB format
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Getting the icon for the correct feature
  const getIconForIndex = (index: number) => {
    const iconStyle = {
      color: `rgba(${r}, ${g}, ${b}, 1)`,
      fontSize: "50px",
      marginBottom: "4vh",
    };

    if (index == 0) return <ParkIcon sx={iconStyle} />;
    if (index == 1) return <DynamicFeedIcon sx={iconStyle} />;
    if (index == 2) return <TableChartIcon sx={iconStyle} />;
    return <PersonIcon sx={iconStyle} />;
  };

  const navigate = useNavigate();

  const handleClick = () => {
    switch (card.index) {
      case 0:
        navigate("/treeCampaignPage");
        break;
      case 1:
        navigate("/feed");
        break;
      case 2:
        navigate("/emissions");
        break;
      case 3:
        navigate("/myProfile");
    }
  };

  return (
    <Box
      onClick={handleClick} // navigate to particular section
      sx={{
        width: "calc(25% - 20px)", // Roughly one third of the screen width
        marginTop: "40px",
        marginLeft: "30px",
        marginRight: "30px",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        position: "relative",
        borderColor: `rgba(${r}, ${g}, ${b}, 0)`,
        borderWidth: "1px",
        borderStyle: "solid",
        transition: "box-shadow 0.3s ease", // Transition for hover effect
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        "&:hover": {
          boxShadow: `0px 0px 40px rgba(${r}, ${g}, ${b}, 0.25)`, // Larger shadow on hover
          borderColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#121212",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.05)`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </Box>
      <Box sx={{ padding: "12px", position: "absolute" }}>
        {getIconForIndex(card.index)}

        <Typography
          variant="h2"
          sx={{
            color: `rgba(${r}, ${g}, ${b}, 1)`,
            fontSize: "1.5rem",
            marginBottom: "2vh",
            fontFamily: "Montserrat",
            fontWeight: "bold",
          }}
        >
          {card.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(150, 150, 150, 1)",
            fontSize: "1rem",
            fontFamily: "Montserrat",
          }}
        >
          {card.description}
        </Typography>
      </Box>
    </Box>
  );
};
