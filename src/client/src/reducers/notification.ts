import { createSlice } from '@reduxjs/toolkit'
interface Notification {
  message?: string,
  type: string
};

//   if (action.type.endsWith("_FAIL")) {
//     return {
//       ...state,
//       notification: <Notification>{
//         type: NOTIFICATION_TYPE.error,
//         message: action?.error?.response?.data?.message,
//         duration: NOTIFICATION_DURATION,

const initialState = {
  message: '', type: ''
} as Notification

const notificationReducer = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    showNotification: (state, action) => {
      return { ...state, message: action.payload.message, type: action.payload.type };
    },
    resetNotification: (state, action) => {
      return { ...state, message: action.payload.message, type: action.payload.type };
    },
  },
});

export default notificationReducer.reducer

export const { showNotification, resetNotification } = notificationReducer.actions