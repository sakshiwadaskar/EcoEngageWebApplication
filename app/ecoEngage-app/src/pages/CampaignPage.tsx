import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BasicMap from "../components/BasicMap"; // Update import statement
import EventCard from "../components/EventCard";
import { Event } from "../models/Event";
import { getAllEvents } from "../store/event-slice";
import "../assets/css/CampaignPage.css"; // Import the CSS file
import LandingBar from "../components/LandingBar";
import { Map } from "@maptiler/sdk"; // Import the Map type

const CampaignPage: React.FC = () => {
  const [_selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const map = useRef<Map | null>(null); // Define the type for the map ref
  const eventsState = useSelector(getAllEvents());

  const selectEvent = (event: Event) => {
    console.log(event.title);
    setSelectedEvent(event); // Update the state with the selected event

    // Go to the selected event's location on the map
    if (map && map.current) {
      map.current.flyTo({
        center: [event.location.longitude, event.location.latitude],
        zoom: 14,
      });
    }
  };

  return (
    <Box className="root">
      <Box className="landingBarContainer">
        <LandingBar></LandingBar>
      </Box>
      <Box className="mapContainer">
        <BasicMap events={eventsState} />{" "}
      </Box>
      <Box className="cardListContainer">
        <List style={{ paddingTop: "10px" }}>
          {eventsState.map((event) => (
            <ListItem key={event.id}>
              <EventCard event={event} onClick={selectEvent} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CampaignPage;
