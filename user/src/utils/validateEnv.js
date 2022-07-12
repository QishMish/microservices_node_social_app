const { cleanEnv, str, email, json, port } = require("envalid");


const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production", "test"],
    }),
    PORT: port({ default: 4001 }),
    Db_PORT: port({ default: 5432 }),
    USER_POSTGRES_DB_HOST: str(),
    USER_POSTGRES_DB_NAME: str(),
    USER_POSTGRES_DB_USERNAME: str(),
    USER_POSTGRES_DB_PASSWORD: str(),
  });
};

module.exports = validateEnv;
