import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ThemeProvider,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  CssBaseline,
  Badge,
  Box,
  Modal,
} from "@mui/material";

import { environmentalTheme } from "../services/theme";
import LandingBar from "../components/LandingBar.tsx";
import { setUser } from "../store/user-slice.ts";
import useFetchUser from "../hooks/fetch-user-hook.ts";
import { AuthService } from "../services/auth-service.ts";
import { User } from "../models/User.ts";
import { useDispatch } from "react-redux";
import ProfileAvatar from "../components/ProfileAvatar.tsx";
import { useNavigate } from "react-router-dom";
import i18nInstance from "../i18n.ts";
import LogoutIcon from "@mui/icons-material/Logout";
import { getEventsForUser } from "../services/events-service.ts";
import { Event as CustomEvent } from "../models/Event.ts";
import EventComponent from "../components/EventComponent.tsx";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const UserProfilePage: React.FC = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const user = useFetchUser();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [email, setEmail] = useState(user?.email || "");
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [showEvents, setShowEvents] = useState(false);
  const handleClose = () => setShowEvents(false);
  const navigate = useNavigate();

  console.log(user);
  // Define the theme
  const languageOptions = [
    { value: "en", label: t("english") },
    { value: "es", label: t("spanish") },
    { value: "hi", label: t("hindi") },
  ];

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setBio(user?.bio || "");
    setEmail(user?.email || "");
    console.log(i18nInstance.language);
    getRegisteredEvents();
  }, [user]);

  const getRegisteredEvents = async () => {
    const data = await getEventsForUser(user?.userId!);
    setEvents(data);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      const newLang = event.target.value;
      i18nInstance.changeLanguage(newLang);
      updateUser({ ...user, language: newLang });
      localStorage.setItem("language", newLang);
    }
  };

  const handleLogOut = async () => {
    localStorage.clear();
    navigate("/signIn");
  };

  const updateUser = async (user: User) => {
    try {
      const updatedUser = await AuthService.updateUser(user);
      dispatch(setUser(updatedUser));
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <ThemeProvider theme={environmentalTheme}>
      <LandingBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          direction: "row",
          paddingTop: "16px",
          paddingLeft: "24px",
          paddingRight: "32px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            color: environmentalTheme.palette.text.primary,
            textAlign: "center",
          }}
        >
          {t("welcometotheEcoEngagePortal")} 🕺🏼🌴
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            onClick={() => setShowEvents(true)}
            sx={{
              marginTop: "16px",
              marginRight: "32px",
              backgroundColor: "rgba(240, 234, 214, 0.02)",
              borderRadius: "8px",
              borderColor: "rgba(240, 234, 214, 0.1)",
              borderWidth: "1px",
              borderStyle: "solid",
              display: "flex",
              flexDirection: "row",
              padding: "16px 12px 12px 16px",
            }}
          >
            <EventAvailableIcon
              sx={{
                color: "rgba(240, 234, 214, 0.5)",
              }}
            />
            <Box sx={{ padding: "0px 20px" }}>My Events</Box>
          </Box>
          <Box
            onClick={handleLogOut}
            sx={{
              marginTop: "16px",
              backgroundColor: "rgba(255, 180, 180, 0.075)",
              padding: "16px 12px 12px 16px",
              border: "1px #ff6961 solid",
              borderRadius: "8px",
            }}
          >
            <LogoutIcon
              sx={{
                color: "#ff6961",
              }}
            />
          </Box>
        </Box>
      </Box>
      <CssBaseline />
      <Container component="main" maxWidth="xl" sx={{ py: 5 }}>
        <Paper elevation={6} sx={{ p: 15 }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={4} textAlign="center">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <ProfileAvatar
                  firstName={user?.firstName || ""}
                  lastName={user?.lastName || ""}
                />
              </Badge>
              <Typography
                variant="h5"
                sx={{ mt: 2, color: environmentalTheme.palette.text.primary }}
              >
                {user?.firstName} {user?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label={t("email")}
                value={email}
                sx={{
                  my: 1,
                  "& .MuiInputBase-input": {
                    color: environmentalTheme.palette.text.primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: environmentalTheme.palette.secondary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("firstName")}
                value={firstName} // Use value prop instead of defaultValue
                onChange={(e) => setFirstName(e.target.value)} // Update firstName on input change
                sx={{
                  my: 1,
                  "& .MuiInputBase-input": {
                    color: environmentalTheme.palette.text.primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: environmentalTheme.palette.secondary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("lastName")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{
                  my: 1,
                  "& .MuiInputBase-input": {
                    color: environmentalTheme.palette.text.primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: environmentalTheme.palette.secondary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("bio")}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                sx={{
                  my: 1,
                  "& .MuiInputBase-input": {
                    color: environmentalTheme.palette.text.primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: environmentalTheme.palette.secondary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: environmentalTheme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                select
                fullWidth
                label={t("language")}
                value={user?.language || "en"}
                onChange={handleLanguageChange}
                variant="outlined"
                color="primary"
                sx={{
                  mt: 2,
                  mb: 3,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: environmentalTheme.palette.secondary.main,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: environmentalTheme.palette.primary.main,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: environmentalTheme.palette.primary.main,
                  },
                }}
              >
                {languageOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                onClick={() =>
                  updateUser({ ...user!, firstName, lastName, bio })
                }
                variant="contained"
                color="primary"
                sx={{
                  mt: 1,
                  backgroundColor: environmentalTheme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: environmentalTheme.palette.primary.light,
                  },
                }}
              >
                {t("savechanges")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Modal open={showEvents} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "25%",
            height: "100%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            alignContent: "center",
            alignItems: "center",
            p: 4,
            maxHeight: "90%", // Set max height for scrolling
            overflowY: "auto", //
          }}
        >
          {events.map((eventItem) => (
            <EventComponent
              key={eventItem.id}
              eventItem={eventItem}
              showRegisterButton={false}
            />
          ))}
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default UserProfilePage;
