import { DeleteUsersButton } from "@/components/DeleteUsersButton";
import { PermissionsButton } from "@/components/PermissionsButton";
import { SendPushNotificationButton } from "@/components/SendNotificationButton";
import Users from "@/components/Users";
import { PrismaClient } from "@prisma/client";

async function getUsers() {
  const db = new PrismaClient();
  const users = await db.user.findMany();

  return users;
}

export default async function Home() {
  const users = await getUsers();
  return (
    <main className="container mx-auto">
      <Users users={users} />
      <PermissionsButton />
      <SendPushNotificationButton />
      <DeleteUsersButton />
    </main>
  );
}
