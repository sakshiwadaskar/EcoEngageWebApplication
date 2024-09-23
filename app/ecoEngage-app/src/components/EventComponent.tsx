import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Carousel from "react-material-ui-carousel";
import { Event } from "../models/Event";
import "../assets/css/EventComponent.css";
import { Alert, Box, Snackbar } from "@mui/material";
import { registerForEvent } from "../services/events-service";
import useFetchUser from "../hooks/fetch-user-hook";

interface Props {
  eventItem: Event;
  showRegisterButton: boolean;
}

function getImageURL(name: string) {
  return new URL(`../assets/images/plantationEvents/${name}`, import.meta.url)
    .href;
}

const EventComponent: React.FC<Props> = ({ eventItem, showRegisterButton }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const user = useFetchUser();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = ("" + date.getFullYear()).slice(-2);

    return `${month}/${day}/${year}`;
  }

  return (
    <>
      <Paper elevation={3} className="event-container">
        <Box
          sx={{
            color: "#f0ead6",
            fontFamily: "Mate",
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "32px",
          }}
        >
          {eventItem.name}
        </Box>
        <Carousel className="event-image-carousel">
          {eventItem.images.map((image, index) => (
            <img
              key={index}
              src={getImageURL(image)}
              alt={`Event ${eventItem.name}`}
              className="event-image"
            />
          ))}
        </Carousel>
        <Box
          sx={{
            color: "#f0ead6",
            fontFamily: "Montserrat",
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "16px 0px",
            marginTop: "24px",
          }}
        >
          {eventItem.title}
        </Box>
        <Box
          sx={{
            color: "rgba(240, 234, 214, 0.7)",
            fontFamily: "Montserrat",
            fontSize: "1rem",
            textAlign: "center",
            margin: "0px 64px",
            marginBottom: "24px",
          }}
        >
          {eventItem.description}
        </Box>
        <Box
          sx={{
            color: "rgba(240, 234, 214, 0.9)",
            fontFamily: "Montserrat",
            fontSize: "1rem",
            textAlign: "center",
            margin: "0px 64px",
            marginBottom: "2px",
            fontWeight: "bold",
          }}
        >
          {`${formatDate(eventItem.eventStartDate.toString())} - ${formatDate(
            eventItem.eventEndDate.toString()
          )}`}{" "}
        </Box>
        <Box
          sx={{
            color: "rgba(240, 234, 214, 0.9)",
            fontFamily: "Montserrat",
            fontSize: "1rem",
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: "bold",
          }}
        >
          {eventItem.location.address1}, {eventItem.location.city},{" "}
        </Box>
        {showRegisterButton ? (
          <div
            onClick={() => {
              registerForEvent(eventItem, user!.userId);
              setSnackbarOpen(true);
            }}
          >
            <Box
              sx={{
                color: "rgba(0, 0, 0, 0.75)",
                fontFamily: "Montserrat",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "rgba(240, 234, 214, 1)",
                borderRadius: "100px",
                textAlign: "center",
                width: "40vw",
                padding: "12px 16px",
              }}
            >
              Register Now
            </Box>
          </div>
        ) : (
          <></>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => {}}
        >
          <Alert
            onClose={() => {
              setSnackbarOpen(false);
            }}
            severity={"success"}
          >
            {"Event registered successfully!"}
          </Alert>
        </Snackbar>
      </Paper>
    </>
  );
};

export default EventComponent;
