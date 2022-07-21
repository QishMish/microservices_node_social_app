const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const indexRoutes = require("./routes");
const globalExceptionHandler = require("./middlewares/globalExceptionHandler");
const cookieParser = require("cookie-parser");
const { currentUser } = require("./middlewares/currentUser");
const setCurrentUser = require("./middlewares/setCurrentUser");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// app.use(currentUser);
app.use(setCurrentUser);
app.use(indexRoutes);
app.use(globalExceptionHandler);

app.use("*", (req, res) => {
  res.json({ error: "route does not exist" });
});
console.log("first")

module.exports = app;
