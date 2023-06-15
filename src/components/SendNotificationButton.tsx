"use client";

import { sendPushNotification } from "@/actions/sendPushNotification";

export const SendPushNotificationButton = (props: {
  pushSubscriptionId: number;
}) => {
  return (
    <button
      onClick={() => sendPushNotification(props.pushSubscriptionId)}
      className="border px-2 rounded-lg shadow-lg ml-2"
    >
      Notify
    </button>
  );
};
