const PORT = process.env.PORT;
const DATABASE_URL = process.env.AUTH_POSTGRES_URI;
const ACCESS_TOKEN_SECRET_KEY = process.env.JWT_ACCESTOKEN_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.JWT_REFRESHTOKEN_KEY;

export {
  PORT,
  DATABASE_URL,
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
};
