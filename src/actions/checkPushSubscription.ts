"use client";

export async function checkPushSubscription() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      console.log("User is subscribed to push notifications");
      return true;
    } else {
      console.log("User is not subscribed to push notifications");
      return false;
    }
  }
  return false;
}
