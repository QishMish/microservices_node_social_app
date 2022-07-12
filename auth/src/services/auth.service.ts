import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import emailQueue from "./../utils/jobs/queues/email.queues";
import HttpException from "../exceptions/http.exception";
import PrismaSource from "../config/prisma.client";

import { Helper } from "./../utils/helper";
import { ISignInUserDto, ISignUpUserDto } from "./../dtos/auth.dto";
import {
  IAuthGenericResponse,
  ISignInResponse,
  ISignUpResponse,
  IMe,
} from "./../interfaces/auth.interface";
import { signJwt, Token, verifyJwt } from "../utils/jwt";
import { IGenericResponse } from "../interfaces/generic.interface";

/**
 *
 * @param {refreshToken} refreshToken refreshToken.
 * @returns {accessToken} newly generated accessToken
 */
const refresh = async (refreshToken: string): Promise<IAuthGenericResponse> => {
  const userRepo = PrismaSource.getRepository().user;

  const refreshPayload = await verifyJwt<IMe>(
    refreshToken,
    Token.REFRESH_TOKEN
  );
  if (refreshPayload instanceof jwt.JsonWebTokenError)
    throw new HttpException(401, "Unauthorised");

  const user = await userRepo.findFirst({
    where: {
      id: refreshPayload.id,
    },
    include: {
      refreshTokens: true,
    },
  });
  if (!user) throw new HttpException(404, "User not found");

  const found = user?.refreshTokens.some(
    (reToken: any) => reToken.token === refreshToken
  );

  if (!found) throw new HttpException(404, "Token not found");

  const newAccessToken = await signJwt(
    {
      id: user.id,
      uuid:user.uuid,
      email: user.email,
      username: user.username,
      verified: user.verified,
    },
    "2h",
    Token.ACCESS_TOKEN
  );
  return {
    status: 200,
    accessToken: newAccessToken,
  };
};
/**
 *
 * @param {ISignUpUserDto} ISignUpUserDto ISignUpUserDto.
 * @returns {accessToken && refreshToken} accessToken && refreshToken
 */
