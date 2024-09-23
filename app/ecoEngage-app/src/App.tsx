import { CssBaseline } from "@mui/material"; // Import the CssBaseline component from Material-UI to reset default styles
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom to render nested routes
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { retriveEvents } from "./services/events-service";
import { AppDispatch } from "./store";
import { loadEvents } from "./store/event-slice";
import "./App.css"; // Import the CSS file for styling

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    retriveEvents().then((events) => {
      dispatch(loadEvents(events));
    });
  }, [dispatch]);
  return (
    <>
      <CssBaseline />
      {/* Apply global CSS baseline to reset default styles */}
      <Outlet />
      {/* Render the child routes defined in the routing configuration */}
    </>
  );
}

export default App; // Export the App component as the default export
