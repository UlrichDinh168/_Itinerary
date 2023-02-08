/** @format */

import { notificationTypes as types } from "../actions/types";
import { NOTIFICATION_TYPE, NOTIFICATION_DURATION } from "../constants";

interface initialState {
  notification: null,
};

export const notificationReducer = (state: initialState, action: any) => {
  if (action.type.endsWith("_FAIL")) {
    return {
      ...state,
      notification: {
        type: NOTIFICATION_TYPE.error,
        message: action?.error?.response?.data?.message,
        duration: NOTIFICATION_DURATION,
      },
    };
  }
  switch (action.type) {
    case types.showNotification:
      return { ...state, notification: action.notification };
    case types.resetNotification:
      return state;
    default:
      return state;
  }
};
