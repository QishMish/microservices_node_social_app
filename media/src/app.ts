import express, { Application, ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import ErrorMiddleware from "@/middleware/error.middleware";
import Controller from "@/utils/interfaces/controller.interface";
import asyncHandler from "express-async-handler";
import db from "@/config/db.config";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
    this.initialiseDatabase();
  }
  private initialiseMiddleware(): void {
    this.express.use(cors({}));
    this.express.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      })
    );
    this.express.use(function (req, res, next) {
      res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
      next()
    })
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.static("uploads"));
    this.express.use(<ErrorRequestHandler>ErrorMiddleware);
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api/v1", asyncHandler(controller.router));
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }
  private initialiseDatabase(): void {
    db.initialize()
      .then(() => {
        console.log("Media postgres db has been initialized!");
      })
      .catch((err: Error) =>
        console.log("Error during Data Source initialization", err)
      );
  }
  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Media service listening on the port ${this.port}`);
    });
  }
}

export default App;
