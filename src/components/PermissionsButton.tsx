"use client";

import { removeUserFromDatabase } from "@/actions/removeUserFromDatabase";
import { requestPermissions } from "@/actions/requestPermissions";
import { saveSubscriptionInDatabase } from "@/actions/saveSubscriptionInDatabase";
import { revalidatePath } from "next/cache";
import { ChangeEvent, useEffect, useState } from "react";

export const PermissionsButton = () => {
  const [browserCapable, setBrowserCapable] = useState(false);
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      // Service Worker isn't supported on this browser, disable or hide UI.
      return;
    }

    if (!("PushManager" in window)) {
      // Push isn't supported on this browser, disable or hide UI.
      return;
    }
    setBrowserCapable(true);
  }, []);

  if (!browserCapable) return null;
  return (
    <form className="my-4">
      <label htmlFor="permissionsCheck">Opt in to notifications: </label>
      <input
        id="permissionsCheck"
        type="checkbox"
        onChange={requestPermissions}
        className="border p-4 rounded "
      />
    </form>
  );
};
