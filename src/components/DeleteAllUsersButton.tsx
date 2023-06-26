"use client";

import { deleteAllUsers } from "@/actions/deleteAllUsers";
import { useRouter } from "next/navigation";

export const DeleteAllUsersButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        deleteAllUsers();
        router.refresh();
      }}
      className="bg-red-400 border p-2 rounded-lg shadow-lg my-4"
    >
      Delete All Users
    </button>
  );
};
