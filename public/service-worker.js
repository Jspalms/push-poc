self.addEventListener("push", async function (event) {
  // Handle push notification event

  const pushMessage = event.data.json();

  // Process the received push data and show a notification

  console.log(pushMessage);

  event.waitUntil(
    self.registration
      .showNotification(pushMessage.title, pushMessage.options)
      .catch((error) => {
        console.error("Error displaying notification:", error);
      })
  );
});

self.addEventListener("notificationclick", function (event) {
  // Handle notification click event
  event.notification.close();
  // Perform custom logic when the notification is clicked
  // For example, navigate to a specific page or open a new window
});

// Other service worker event listeners and logic
// such as install, activate, fetch, etc.
