import { IUser } from "~/types/IUser";
import prisma from "../database/client";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    select: { id: true, username: true },
  });
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    select: { id: true, email: true },
  });
}

export async function createUser(user: IUser) {
  return await prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
}
