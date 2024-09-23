import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { ThemeProvider } from "@mui/material/styles";
import { environmentalTheme } from "../services/theme";
import "../assets/css/SearchBar.css";

interface SearchBarProps {
  onSearch: (value: string) => void; // Callback function to handle search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // Call the parent component's callback function with the updated search value
    onSearch(e.target.value);
  };

  return (
    <ThemeProvider theme={environmentalTheme}>
      <Paper
        className="searchBar-container"
        elevation={3}
        component="form"
        sx={{
          p: "12px 16px",
          width: "50vw",
          textAlign: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for events..."
          inputProps={{ "aria-label": "Keyword Search" }}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default SearchBar;
