type Notification = {
  type: string,
  message?: string,
}

export const showNotification = ({ type, message }: Notification) => {

  return {
    type,
    notification: message,
  };
};

export const resetNotification = ({ type }: Notification) => {
  return {
    type,
  };
};
