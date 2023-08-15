"use client";

const handleClick = (userName: string) => {
  const form = document.getElementById(
    "notificationDetails"
  ) as HTMLFormElement;

  const pushInput = form.querySelector("#userName");

  if (pushInput) {
    form.removeChild(pushInput);
  }

  const hiddenInput = document.createElement("input");
  hiddenInput.id = "userName";
  hiddenInput.type = "hidden";
  hiddenInput.name = "userName";
  hiddenInput.value = userName;
  form.appendChild(hiddenInput);

  form.requestSubmit();
};

export const SendPushNotificationButton = (props: { userName: string }) => {
  return (
    <button
      id="sendNotificationButton"
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        handleClick(props.userName);
      }}
      form="notificationDetails"
      className="border px-2 rounded-lg shadow-lg ml-2"
    >
      Notify
    </button>
  );
};
