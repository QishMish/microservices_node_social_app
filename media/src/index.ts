import "dotenv/config";
import "module-alias/register";
import App from "./app";
import FileController from "@/resources/file/file.controller";
import validateEnv from "./utils/validateEnv";

validateEnv();
const app = new App(
  [new FileController()],
  Number(process.env.PORT)
);

app.listen();
