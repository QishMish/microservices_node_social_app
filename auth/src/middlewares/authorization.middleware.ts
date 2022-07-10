import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { Helper } from "./../utils/helper";
import { IMe } from "./../interfaces/auth.interface";
import { signJwt, Token, verifyJwt } from "./../utils/jwt";
import PrismaSource from "../config/prisma.client";
import HttpException from "../exceptions/http.exception";

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;
  const userRepo = PrismaSource.getRepository().user;
  const { accessToken: accToken, refreshToken: refToken } = req.cookies;

  let accessToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    accessToken = bearer?.split("Bearer ")[1].trim();
  } else if (accToken) {
    accessToken = accToken;
  }

  try {
    const payload = await verifyJwt<IMe>(accToken, Token.ACCESS_TOKEN);

    if (payload instanceof jwt.JsonWebTokenError)
      return next(new HttpException(401, "Unauthorised"));

    req.user = Helper.exclude(payload, "iat", "exp");
    return next();
  } catch (error) {
    // if (!refToken) {
    //   return next(new HttpException(401, "Unauthorised"));
    // }

    // const refreshPayload = await verifyJwt<IMe>(refToken, Token.REFRESH_TOKEN);

    // if (refreshPayload instanceof jwt.JsonWebTokenError) {
    //   return next(new HttpException(401, "Unauthorised"));
    // }

    // const user = await userRepo.findFirst({
    //   where: {
    //     id: refreshPayload.id,
    //   },
    //   include: {
    //     refreshTokens: true,
    //   },
    // });
    // if (!user) throw new HttpException(404, "User not found");

    // const found = user?.refreshTokens.some(
    //   (reToken) => reToken.token === refToken
    // );

    // if (found) {
    //   const newAccessToken = await signJwt(
    //     {
    //       id: user.id,
    //       email: user.email,
    //       username: user.username,
    //       verified: user.verified,
    //     },
    //     "1m",
    //     Token.ACCESS_TOKEN
    //   );
    //   res.cookie("accessToken", newAccessToken, {
    //     httpOnly: true,
    //   });

    //   const userData = await verifyJwt<IMe>(newAccessToken, Token.ACCESS_TOKEN);
    //   req.user = Helper.exclude(userData, "iat", "exp");
    //   next();
    // }
    return next(new HttpException(401, "Unauthorised"));
  }
}

export default authenticatedMiddleware;
