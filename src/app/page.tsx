import { DeleteUsersButton } from "@/components/DeleteUsersButton";
import { PermissionsForm } from "@/components/PermissionsForm";
import Users from "@/components/Users";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

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
      <PermissionsForm />
      <DeleteUsersButton />
    </main>
  );
}
