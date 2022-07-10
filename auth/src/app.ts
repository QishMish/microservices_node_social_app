import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token", "Cookie"],
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorMiddleware);

export default app;
