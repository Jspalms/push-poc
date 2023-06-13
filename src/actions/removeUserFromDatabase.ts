"use server";

import { PrismaClient } from "@prisma/client";
import { equal } from "assert";

export const removeUserFromDatabase = async (userEmailAddress: string) => {
  const db = new PrismaClient();
  await db.user.delete({
    where: { email: userEmailAddress },
  });
};
