import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./Calendar.css"; 

const calendarData = {
  "2024-02-20": [
    { time: "9 am", type: "Tablet", instructions: "2 pills a day", name: "Naproxen", quantity: "1 / Pill", provider: "Ashby Medical Center" },
    { time: "10 am", type: "Tablet", instructions: "1 pill a day", name: "Lipitor", quantity: "1 / Pill", provider: "Ashby Medical Center" },
  ],
  "2024-02-21": [
    { time: "3 pm", type: "Encounter", instructions: "Ashby Medical C..", name: "MRI Scan", quantity: "(1) Left arm scan", provider: "Dr. Candice Shah" },
    { time: "4 pm", type: "Tablet", instructions: "1 pill a day", name: "Lipitor", quantity: "(100mg) Pills", provider: "Ashby Medical Center" },
  ],
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const formattedDate = selectedDate.format("YYYY-MM-DD");
  const currentData = calendarData[formattedDate] || [];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TableContainer component={Paper} className="calendar-container">
        <Typography variant="h5" align="center" className="calendar-title">
          {selectedDate.format("MMMM D, YYYY")}
        </Typography>
        <div className="date-picker-container">
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </div>
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell><strong>Time</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Instructions</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Provider</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.instructions}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.provider}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No data available for this date</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </LocalizationProvider>
  );
};

export default Calendar;
