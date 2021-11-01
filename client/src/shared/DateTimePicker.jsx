/** @format */

import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";

const CustomizedDateTimePicker = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label='DateTimePicker'
        value={value}
        disablePast
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};
export default CustomizedDateTimePicker;
