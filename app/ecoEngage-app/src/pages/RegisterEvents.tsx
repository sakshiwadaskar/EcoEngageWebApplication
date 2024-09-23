import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { Dayjs } from "dayjs";
import SearchBar from "../components/SearchBar";
import LandingBar from "../components/LandingBar";
import { environmentalTheme } from "../services/theme";
import { getAllEvents } from "../store/event-slice";
import EventComponent from "../components/EventComponent";
import DateRangePickerComponent from "../components/DateRangePickerComponent";
import { retriveEvents } from "../services/events-service";
import { loadEvents } from "../store/event-slice";
import { AppDispatch } from "../store";
import "../assets/css/RegisterEvents.css";

const RegisterEvents: React.FC = () => {
  const eventsState = useSelector(getAllEvents());
  const [queryObj, setQueryObj] = useState<object>({});
  const [keywordState, setKeyword] = useState<string>("");
  const [startDateState, setStartDate] = useState<Dayjs | null>(null);
  const [endDateState, setEndDate] = useState<Dayjs | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (value: string) => {
    setKeyword(value);
    console.log("Search value:", value);
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
    console.log("Start-Date value:", date);
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
    console.log("End-Date value:", date);
  };

  const buildQuery = (
    keyword: string,
    startDate: Dayjs | null,
    endDate: Dayjs | null
  ) => {
    console.log("Keyword:", keyword);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    const startDateString = startDate
      ? startDate.format("YYYY-MM-DD HH:mm:ss")
      : null;
    const endDateString = endDate
      ? endDate.format("YYYY-MM-DD HH:mm:ss")
      : null;
    return {
      providedKeyword: keyword,
      startDate: startDateString,
      endDate: endDateString,
    };
  };

  const handleSearchButton = () => {
    const query = buildQuery(keywordState, startDateState, endDateState);
    setQueryObj(query);
    console.log("Query:", query);
  };

  useEffect(() => {
    const isEmptyQuery = Object.keys(queryObj).length === 0;

    if (!isEmptyQuery) {
      retriveEvents(queryObj).then((events) => {
        dispatch(loadEvents(events));
      });
    }
  }, [dispatch, queryObj]);

  return (
    <ThemeProvider theme={environmentalTheme}>
      <div className="landing-bar-container">
        <LandingBar />
      </div>
      <Box
        className="container-1"
        sx={{
          backgroundColor: "#121212",
          paddingTop: "2rem",
        }}
      >
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="query-container">
          <Paper elevation={3}>
            <DateRangePickerComponent
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />
          </Paper>
        </div>
        <div className="search-button">
          <Button
            sx={{
              width: "50vw",
              height: "3rem",
              color: "#fff",
              fontFamily: "Montserrat",
              fontWeight: 600,
            }}
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearchButton}
          >
            Search
          </Button>
        </div>
        <div className="events-container">
          {eventsState.map((eventItem) => (
            <EventComponent
              key={eventItem.id}
              eventItem={eventItem}
              showRegisterButton={true}
            />
          ))}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default RegisterEvents;
