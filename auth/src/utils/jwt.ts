import JWT from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from "../config/constants";

export const signJwt = async (
  payload: object,
  expirationTime: string,
  type: Token
) => {
  let secret =
    type === Token.ACCESS_TOKEN
      ? ACCESS_TOKEN_SECRET_KEY
      : REFRESH_TOKEN_SECRET_KEY;

  if (!secret) {
    throw new Error("Secret key is not provided");
  }
  const token: string = await JWT.sign(payload, secret, {
    expiresIn: expirationTime,
  });
  return token;
};
export const verifyJwt = async <T>(token: any, type: Token): Promise<T> => {
  const secret =
    type === Token.ACCESS_TOKEN
      ? ACCESS_TOKEN_SECRET_KEY
      : REFRESH_TOKEN_SECRET_KEY;
  if (!secret) throw new Error("Secret key is required");

  const decoded = await JWT.verify(token, secret);
  return decoded as T;
};

export enum Token {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
}
