import { ISession } from "~/types/ISession";
import prisma from "../database/client";
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

export async function getSessionByAuthToken(
  authToken: string,
): Promise<ISession> {
  const user = await getUserByAuthToken(authToken);
  if (!user) {
    throw new Error("get user by auth token: User not found");
  }

  return { authToken, user };
}

async function getUserByAuthToken(authToken: string): Promise<IUser> {
  const session = await prisma.session.findUnique({
    where: {
      authToken,
    },
    include: { user: true },
  });

  if (session) {
    return session.user;
  } else {
    throw new Error("Session not found");
  }
}
