"use client";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { requestPermissions } from "@/actions/requestPermissions";
import { checkPushSubscription } from "@/actions/checkPushSubscription";

export default function UnsubscribeButton({ userName }: { userName: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const subscribed = async () => {
      const subscribed = await checkPushSubscription();
      setEnabled(subscribed);
    };
    subscribed();
  }, []);

  const handleChange = async () => {
    const sw = await navigator.serviceWorker.ready;

    if (enabled) {
      const subscription = await sw.pushManager.getSubscription();
      if (await subscription?.unsubscribe()) {
        setEnabled(false);
      }
    } else {
      console.log("enabling");
      requestPermissions(userName);
      setEnabled(true);
    }
  };
  return (
    <Switch
      onChange={handleChange}
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
