import { SendPushNotificationButton } from "./SendNotificationButton";
import { prismaClient } from "@/lib/prismaClient";

async function getUsers() {
  const users = await prismaClient.user.findMany({
    include: { pushSubscription: true },
  });

  return users;
}

export default async function UserList() {
  const users = await getUsers();

  return (
    <div className="border p-8 mt-4 shadow-md shadow-[#daa64c] w-fit">
      <h1 className="underline">Users</h1>
      <span>
        There are currently {users.length} users who are signed up for
        notifications{" "}
      </span>
      <table className="table-auto border-collapse border border-gray-500 max-w-full">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">User Name</th>
            <th className="border border-gray-500 px-4 py-2">
              Push Subscriptions
            </th>
            <th className="border border-gray-500 px-4 py-2">Notify</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name}>
              <td className="border border-gray-500 px-4 py-2">{user.name}</td>
              <td className="border border-gray-500 px-4 py-2">
                <ul className="gap-y-4 flex flex-col">
                  {user.pushSubscription.map((subscription) => (
                    <li key={subscription.id}>{subscription.description}</li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-500 px-4 py-2">
                <ul className="gap-y-4 flex flex-col">
                  {user.pushSubscription.map((subscription) => (
                    <li key={subscription.id}>
                      <SendPushNotificationButton
                        pushSubscriptionId={subscription.id}
                      />
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
