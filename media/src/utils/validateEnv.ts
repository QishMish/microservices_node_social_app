import { cleanEnv, str, port } from "envalid";
import crypto from "crypto";

const ROOT_URL = "http://localhost:3333";
const JWT_SECRET_KEY = crypto.randomBytes(32).toString("hex");

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production", "test"],
    }),
    PORT: port({ default: 3333 }),
    ROOT_URL: str({ default: ROOT_URL }),
    JWT_SECRET_KEY: str({ default: JWT_SECRET_KEY }),
    Db_PORT: port({ default: 5432 }),
    DB_HOST: str(),
    DB_NAME: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
  });
}

export default validateEnv;
