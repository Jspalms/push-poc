import { saveSubscriptionInDatabase } from "./saveSubscriptionInDatabase";
import { isNotificationsPromise } from "@/lib/isNotificationsPromise";

export const requestPermissions = async (formData: FormData) => {
  const userName = formData.get("userName") as string;
  const pushDescription = formData.get("pushDescription") as string;

  //need to check the syntax of the request permission function as it differs across browsers
  if (isNotificationsPromise()) {
    await Notification.requestPermission();
    await registerUserForPushNotifications();
  } else {
    Notification.requestPermission(() => registerUserForPushNotifications());
  }

  async function registerUserForPushNotifications() {
    const permissionResponse = Notification.permission;
    if (permissionResponse == "granted") {
      await navigator.serviceWorker.register("/service-worker.js");
      const serviceWorker = await navigator.serviceWorker.ready;
      const pushSubscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_PUSH_SERVICE_PUBLIC_KEY,
      });

      const stringPushSubscription = JSON.stringify(pushSubscription);

      saveSubscriptionInDatabase(
        userName,
        pushDescription,
        stringPushSubscription
      );
    }
  }
};
