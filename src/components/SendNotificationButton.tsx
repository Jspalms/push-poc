import { sendPushNotification } from "@/actions/sendPushNotification";

export const SendPushNotificationButton = () => {
  return (
    <form action={sendPushNotification} method="POST">
      <label htmlFor="email">user email:</label>
      <input type="text" name="email" id="email" className="border rounded" />
      <button type="submit" className="border px-2 rounded-lg shadow-lg ml-2">
        Send Notification
      </button>
    </form>
  );
};
