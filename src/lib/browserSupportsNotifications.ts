export const browserSupportsNotifications = () => {
  if (!("serviceWorker" in navigator)) {
    return false;
  }
  if (!("PushManager" in window)) {
    return false;
  }
  if (!("Notification" in window)) {
    return false;
  }
  return true;
};
