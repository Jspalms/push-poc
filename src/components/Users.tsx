import { User } from "@prisma/client";

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
      <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">User ID</th>
            <th className="border border-gray-500 px-4 py-2">User Email</th>
            <th className="border border-gray-500 px-4 py-2">
              User Push Subscription
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-500 px-4 py-2">{user.id}</td>
              <td className="border border-gray-500 px-4 py-2">{user.email}</td>
              <td className="border border-gray-500 px-4 py-2">
                {JSON.stringify(user.pushSubscription)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
