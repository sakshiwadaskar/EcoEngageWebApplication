import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Collapse, IconButton, Popover } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AuthService } from "../services/auth-service";

// Custom MUI theme
const theme = createTheme({
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

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation("common");

  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [emailFormatValid, setEmailFormatValid] = useState(false);
  const [emailPopoverMessage, setEmailPopoverMessage] = useState("");
  const [emailPopoverAnchorEl, setEmailPopoverAnchorEl] =
    useState<HTMLElement | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordsPopoverMessage, setPasswordsPopoverMessage] = useState("");
  const [passwordsPopoverAnchorEl, setPasswordsPopoverAnchorEl] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    // Focus the email text field when the component mounts
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // Function to validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailFormatValid(validateEmail(newEmail));
  };

  // Close email popover
  const handleEmailPopoverClose = () => {
    setEmailPopoverAnchorEl(null);
  };

  // Close passwords popover
  const handlePasswordPopoverClose = () => {
    setPasswordsPopoverAnchorEl(null);
  };

  // Handle form submission
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!emailFormatValid) {
      setEmailPopoverMessage(t("erroremailFormat"));
      setEmailPopoverAnchorEl(e.currentTarget as HTMLElement);
      return;
    }
    if (newPassword !== repeatPassword) {
      setPasswordsMatch(false);
      setPasswordsPopoverMessage(t("errorpasswordMismatch"));
      setPasswordsPopoverAnchorEl(e.currentTarget as HTMLElement);
      return;
    }

    await AuthService.changePassword(email, newPassword);
    setSubmitted(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Grid item xs={12} sm={8} md={5}>
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 4, position: "relative", zIndex: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LockOutlinedIcon
                sx={{ color: theme.palette.secondary.main, mb: 2 }}
              />
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: theme.palette.primary.main, mb: 2 }}
              >
                {t("forgotPassword")}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t("emailAddress")}
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={!emailFormatValid}
                  inputRef={emailRef}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: emailFormatValid
                          ? theme.palette.primary.main
                          : theme.palette.error.main,
                      },
                      "&:hover fieldset": {
                        borderColor: emailFormatValid
                          ? theme.palette.primary.main
                          : theme.palette.error.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: emailFormatValid
                          ? theme.palette.primary.main
                          : theme.palette.error.main,
                      },
                    },
                  }}
                />
                <Popover
                  open={!emailFormatValid && Boolean(emailPopoverAnchorEl)}
                  anchorEl={emailPopoverAnchorEl}
                  onClose={handleEmailPopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2" color="error">
                      {emailPopoverMessage}
                    </Typography>
                  </Box>
                </Popover>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="newPassword"
                  label={t("newPassword")}
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: theme.palette.primary.main },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="repeatPassword"
                  label={t("confirmPassword")}
                  name="repeatPassword"
                  type={showRepeatPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: theme.palette.primary.main },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowRepeatPassword(!showRepeatPassword)
                        }
                        edge="end"
                      >
                        {showRepeatPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                    "&:hover": { bgcolor: theme.palette.primary.dark },
                  }}
                >
                  {t("submit")}
                </Button>
              </Box>
              <Popover
                open={!passwordsMatch && Boolean(passwordsPopoverAnchorEl)}
                anchorEl={passwordsPopoverAnchorEl}
                onClose={handlePasswordPopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" color="error">
                    {passwordsPopoverMessage}
                  </Typography>
                </Box>
              </Popover>
              <Collapse in={submitted}>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, color: theme.palette.primary.main }}
                >
                  {t("passwordchanged")}
                </Typography>
              </Collapse>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography
                    component={Link}
                    to="/"
                    variant="body2"
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    {t("returntoSignin")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ForgotPassword;
