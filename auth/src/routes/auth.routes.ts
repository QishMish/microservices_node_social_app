import { Router } from "express";

import authController from "../controllers/auth.controller";
import authenticatedMiddleware from "../middlewares/authorization.middleware";
import requireUser from "../middlewares/requireUser.middleware";

const authRoutes = Router();

const {
  signIn,
  signUp,
  signOut,
  refresh,
  verify,
  resetPassword,
  confirmResetPassword,
  sendVerificationLink,
  me,
  checkAuth,
} = authController;

authRoutes.get("/me", authenticatedMiddleware, requireUser, me);
authRoutes.post("/signup", signUp);
authRoutes.post("/signin", signIn);
authRoutes.post("/signout", authenticatedMiddleware, requireUser, signOut);
authRoutes.post("/refresh", refresh);
authRoutes.post(
  "/verify",
  authenticatedMiddleware,
  requireUser,
  sendVerificationLink
);
authRoutes.get("/verify/:userId/:verificationToken", verify);
authRoutes.post("/resetpassword", resetPassword);
authRoutes.post(
  "/confirmresetpassword/:userId/:resetToken",
  confirmResetPassword
);
authRoutes.get("/check-auth", checkAuth);

export default authRoutes;
