import { v4 as uuidv4 } from "uuid";
import { IUser } from "~/types/IUser";
import { H3Event, EventHandlerRequest } from "h3";
import {
  createSession,
  getSessionByAuthToken,
} from "../repositories/sessionRepository";

export async function makeSession(
  user: IUser,
  event: H3Event<EventHandlerRequest>,
): Promise<IUser> {
  const authToken = uuidv4().replaceAll("-", "");
  const session = await createSession({ authToken, userId: user.id });
  const userId = session.userId;

  if (userId) {
    setCookie(event, "auth_token", authToken, { path: "/", httpOnly: true });
    return getUserBySessionToken(authToken);
  }

  throw new Error("Failed to create session");
}

export async function getUserBySessionToken(token: string): Promise<IUser> {
  const session = await getSessionByAuthToken(token);
  if (session === null || session.user === undefined)
    throw new Error("Session not found");

  return session.user;
}
