require("dotenv").config();

const PORT = process.env.PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

module.exports = {
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  ACCESS_TOKEN_SECRET_KEY,
};
