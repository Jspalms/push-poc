"use server";

import { prismaClient } from "../lib/prismaClient";

export const removeUserFromDatabase = async (number: number) => {
  await prismaClient.user.delete({
    where: { id: number },
  });
};
