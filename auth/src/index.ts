require("express-async-errors");
import "dotenv/config";
import App from "./app";
import { PORT } from "./config/constants";
import logger from "./config/Logger";
import HttpException from "./exceptions/http.exception";

App.listen(PORT, () => {
  console.log(`Auth service listening on the port ${PORT}`);
});

process.on("uncaughtException", (err, origin) => {
  logger.error({ err });
  process.exit(1);
});
