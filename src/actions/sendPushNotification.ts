"use server";

import { prismaClient } from "@/lib/prismaClient";

const webpush = require("web-push");

export async function sendPushNotification(formData: FormData) {
  const userName = formData.get("userName") as string;
  const pushTitle = formData.get("pushTitle");
  const pushMessage = formData.get("pushMessage");
  const pushTag = formData.get("pushTag");
  const icon = formData.get("icon");

  const payload = JSON.stringify({
    title: pushTitle,
    options: {
      icon: icon,
      body: pushMessage,
    },
  });

  const pushSubscriptions = await prismaClient.pushSubscription.findMany({
    where: { userId: userName },
  });

  const options = {
    vapidDetails: {
      subject: "mailto:johnspalms@gmail.com",
      publicKey: process.env.NEXT_PUBLIC_PUSH_SERVICE_PUBLIC_KEY,
      privateKey: process.env.PUSH_SERVICE_PRIVATE_KEY,
    },
    TTL: 60,
  };

  Promise.all(
    pushSubscriptions.map(async (subscription) => {
      try {
        const response = await webpush.sendNotification(
          subscription.pushSubscription,
          payload,
          options
        );
      } catch (error) {
        if ((error.statusCode = 410)) {
          console.log(["deleting stale subscription", subscription.id]);
          await prismaClient.pushSubscription.delete({
            where: { id: subscription.id },
          });
        }
      }
    })
  );

  //see if there is a sendMany or if there is a hub to queue up the messages
  //double check to make sure that no registration is needed
  //different connection string per tenant

  // const response = await webpush.sendNotification(
  //   pushSubscription.pushSubscription,
  //   payload,
  //   options
  // );

  // if (response.statusCode === 404 || response.statusCode === 410) {
  //   console.log("Subscription has expired or is no longer valid: ");
  //   return deleteSubscriptionFromDatabase(pushSubscription.id);
  // }
}
