import { createSlice } from '@reduxjs/toolkit'

import { notificationTypes as types } from "../actions/types";
import { NOTIFICATION_TYPE, NOTIFICATION_DURATION } from "../constants";

interface Notification {
  notification?: any,
};

// export const notificationReducer = (state: initialState, action: any) => {
//   if (action.type.endsWith("_FAIL")) {
//     return {
//       ...state,
//       notification: <Notification>{
//         type: NOTIFICATION_TYPE.error,
//         message: action?.error?.response?.data?.message,
//         duration: NOTIFICATION_DURATION,
//       },
//     };
//   }
//   switch (action.type) {
//     case types.showNotification:
//       return { ...state, notification: action.notification };
//     case types.resetNotification:
//       return state;
//     default:
//       return state;
//   }
// };

const initialState = {} as Notification


const notificationReducer = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    showNotification: (state, action) => {
      return { ...state, notification: action.payload.notification };
    },
    resetNotification: (state, action) => {
      return initialState;
    },
  },
});

export default notificationReducer.reducer

export const { showNotification, resetNotification } = notificationReducer.actions