const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  NODE_ENV,
} = require("./constants");


module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
  },
};
