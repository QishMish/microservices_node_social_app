import { Request, Response, NextFunction } from "express";
import axios from "axios";
import HttpException from "@/utils/exceptions/http.exception";

const setCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  console.log(accessToken)
  if (!accessToken) {
    req.user = null;
    return next();
  }
  try {
    const user = await axios.get("http://localhost:4000/auth/check-auth", {
      headers: {
        Cookie: `accessToken=${accessToken};`,
      },
    });
    req.user = user.data;
    next();
  } catch (error:any) {
    console.log(error)
    throw new HttpException(500, error?.response.data.message);
  }
};

export default setCurrentUser;
