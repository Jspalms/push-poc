"use server";

import { prismaClient } from "../lib/prismaClient";

export const deleteAllUsers = async () => {
  const deleteSubscriptions = prismaClient.pushSubscription.deleteMany();
  const deleteUsers = prismaClient.user.deleteMany();
  console.log("users deleted");

  await prismaClient.$transaction([deleteSubscriptions, deleteUsers]);
};
