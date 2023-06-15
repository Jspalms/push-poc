self.addEventListener("push", function (event) {
  // Handle push notification event
  const json = event.data.json;
  console.log({ event, data: event.data, json });
  const pushData = event.data;
  // Process the received push data and show a notification
  const notificationOptions = {
    body: pushData?.message,
    icon: "/path/to/notification-icon.png",
    // other notification options
  };
  event.waitUntil(self.registration.showNotification("when does this change"));
});

self.addEventListener("notificationclick", function (event) {
  // Handle notification click event
  event.notification.close();
  // Perform custom logic when the notification is clicked
  // For example, navigate to a specific page or open a new window
});

// Other service worker event listeners and logic
// such as install, activate, fetch, etc.
