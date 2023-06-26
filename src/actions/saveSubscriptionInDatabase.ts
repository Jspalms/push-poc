"use server";

import { prismaClient } from "../lib/prismaClient";

export const saveSubscriptionInDatabase = async (
  name: string,
  pushDescription: string,
  pushSubscription: string
) => {
  const existingUser = await prismaClient.user.findFirst({
    where: { name: name },
  });

  if (existingUser) {
    await prismaClient.pushSubscription.create({
      data: {
        userId: name,
        description: pushDescription,
        pushSubscription: JSON.parse(pushSubscription),
      },
    });
  } else {
    await prismaClient.user.create({
      data: {
        name: name,
        pushSubscription: {
          create: {
            description: pushDescription,
            pushSubscription: JSON.parse(pushSubscription),
          },
        },
      },
    });
  }
};
