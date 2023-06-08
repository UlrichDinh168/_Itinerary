import { notificationTypes as types } from './types';
import { NOTIFICATION_DURATION } from '../constants';

const showNotification = (message, type) => {
  let defaultMessage = {
    type,
    message: 'Something went wrong',
    duration: NOTIFICATION_DURATION,
  };
  return {
    type: types.showNotification,
    notification: { ...defaultMessage, ...message },
  };
};
const resetNotification = () => {
  return {
    type: types.resetNotification,
  };
};
export { showNotification, resetNotification };
