"use server";

import { prismaClient } from "../lib/prismaClient";

const webpush = require("web-push");

export async function sendPushNotification(id: number) {
  const foundUser = await prismaClient.user.findFirstOrThrow({
    where: { id: { equals: id } },
  });

  const pushSubscription = foundUser.pushSubscription;

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

    TTL: 60,
  };

  console.log("sending push notification");

  webpush.sendNotification(pushSubscription, payload, options);
}
