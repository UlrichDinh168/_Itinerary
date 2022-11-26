import * as React from 'react';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';


// const CustomizedDateTimePicker = ({ value, onChange }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <MobileDateTimePicker
//         renderInput={(props) => <TextField {...props} />}
//         label='DateTimePicker'
//         value={value}
//         disablePast
//         onChange={onChange}
//       />
//     </LocalizationProvider>
//   );
// };


export default function MaterialUIPickers({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={onChange}
          disablePast
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}