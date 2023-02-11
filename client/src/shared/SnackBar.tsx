import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
// actions
import { notificationActions } from "../actions";

// const Alert = React.forwardRef(function Alert(props) {
//   return <Alert elevation={6} variant='filled' {...props} />;
// });

export default function BasicAlerts() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const notification = useSelector((state: any) => state.notification.notification);

  React.useEffect(() => {
    if (notification) {
      setOpen(true);
    }
  }, [notification]);

  const handleClose = () => {
    // if (reason === "clickaway") {
    //   return;
    // }
    dispatch(notificationActions.resetNotification());
    setOpen(false);
  };
  if (!notification) {
    return null;
  }

  const { message, duration, type } = notification;
  return (
    // <div className='snackbar'>
    //   <Stack open={open} autoHideDuration={duration} onClose={handleClose}>
    //     <div>
    //       <Alert onClose={handleClose} severity={type}>
    //         {message}
    //       </Alert>
    //     </div>
    //   </Stack>
    // </div>
    <Collapse in={open}>
      <Alert
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => handleClose()}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
