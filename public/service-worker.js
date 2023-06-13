self.addEventListener("push", function (event) {
  // Handle push notification event
  console.log({ event, data: event.data });
  const pushData = event.data;
  // Process the received push data and show a notification
  const notificationOptions = {
    body: pushData?.message,
    icon: "/path/to/notification-icon.png",
    // other notification options
  };
  event.waitUntil(self.registration.showNotification("this is a test title"));
});

self.addEventListener("notificationclick", function (event) {
  // Handle notification click event
  event.notification.close();
  // Perform custom logic when the notification is clicked
  // For example, navigate to a specific page or open a new window
});

// Other service worker event listeners and logic
// such as install, activate, fetch, etc.
