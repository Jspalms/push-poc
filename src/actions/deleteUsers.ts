"use server";

import { prismaClient } from "../lib/prismaClient";

export const deleteUsers = async () => {
  await prismaClient.user.deleteMany({});
  console.log("users deleted");
};
