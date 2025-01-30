import prisma from "~/prisma/client";
import { IUser } from "~/types/IUser";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    select: { id: true, username: true },
  });
}

export async function getUser(email: string) {
  const existsUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existsUser) throw new Error("User not found");

  return existsUser;
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
