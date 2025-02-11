import prisma from "~/lib/prisma";
import { IUser } from "~/types/IUser";
//import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: "file:./dev.db",
//     },
//   },
// });

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    select: { id: true, username: true },
  });
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error(`User with id: ${id} not found`);
  }
  return user;
}

export async function getUser(email: string) {
  const existsUser = await prisma.user.findUnique({
    where: { email },
    include: { readed: true },
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
    include: {
      readed: true,
    },
  });
}
