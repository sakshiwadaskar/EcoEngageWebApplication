import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AuthService } from "../services/auth-service";

// Define the type for form errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// Custom MUI theme
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

// SignUpSide component
const SignUpSide: React.FC = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate(); // Hook to navigate between routes
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [errors, setErrors] = useState<FormErrors>({}); // State to manage form validation errors

  // Function to handle toggling password visibility
  const handleShowPassword = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const data = new FormData(event.currentTarget); // Get form data
    const formData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    // Clear previous errors
    setErrors({});

    // Validate fields
    let isValid = true;

    const newErrors: Record<string, string> = {};

    if (!formData.firstName) {
      newErrors["firstName"] = t("errorfirstName");
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors["lastName"] = t("errorlastName");
      isValid = false;
    }

    if (!formData.email) {
      newErrors["email"] = t("erroremail");
      isValid = false;
    } else if (!validateEmail(formData.email as string)) {
      newErrors["email"] = t("erroremailFormat");
      isValid = false;
    }

    if (!formData.password) {
      newErrors["password"] = t("errorpassword");
      isValid = false;
    } else if ((formData.password as string).length < 6) {
      newErrors["password"] = t("errorpasswordLength");
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors["confirmPassword"] = t("errorconfirmPassword");
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors["confirmPassword"] = t("errorpasswordMismatch");
      isValid = false;
    }

    if (isValid) {
      // Handle form submission (e.g., API call)
      console.log("Form data:", formData);

      const accessToken = await AuthService.signUp(
        formData.firstName as string,
        formData.lastName as string,
        formData.email as string,
        formData.password as string
      );
      console.log("Access Token:", accessToken);

      localStorage.setItem("token", accessToken);
      // Redirect or perform further actions after successful submission
      navigate("/");
    } else {
      // Set errors if validation fails
      setErrors(newErrors);
    }
  };

  // Function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // SignUpSide component JSX
  return (
    <ThemeProvider theme={customTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
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
            <Avatar sx={{ m: 1, bgcolor: customTheme.palette.secondary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("signUp")}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              {/* First Name Input */}
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={t("firstName")}
                autoFocus
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={{ mb: 2 }} // Add margin bottom
              />
              {/* Last Name Input */}
              <TextField
                required
                fullWidth
                id="lastName"
                label={t("lastName")}
                name="lastName"
                autoComplete="lname"
                error={!!errors.lastName}
                helperText={errors.lastName}
                sx={{ mb: 2 }} // Add margin bottom
              />
              {/* Email Input */}
              <TextField
                required
                fullWidth
                id="email"
                label={t("emailAddress")}
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 2 }} // Add margin bottom
              />
              {/* Password Input */}
              <TextField
                required
                fullWidth
                name="password"
                label={t("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
                sx={{ mb: 2 }} // Add margin bottom
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => handleShowPassword("password")}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              {/* Confirm Password Input */}
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label={t("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                sx={{ mb: 2 }} // Add margin bottom
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => handleShowPassword("confirmPassword")}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              {/* Sign Up Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("signUp")}
              </Button>
              {/* Link to Sign In */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={`/`}>{t("alreadyHaveAccount")}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUpSide;
