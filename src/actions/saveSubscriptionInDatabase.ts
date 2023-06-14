"use server";

import { prismaClient } from "../lib/prismaClient";

export const saveSubscriptionInDatabase = async (
  description: string,
  pushSubscription: string
) => {
  await prismaClient.user.create({
    data: {
      description: description,
      pushSubscription: JSON.parse(pushSubscription),
    },
  });
};
