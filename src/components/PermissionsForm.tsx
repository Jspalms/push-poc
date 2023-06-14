"use client";

import { requestPermissions } from "@/actions/requestPermissions";
import { browserSupportsNotifications } from "@/lib/browserSupportsNotifications";
import { isNotificationsPromise } from "@/lib/isNotificationsPromise";
import { useEffect, useState } from "react";

export const PermissionsForm = () => {
  const [browserCapable, setBrowserCapable] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const capable = browserSupportsNotifications();
    setBrowserCapable(capable);
  }, []);
  if (!browserCapable)
    return <span>Push notifications are not supported on this browser</span>;
  return (
    <form className="my-4" action={requestPermissions}>
      <label htmlFor="userDescription">User Description : </label>
      <input
        type="text"
        id="userDescription"
        name="userDescription"
        className="border shadow-inner"
      ></input>
      <label htmlFor="permissionsCheck">Opt in to notifications? : </label>
      <input
        id="permissionsCheck"
        type="checkbox"
        name="permissionsCheckbox"
        className="border p-4 rounded "
        onChange={() => setChecked(true)}
        disabled={checked}
      />
      <button
        type="submit"
        className="border px-2 rounded-lg shadow-lg ml-2"
        disabled={!checked}
      >
        Submit
      </button>
    </form>
  );
};
