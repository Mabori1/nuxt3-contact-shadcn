import {
  getUserByEmail,
  getUserByUsername,
} from "../repositories/userRepository";

type existsCheck = {
  value: boolean;
  message?: string;
};

type RegistrationError = {
  emailError?: string;
  usernameError?: string;
};

type RegistrationErrorEmail = {
  emailError?: string;
};

export async function doesUserExists(
  email: string,
  username: string,
): Promise<existsCheck> {
  const hasEmail = await getUserByEmail(email);
  const hasUsername = await getUserByUsername(username);

  const emailExists = hasEmail !== null;
  const usernameExists = hasUsername !== null;

  const errors: RegistrationError = {};

  if (emailExists) {
    errors.emailError = `This email, ${email}, is already registered`;
  }

  if (usernameExists) {
    errors.usernameError = `The username, ${username}, is already registered`;
  }

  if (emailExists || usernameExists) {
    const message = JSON.stringify(errors);
    return {
      value: true,
      message,
    };
  }

  return {
    value: false,
  };
}

export async function doesUserExistsEmail(email: string): Promise<existsCheck> {
  const hasEmail = await getUserByEmail(email);

  const emailExists = hasEmail !== null;

  const errors: RegistrationError = {};

  if (emailExists) {
    errors.emailError = `This email, ${email}, is already registered`;
  }

  if (emailExists) {
    const message = JSON.stringify(errors);
    return {
      value: true,
      message,
    };
  }

  return {
    value: false,
  };
}
