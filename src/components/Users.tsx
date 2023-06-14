import { User } from "@prisma/client";
import { SendPushNotificationButton } from "./SendNotificationButton";

export default function Users({ users }: { users: User[] }) {
  const userPush = users.map((user) => {
    const subscription = user.pushSubscription;
  });
  return (
    <div className="py-4">
      <h1 className="underline">Users</h1>
      <span>
        There are currently {users.length} users which are signed up for
        notifications{" "}
      </span>
      <table className="table-auto border-collapse border border-gray-500 max-w-full">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">User ID</th>
            <th className="border border-gray-500 px-4 py-2">Description</th>
            <th className="border border-gray-500 px-4 py-2">
              User Push Subscription
            </th>
            <th className="border border-gray-500 px-4 py-2">Notify</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-500 px-4 py-2">{user.id}</td>
              <td className="border border-gray-500 px-4 py-2">
                {user.description}
              </td>
              <td className="border border-gray-500 px-4 py-2 overflow-hidden max-w-xl">
                {JSON.stringify(user.pushSubscription)}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                <SendPushNotificationButton id={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
