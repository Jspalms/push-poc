"use server";

import { prismaClient } from "@/lib/prismaClient";
import deleteSubscriptionFromDatabase from "./deleteSubscriptionFromDatabase";

const webpush = require("web-push");

export async function sendPushNotification(formData: FormData) {
  console.log(formData);
  console.log("sendPushNotification");
  const pushId = formData.get("pushId") as string;
  const pushTitle = formData.get("pushTitle");
  const pushMessage = formData.get("pushMessage");
  const pushTag = formData.get("pushTag");
  const pushSubscription = await prismaClient.pushSubscription.findFirstOrThrow(
    {
      where: { id: +pushId },
    }
  );
  const payload = JSON.stringify({
    title: pushTitle,
    options: {
      icon: "/images/icons/icon-96x96.png",
      body: pushMessage,
      tag: pushTag,
    },
  });

  const options = {
    vapidDetails: {
      subject: "mailto:johnspalms@gmail.com",
      publicKey: process.env.NEXT_PUBLIC_PUSH_SERVICE_PUBLIC_KEY,
      privateKey: process.env.PUSH_SERVICE_PRIVATE_KEY,
    },
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
}
