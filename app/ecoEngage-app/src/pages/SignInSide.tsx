import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth-service";

// Define a custom theme for the application
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Green
    },
    secondary: {
      main: "#ff5722", // Orange
    },
    error: {
      main: "#f44336", // Red
    },
    background: {
      default: "#fafafa", // Light grey
    },
  },
});

const SignInSide: React.FC = () => {
  const { t } = useTranslation("common");

  const navigate = useNavigate();
  // State for managing form errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    // Clear previous errors
    setErrors({
      email: "",
      password: "",
    });

    // Validate email format using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      // Set error if email is empty
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: t("erroremail"),
      }));
      return;
    } else if (!emailRegex.test(email)) {
      // Set error if email format is invalid
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: t("erroremailFormat"),
      }));
      return;
    }

    // Validate password
    if (!password) {
      // Set error if password is empty
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: t("errorpassword"),
      }));
      return;
    }

    // Proceed with form submission
    const accessToken = await AuthService.signIn(email, password);

    // If the credentials are invalid, no accessToken will be returned from
    // /signIn API
    if (!accessToken) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "This email or password is invalid",
        password: ".",
      }));
      return;
    }

    console.log("Access Token:", accessToken);

    localStorage.setItem("token", accessToken);
    navigate("/landingPage");
  };

  return (
    // ThemeProvider to apply custom theme to the component tree
    <ThemeProvider theme={customTheme}>
      {/* Grid container for layout */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* Global CSS baseline */}
        <CssBaseline />
        {/* Background image grid item */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // Background image styling
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Sign in form grid item */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Avatar */}
            <Avatar sx={{ m: 1, bgcolor: customTheme.palette.secondary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            {/* Sign in title */}
            <Typography component="h1" variant="h5">
              {t("signIn")}
            </Typography>
            {/* Sign in form */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* Email input field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("emailAddress")}
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email}
              />
              {/* Password input field */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("password")}
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password}
              />
              {/* Sign in button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("signIn")}
              </Button>
              {/* Links for forgot password and sign up */}
              <Grid container>
                <Grid item xs>
                  <Link to={`/changePassword`}>{t("forgotPassword")}</Link>
                </Grid>
                <Grid item>
                  <Link to={`/signUp`}>{t("dontHaveAccount")}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;
