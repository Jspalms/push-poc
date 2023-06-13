import { ChangeEvent } from "react";
import { saveSubscriptionInDatabase } from "./saveSubscriptionInDatabase";
import { removeUserFromDatabase } from "./removeUserFromDatabase";
import { revalidatePath } from "next/cache";

export const requestPermissions = async (
  event: ChangeEvent<HTMLInputElement>
) => {
  const checked = event.target.checked;
  if (checked) {
    const permissionResponse = await Notification.requestPermission();
    if (permissionResponse === "granted") {
      await navigator.serviceWorker.register("/service-worker.js");
      const serviceWorker = await navigator.serviceWorker.ready;
      serviceWorker.showNotification("this is a notification");
      const pushSubscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_PUSH_SERVICE_PUBLIC_KEY,
      });
      const stringPushSubscription = JSON.stringify(pushSubscription);

      saveSubscriptionInDatabase(stringPushSubscription);
    }
  }
};
