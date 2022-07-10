import PrismaSource from "../config/prisma.client";
import HttpException from "../exceptions/http.exception";
import emailQueues from "../utils/jobs/queues/email.queues";

import { Helper } from "./../utils/helper";
import { IGenericResponse } from "./../interfaces/generic.interface";

/**
 *
 * @param {id} id user id.
 * @param {token} n accessToken.
 * @returns {object} generic response
 */
const verifyUser = async (
  id: number,
  token: string
): Promise<IGenericResponse> => {
  const userRepo = PrismaSource.getRepository().user;
  const hashedToken = await Helper.hashRandomString(token);

  const user = await userRepo.findFirst({
    where: {
      id: id,
      verification_token: hashedToken,
      verification_token_expries_at: {
        gt: new Date(),
      },
    },
  });

  if (!user) throw new HttpException(404, "Token Not Found Or Expired");

  user.verified = true;
  user.verification_token = null;
  user.verification_token_expries_at = null;

  await userRepo.updateMany({
    where: {
      id: id,
      verification_token: hashedToken,
    },
    data: {
      verified: true,
      verification_token: null,
      verification_token_expries_at: null,
    },
  });

  return {
    status: 200,
    message: "Successfully verified",
  };
};
/**
 *
 * @param {email} email email.
 * @returns {object} generic response
 */
const sendVerificationLink = async (
  email: string
): Promise<IGenericResponse> => {
  const userRepo = PrismaSource.getRepository().user;

  const user = await userRepo.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new HttpException(404, "User not found");
  if (user.verified) throw new HttpException(400, "User account is verified");

  const verificationToken = Helper.generateRandomString();

  const hashedVerificationToken = await Helper.hashRandomString(
    verificationToken
  );

  await userRepo.update({
    where: {
      email: email,
    },
    data: {
      verification_token: hashedVerificationToken,
      verification_token_expries_at: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  const verificationLink = `http://localhost:3333/auth/verify/${user.id}/${verificationToken}`;
  const message = `
  <h4>Follow link above to verify your account</h4>
  <a href=${verificationLink} >${verificationLink}</a>
  <p>Please follow the link bellow, and do not share it with anybody:</p>
  <p>P</p>
`;

  emailQueues.addEmailToQueue({
    to: user.email,
    subject: "Auth Verification",
    text: message,
  });

  return {
    status: 200,
    message: "Verification link has sent",
  };
};

export default {
  verifyUser,
  sendVerificationLink,
};
