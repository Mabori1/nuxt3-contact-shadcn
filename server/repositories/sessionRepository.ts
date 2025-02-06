import prisma from "~/lib/prisma";
import { ISession } from "~/types/ISession";
import { IUser } from "~/types/IUser";

export async function createSession(data: ISession): Promise<ISession> {
  if (!data.authToken || !data.userId) {
    throw new Error("missing auth token or user id for session");
  }

  return await prisma.session.create({
    data: {
      userId: data.userId,
      authToken: data.authToken,
    },
  });
}

export async function deleteSessionByUserId(userId: number) {
  await prisma.session.deleteMany({
    where: { userId },
  });
}

export async function getSessionByAuthToken(
  authToken: string,
): Promise<ISession> {
  const user = await getUserByAuthToken(authToken);
  if (!user) {
    throw createError({
      statusCode: 404,
      message: "get user by auth token: User not found",
    });
  }

  return { authToken, user };
}

async function getUserByAuthToken(authToken: string): Promise<IUser | null> {
  const session = await prisma.session.findUnique({
    where: {
      authToken,
    },
    include: { user: true },
  });

  if (session) {
    return session.user;
  } else {
    return null;
  }
}
