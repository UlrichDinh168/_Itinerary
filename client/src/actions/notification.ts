import { notificationTypes as types } from "./types";
import { NOTIFICATION_TYPE, NOTIFICATION_DURATION } from "../constants";

export const showNotification = (message: string): {} => {
  let defaultMessage: {
    type: string,
    message: string,
    duration: number
  } =
  {
    type: NOTIFICATION_TYPE.success,
    message: "Message",
    duration: NOTIFICATION_DURATION,
  };
  return {
    type: types.showNotification,
    notification: { ...defaultMessage, message },
  };
};

export const resetNotification = (message: string) => {
  return {
    type: types.resetNotification,
  };
};
