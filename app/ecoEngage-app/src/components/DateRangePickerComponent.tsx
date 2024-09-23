import React, { useState } from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../assets/css/DateRangePickerComponent.css";

interface DateRangePickerProps {
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({
  onStartDateChange,
  onEndDateChange,
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs("2022-04-21"));

  const handleStartDateChange = (newDate: Dayjs | null) => {
    setStartDate(newDate);
    onStartDateChange(newDate);
  };

  const handleEndDateChange = (newDate: Dayjs | null) => {
    setEndDate(newDate);
    onEndDateChange(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="dateRangePicker-container">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;
