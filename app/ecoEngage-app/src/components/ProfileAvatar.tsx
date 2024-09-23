import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

interface Props {
  firstName: string;
  lastName: string;
}

const ProfileAvatar: React.FC<Props> = ({ firstName, lastName }) => {
  // Function to get initials from first name and last name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: "#ffb74d", width: 100, height: 100 }}>
        {getInitials(firstName, lastName)}
      </Avatar>
    </Stack>
  );
};

export default ProfileAvatar;
