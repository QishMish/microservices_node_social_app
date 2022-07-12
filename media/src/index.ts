require("express-async-errors");
import "dotenv/config";
import "module-alias/register";
import App from "./app";
import FileController from "@/resources/file/file.controller";
import validateEnv from "./utils/validateEnv";
import constants from "@/config/constants";

const { PORT } = constants;

validateEnv();

const app = new App([new FileController()], Number(PORT));

app.listen();
