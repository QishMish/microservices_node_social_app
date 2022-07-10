const { cleanEnv, str, email, json, port } = require("envalid");

const ROOT_URL = "http://localhost:4001";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production", "test"],
    }),
    PORT: port({ default: 3333 }),
    ROOT_URL: str({ default: ROOT_URL }),
    Db_PORT: port({ default: 5432 }),
    DB_HOST: str(),
    DB_NAME: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
  });
};

module.exports = validateEnv;
