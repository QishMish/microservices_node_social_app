import { Request, Response, NextFunction } from "express";
import HttpException from "@/utils/exceptions/http.exception";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import axios from "axios";

interface IToken extends Object {
  username?: string;
  id?: string;
  expiresIn: number;
}

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpException(401, "Unauthorised"));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();

  // const data = await axios.post(
  //   `http://localhost:8000/api/v1/upload`,
  //   {},
  //   {
  //     headers: {
  //       authorization: accessToken,
  //     },
  //   }
  // );
  // console.log(data.data);

  try {
    const payload: any = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY as jwt.Secret
    );

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Unauthorised"));
    }

    // const user = await User.findOne({
    //   where: { username: payload.username },
    // });

    // if (!user) {
    //   return next(new HttpException(401, "Unauthorised"));
    // }

    req.user = payload;

    return next();
  } catch (error) {
    return next(new HttpException(401, "Unauthorised"));
  }
}

export default authenticatedMiddleware;
