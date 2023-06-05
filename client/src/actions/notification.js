import { notificationTypes as types } from "./types";
import { NOTIFICATION_TYPE, NOTIFICATION_DURATION } from "../constants";

const showNotification = (message) => {
  let defaultMessage = {
    type: NOTIFICATION_TYPE.success,
    message: "Message",
    duration: NOTIFICATION_DURATION,
  };
  return {
    type: types.showNotification,
    notification: { ...defaultMessage, ...message },
  };
};
const resetNotification = (message) => {
  return {
    type: types.resetNotification,
  };
};
export { showNotification, resetNotification };
