require("express-async-errors")
const app = require("./app");
const { PORT } = require("./config/constants");
const { sequelize } = require("./models");
const validateEnv = require("./utils/validateEnv");

validateEnv();


const main = async () => {
    app.listen(PORT, () => {
    //server starting
    console.log(`Post service listening on port ${PORT}!`);
    //postgres connection
    sequelize
      .authenticate()
      .then(() => console.log("Connected to posts postgres database"))
      .catch((err) => {
        console.error("Unable to connect to posts postgres database:", err);
      });
  });
};

main();
