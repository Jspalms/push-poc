"use server";

import { prismaClient } from "@/lib/prismaClient";
import deleteSubscriptionFromDatabase from "./deleteSubscriptionFromDatabase";

const webpush = require("web-push");

export async function sendPushNotification(pushSubscriptionId: number) {
  const pushSubscription = await prismaClient.pushSubscription.findFirstOrThrow(
    {
      where: { id: pushSubscriptionId },
    }
  );
  console.log(pushSubscription);
  const payload = JSON.stringify({
    title: "test tile",
    icon: "/vercel.svg",
  });

  const options = {
    vapidDetails: {
      subject: "mailto:johnspalms@gmail.com",
      publicKey: process.env.NEXT_PUBLIC_PUSH_SERVICE_PUBLIC_KEY,
      privateKey: process.env.PUSH_SERVICE_PRIVATE_KEY,
    },
    //topic - optionally provide an identifier that the push service uses to coalesce notifications

    TTL: 60,
  };

  //send notification automatically encrypts the payload

  const response = await webpush.sendNotification(
    pushSubscription.pushSubscription,
    payload,
    options
  );

  if (response.statusCode === 404 || response.statusCode === 410) {
    console.log("Subscription has expired or is no longer valid: ");
    return deleteSubscriptionFromDatabase(pushSubscription.id);
  }

  console.log(response);
}
