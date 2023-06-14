export const isNotificationsPromise = () => {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }
  return true;
};
