require("dotenv").config();
require("./src/db/db");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Session Configurations
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MDB_CONNECTION_URL,
  collection: "sessions",
});

store.on("error", (error) => {
  console.log("SESSION ERROR", error);
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 180 * 60 * 1000, httpOnly: false },
  store: store,
  unset: "destroy",
});

app.use(sessionMiddleware);

// Passport implementation
const passport = require("passport");
require("./src/passport-config")(passport);
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require("./src/routes/userRouter.js");
app.use("/", userRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Successfully connected to port ${PORT}`);
});
