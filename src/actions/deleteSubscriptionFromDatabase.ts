"use server";

import { prismaClient } from "../lib/prismaClient";

export default async function deleteSubscriptionFromDatabase(
  pushSubscriptionId: number
) {
  await prismaClient.pushSubscription.delete({
    where: { id: pushSubscriptionId },
  });
}
