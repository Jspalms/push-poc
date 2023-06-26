"use client";

import { useTransition } from "react";

const handleClick = (pushId: string) => {
  const form = document.getElementById(
    "notificationDetails"
  ) as HTMLFormElement;

  const pushInput = document.getElementById("pushId");

  if (pushInput) {
    form.removeChild(pushInput);
  }

  const hiddenInput = document.createElement("input");
  hiddenInput.id = "pushId";
  hiddenInput.type = "hidden";
  hiddenInput.name = "pushId";
  hiddenInput.value = pushId;
  form.appendChild(hiddenInput);

  form.requestSubmit();
};

export const SendPushNotificationButton = (props: {
  pushSubscriptionId: number;
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <button
      id="test"
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        handleClick(props.pushSubscriptionId.toString());
      }}
      form="notificationDetails"
      className="border px-2 rounded-lg shadow-lg ml-2"
    >
      Notify
    </button>
  );
};