const signUp = async (userData: ISignUpUserDto): Promise<ISignUpResponse> => {
  const userRepo = PrismaSource.getRepository().user;
  const refreshTokenRepo = PrismaSource.getRepository().refreshToken;

  const { email, username, password } = userData;

  const exist = await userExist(email, username);

  if (exist) {
    throw new HttpException(409, "User already exist");
  }
  const hashedPassword = await Helper.hash(password);

  //create user
  const verificationToken = Helper.generateRandomString();

  const hashedVerificationToken = await Helper.hashRandomString(
    verificationToken
  );

  const user = await userRepo.create({
    data: {
      uuid:uuidv4(),
      email,
      username,
      password: hashedPassword,
      verification_token: hashedVerificationToken,
      verification_token_expries_at: new Date(Date.now() + 10 * 60 * 1000),
      verified: false,
    },
  });

  const verificationLink = `http://localhost:3333/auth/verify/${user.id}/${verificationToken}`;
  const message = `
  <h4>Follow link above to verify your account</h4>
  <a href=${verificationLink} >${verificationLink}</a>
  <p>Please follow the link bellow, and do not share it with anybody:</p>
  <p>P</p>
`;

  emailQueue.addEmailToQueue({
    to: user.email,
    subject: "Auth Verification",
    text: message,
  });

  // generate tokens
  const accessToken = await signJwt(
    {
      id: user.id,
      uuid:user.uuid,
      email: user.email,
      username: user.username,
      verified: user.verified,
    },
    "2h",
    Token.ACCESS_TOKEN
  );
  const refreshToken = await signJwt(
    {
      id: user.id,
      uuid:user.uuid,
      email: user.email,
      username: user.username,
      verified: user.verified,
    },
    "1d",
    Token.ACCESS_TOKEN
  );

  //save refresh token
  await refreshTokenRepo.create({
    data: {
      token: refreshToken,
      owner_Id: user.id,
    },
  });

  return {
    status: 200,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
/**
 *
 * @param {ISignInUserDto} ISignInUserDto ISignInUserDto.
 * @returns {accessToken && refreshToken} accessToken && refreshToken
 */
const signIn = async (userData: ISignInUserDto): Promise<ISignInResponse> => {
  const userRepo = PrismaSource.getRepository().user;
  const refreshTokenRepo = PrismaSource.getRepository().refreshToken;

  const { username, password } = userData;

  const user = await userRepo.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new HttpException(400, "Wrong Credentials");
  }

  const passwordIsMatch = await Helper.comparePassword(password, user.password);

  if (!passwordIsMatch) {
    throw new HttpException(400, "Wrong Credentials");
  }

  const accessToken = await signJwt(
    {
      id: user.id,
      uuid:user.uuid,
      email: user.email,
      username: user.username,
      verified: user.verified,
    },
    "2h",
    Token.ACCESS_TOKEN
  );
  const refreshToken = await signJwt(
    {
      id: user.id,
      uuid:user.uuid,
      email: user.email,
      username: user.username,
      verified: user.verified,
    },
    "1d",
    Token.REFRESH_TOKEN
  );

  await refreshTokenRepo.create({
    data: {
      token: refreshToken,
      owner_Id: user.id,
    },
  });

  return {
    status: 200,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
/**
 *
 * @param {userId} userId userId.
 * @param {token} token token.
 * @returns {object} generic response
 */
const signOut = async (
  userId: number,
  token: string
): Promise<IGenericResponse> => {
  const refreshTokenRepo = PrismaSource.getRepository().refreshToken;

  await refreshTokenRepo.delete({
    where: {
      token: token,
    },
  });

  return {
    status: 200,
    message: "Successfully logged out",
  };
};
/**
 *
 * @param {email} email email.
 * @returns {object} generic response
 */
const resetPassword = async (email: string): Promise<IGenericResponse> => {
  const userRepo = PrismaSource.getRepository().user;
  const user = await userRepo.findUnique({
    where: {
      email: email,
    },
  });

  if (!user)
    throw new HttpException(404, "User with corresponding email not found");

  const resetToken = Helper.generateRandomString();
  const hashedResetToken = Helper.hashRandomString(resetToken);

  const resetLink = `http://localhost:3333/auth/confirmresetpassword/${user.id}/${resetToken}`;
  const message = `
  <h4>Follow link above to verify your account</h4>
  <a href=${resetLink} >${resetLink}</a>
  <p>Please follow the link bellow, and do not share it with anybody:</p>
  <p>P</p>
`;

  emailQueue.addEmailToQueue({
    to: user.email,
    subject: "Auth Verification",
    text: message,
  });

  await userRepo.updateMany({
    where: {
      email: email,
    },
    data: {
      reset_token: hashedResetToken,
      reset_token_expries_at: new Date(Date.now() + 10 * 60 * 1000),
    },
  });
  return {
    status: 200,
    message: "Password reset link has sent to email",
  };
};
/**
 *
 * @param {userId} userId userId.
 * @param {resetToken} resetToken resetToken.
 * @param {newPassword} newPassword newPassword.
 * @returns {object} generic response
 */
const confirmResetPassword = async (
  userId: number,
  resetToken: string,
  newPassword: string
): Promise<IGenericResponse> => {
  const userRepo = PrismaSource.getRepository().user;

  const hashedToken = await Helper.hashRandomString(resetToken);

  const user = await userRepo.findFirst({
    where: {
      id: userId,
      reset_token: hashedToken,
      verification_token_expries_at: {
        gt: new Date(),
      },
    },
  });

  if (!user) throw new HttpException(404, "Reset token not found");

  await userRepo.updateMany({
    where: {
      id: userId,
      reset_token: hashedToken,
    },
    data: {
      password: newPassword,
      reset_token: null,
      reset_token_expries_at: null,
    },
  });

  return {
    status: 200,
    message: "Password changed successfully",
  };
};

/**
 *
 * @param {accessToken} accessToken accessToken.
 * @returns {IMe} returns if user is authenticated else null
 */
const ckeckAuth = async (accessToken: string) => {
  const payload = await verifyJwt<IMe>(accessToken, Token.ACCESS_TOKEN);
  const user = Helper.exclude(payload, "iat", "exp");
  return user ?? null;
};

/**
 *
 * @param {username} userId userId.
 * @param {email} resetToken resetToken.
 * @returns {IUser} returns if user with passed credentials exist
 */
const userExist = async (username: string, email: string) => {
  const userRepo = PrismaSource.getRepository().user;

  const exist = userRepo.findFirst({
    where: {
      username: username,
      email: email,
    },
  });
  return exist;
};
export default {
  signIn,
  signUp,
  refresh,
  signOut,
  resetPassword,
  confirmResetPassword,
  ckeckAuth,
};
