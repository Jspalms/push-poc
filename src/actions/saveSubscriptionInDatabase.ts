"use server";

import { prismaClient } from "../lib/prismaClient";

export const saveSubscriptionInDatabase = async (
  name: string,
  pushSubscription: string
) => {
  const existingUser = await prismaClient.user.findFirst({
    where: { name: name },
  });

  if (existingUser) {
    await prismaClient.pushSubscription.create({
      data: {
        userId: name,
        pushSubscription: JSON.parse(pushSubscription),
      },
    });
  } else {
    await prismaClient.user.create({
      data: {
        name: name,
        pushSubscription: {
          create: {
            pushSubscription: JSON.parse(pushSubscription),
          },
        },
      },
    });
  }
};
