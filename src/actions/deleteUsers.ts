"use server";

import { PrismaClient } from "@prisma/client";

export const deleteUsers = async () => {
  const db = new PrismaClient();

  await db.user.deleteMany({});
  console.log("users deleted");
};
