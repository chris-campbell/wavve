require("dotenv").config();
require("./src/db/db");

const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./src/config/config");
const passport = require("passport");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Session Configurations
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const { mongoDBStoreConfig, sessionMiddlewareConfig } = config;

const store = new MongoDBStore(mongoDBStoreConfig);
store.on("error", (error) => {
  console.log("SESSION ERROR", error);
});

const sessionMiddleware = session(sessionMiddlewareConfig(store));
app.use(sessionMiddleware);

// Passport implementation
require("./src/passport-config")(passport);
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require("./src/routes/userRouter.js");

app.use("/", userRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Successfully connected to port ${PORT}`);
});
