require("express-async-errors")
const app = require("./app");
const { PORT } = require("./config/constants");
const { sequelize } = require("./models");
const validateEnv = require("./utils/validateEnv");

validateEnv();


const main = async () => {
    app.listen(Number(PORT), () => {
    //server starting
    console.log(`User service listening on port ${PORT}!`);
    //postgres connection
    sequelize
      .authenticate()
      .then(() => console.log("Connected to users postgres database"))
      .catch((err) => {
        console.error("Unable to connect to users postgres database:", err);
      });
  });
};

main();
