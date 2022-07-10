import { IMe } from "./../../interfaces/auth.interface";

declare global {
  namespace Express {
    export interface Request {
      user: IMe;
    }
  }
}
