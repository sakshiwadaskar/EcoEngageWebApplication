// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

export const environmentalTheme = createTheme({
  // theme configuration
  palette: {
    mode: 'dark', // Enable dark mode
    primary: {
      main: '#4caf50', // A vibrant teal, bringing life to the dark theme
      light: '#388e3c', // Lighter teal for highlights
      dark: 'rgba(0, 0, 0, 0.6)', // Darker teal for depth
    },
    secondary: {
      main: '#faed27', // Warm amber remains for vibrant contrasts
      light: '#ffff81',
      dark: '#c8a415',
    },
    background: {
      default: '#121212', // A very dark shade of teal as the background
      paper: 'rgba(0, 0, 0, 0.87)', // Slightly lighter shade for paper elements
    },
    text: {
      primary: '#f0ead6', // White for primary text to ensure legibility
      secondary: '#b0bec5', // Lighter grey for secondary text, offering good contrast without overpowering
    },
    error: {
      main: '#ff5252', // Bright red for clear error states
    },
    warning: {
      main: '#ffb74d', // Warm orange for warnings, ensuring visibility
    },
    info: {
      main: '#29b6f6', // Bright blue for informational elements to stand out
    },
    success: {
      main: '#4caf50', // A light, vibrant green for success messages, complementing the primary palette
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial', // Continuing with a serif font for elegance and readability
  },
  shape: {
    borderRadius: 8, // Keeping the softened corners for a friendly, approachable UI
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#121212', // Subtle, darker background for the sidebar
          color: '#f0ead6', // Ensuring text within the sidebar is legible
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});
