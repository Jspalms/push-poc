import { DeleteAllUsersButton } from "@/components/DeleteAllUsersButton";
import { PermissionsForm } from "@/components/PermissionsForm";
import UserList from "@/components/UserList";

export default async function Home() {
  return (
    <main className="container mx-auto">
      <UserList />
      <PermissionsForm />
      <DeleteAllUsersButton />
    </main>
  );
}
