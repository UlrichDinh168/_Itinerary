import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import Collapse from '@mui/material/Collapse';
import { resetNotification } from "../reducers/notification";

export default function BasicAlerts() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { message, type } = useSelector((state: any) => state.notification);

  React.useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    dispatch(resetNotification({ message: '', type: '' }));
    setOpen(false);
  };
  if (!message) {
    return null;
  }

  return (
    <div className="notification" onClick={() => handleClose()}>
      <Collapse in={open} easing={{ enter: '1000', exit: '1000' }} >
        <Alert severity={type}>
          <span> {message}</span>
        </Alert>
      </Collapse>
    </div >
  );
}
