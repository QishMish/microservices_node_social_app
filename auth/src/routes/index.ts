import { Router, Request, Response } from "express";
import authenticatedMiddleware from "../middlewares/authorization.middleware";
import requireUser from "../middlewares/requireUser.middleware";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.get(
  "/protected",
  authenticatedMiddleware,
  requireUser,
  async (req: Request, res: Response) => {
    res.status(200).json("hello from protected route");
  }
);

export default router;
