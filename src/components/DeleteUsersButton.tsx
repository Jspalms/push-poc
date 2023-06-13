"use client";

import { deleteUsers } from "@/actions/deleteUsers";
import { startTransition } from "react";

export const DeleteUsersButton = () => {
  return (
    <button
      onClick={() => startTransition(() => deleteUsers())}
      className="bg-red-400 border p-2 rounded-lg shadow-lg my-4"
    >
      Delete Users
    </button>
  );
};
