import { saveSubscriptionInDatabase } from "./saveSubscriptionInDatabase";
import { isNotificationsPromise } from "@/lib/isNotificationsPromise";

export const requestPermissions = async (formData: FormData) => {
  const formDescription = formData.get("userDescription") as string;
  alert("start of permissions request");

  //need to check the syntax of the request permission function as it differs across browsers
  if (isNotificationsPromise()) {
    alert("its the promise version");
    await Notification.requestPermission();
    await registerUserForPushNotifications();
  } else {
    alert("its the callback function");
    Notification.requestPermission((permission) =>
      registerUserForPushNotifications()
    );
  }

  async function registerUserForPushNotifications() {
    const permissionResponse = Notification.permission;
    alert(Notification.permission);
    if (permissionResponse == "granted") {
      await navigator.serviceWorker.register("/service-worker.js");
      const serviceWorker = await navigator.serviceWorker.ready;
      alert("serviceworker ready");
      const pushSubscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_PUSH_SERVICE_PUBLIC_KEY,
      });

      const stringPushSubscription = JSON.stringify(pushSubscription);
      alert(stringPushSubscription);

      saveSubscriptionInDatabase(formDescription, stringPushSubscription);
    }
    alert(`permissions are ${permissionResponse}`);
  }
};
