import { DeleteAllUsersButton } from "@/components/DeleteAllUsersButton";
import NotificationDetailsForm from "@/components/NotificationDetailsForm";
import { PermissionsForm } from "@/components/PermissionsForm";
import UserList from "@/components/UserList";

export default async function Home() {
  return (
    <main className="container mx-auto">
      <PermissionsForm />

      <NotificationDetailsForm />
      <UserList />

      <DeleteAllUsersButton />
    </main>
  );
}
