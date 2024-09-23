import React from "react";
import { Avatar, Typography, Box } from "@mui/material";

interface UserProfileProps {
  name: string;
  title: string;
  image: string;
}

const AuthorProfile: React.FC<UserProfileProps> = ({ name, title, image }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // Add your inline styles here
      }}
    >
      <Avatar src={image} />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="body2">{title}</Typography>
      </Box>
    </Box>
  );
};

export default AuthorProfile;
