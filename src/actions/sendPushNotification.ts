"use server";

import { PrismaClient } from "@prisma/client";

const webpush = require("web-push");

export async function sendPushNotification(formData: FormData) {
  const db = new PrismaClient();
  const userEmail = formData.get("email") as string;
  const foundUser = await db.user.findFirstOrThrow({
    where: { email: { equals: userEmail } },
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
