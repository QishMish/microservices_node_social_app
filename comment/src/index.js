require("express-async-errors")
const app = require("./app");
const { sequelize } = require("./models");
const validateEnv = require("./utils/validateEnv");

validateEnv();

const { PORT } = process.env;

const main = async () => {
    app.listen(PORT, () => {
    //server starting
    console.log(`Comment listening on port ${PORT}!`);
    //postgres connection
    sequelize
      .authenticate()
      .then(() => console.log("Connected to comments postgres database"))
      .catch((err) => {
        console.error("Unable to connect to comments postgres database:", err);
      });
  });
};

main();
