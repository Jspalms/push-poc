import { saveSubscriptionInDatabase } from "./saveSubscriptionInDatabase";

export const requestPermissions = async (formName: string) => {
  const userName = formName.trim().toLocaleLowerCase();
  let response = await Promise.resolve(Notification.requestPermission());
  registerUserForPushNotifications(response);

  async function registerUserForPushNotifications(permissionResponse: string) {
    if (permissionResponse == "granted") {
      await navigator.serviceWorker.register("/service-worker.js");
      const serviceWorker = await navigator.serviceWorker.ready;
      const pushSubscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_PUSH_SERVICE_PUBLIC_KEY,
      });

      const stringPushSubscription = JSON.stringify(pushSubscription);

      await saveSubscriptionInDatabase(userName, stringPushSubscription);
    }
  }
};
