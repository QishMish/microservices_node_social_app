import { Request, Response } from "express";

import HttpException from "../exceptions/http.exception";

//services
import authService from "../services/auth.service";
import emailService from "../services/email.service";

const coockieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
};

const me = async (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    data: {
      user: req.user,
    },
  });
};
const checkAuth = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    res.status(401).json({
      user: null,
    });
    return;
  }
  const user = await authService.ckeckAuth(accessToken);
  const status = user ? 200 : 401;

  res.status(status).json(user);
};
const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    throw new HttpException(403, "Could not refresh access token");

  const response = await authService.refresh(refreshToken);

  res.cookie("loggedIn", true, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", response.accessToken, coockieOptions);
  res.status(response.status).json(response);
};
const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const response = await authService.signIn({ username, password });

  res.cookie("loggedIn", true, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", response.accessToken, coockieOptions);
  res.cookie("refreshToken", response.refreshToken, coockieOptions);

  const { refreshToken, ...other } = response;

  res.status(response.status).json(other);
};
const signUp = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const response = await authService.signUp({
    email,
    username,
    password,
  });

  res.cookie("loggedIn", true, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", response.accessToken, coockieOptions);
  res.cookie("refreshToken", response.refreshToken, coockieOptions);
  const { refreshToken, ...other } = response;

  res.status(response.status).json(other);
};
const signOut = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { refreshToken } = req.cookies;

  const response = await authService.signOut(userId, refreshToken);

  res.cookie("loggedIn", false, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", "", coockieOptions);
  res.cookie("refreshToken", "", coockieOptions);
  res.status(response.status).json(response.message);
  // res.redirect("/signin");
};
const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const response = await authService.resetPassword(email);

  res.status(response.status).json(response);
};
const confirmResetPassword = async (req: Request, res: Response) => {
  const { resetToken, userId } = req.params;
  const { newPassword } = req.body;

  const response = await authService.confirmResetPassword(
    parseInt(userId),
    resetToken,
    newPassword
  );

  res.redirect("/protected");
};
const sendVerificationLink = async (req: Request, res: Response) => {
  const { email } = req.user;

  const response = await emailService.sendVerificationLink(email);
  res.status(response.status).json(response);
};
const verify = async (req: Request, res: Response) => {
  const { verificationToken, userId } = req.params;

  const response = await emailService.verifyUser(
    parseInt(userId),
    verificationToken
  );
  res.redirect("/protected");
};

export default {
  signIn,
  signUp,
  signOut,
  refresh,
  verify,
  me,
  sendVerificationLink,
  resetPassword,
  confirmResetPassword,
  checkAuth,
};
