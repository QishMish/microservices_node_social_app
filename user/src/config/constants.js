require("dotenv").config();

const PORT = process.env.PORT;
const DB_USERNAME = process.env.USER_POSTGRES_DB_USERNAME;
const DB_PASSWORD = process.env.USER_POSTGRES_DB_PASSWORD;
const DB_NAME = process.env.USER_POSTGRES_DB_NAME;
const DB_HOST = process.env.USER_POSTGRES_DB_HOST;
const ACCESS_TOKEN_SECRET_KEY = process.env.JWT_ACCESTOKEN_KEY;


module.exports = {
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  ACCESS_TOKEN_SECRET_KEY,
};
