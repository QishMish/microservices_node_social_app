import { NextFunction, Request, Response } from "express";

import HttpException from "../exceptions/http.exception";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new HttpException(401, `Require authenticated user`));
    }
    next();
  } catch (err: any) {
    next(err);
  }
};

export default requireUser;
