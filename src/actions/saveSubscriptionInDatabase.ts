"use server";

import { PrismaClient } from "@prisma/client";

export const saveSubscriptionInDatabase = async (pushSubscription: string) => {
  const db = new PrismaClient();
  await db.user.create({
    data: {
      email: "anotherExample@something.com",
      pushSubscription: JSON.parse(pushSubscription),
    },
  });
};
