const User = require("../models/userModel");
const passport = require("passport");
const errMsg = require("../commons/errorMessages");

const createUser = (req, res) => {
  User.findOne({ emailAddress: req.body.emailAddress }, async (err, user) => {
    try {
      if (user) {
        return res.status(309).send(errMsg.userExist);
      }

      if (!user) {
        let newUser = User(req.body);
        newUser = await newUser.save();

        req.login(newUser, (err) => {
          if (err) res.status(309).send(err);
          return res.status(200).send(newUser);
        });
      }
    } catch (error) {
      res.status(200).send(error);
    }
  });
};

const loginUser = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(309).send(err);

    if (info) {
      if (info.message === "Missing credentials") {
        return res.status(401).send(errMsg.missingCredential);
      }
    }

    if (!user) {
      return res.status(401).send(errMsg.unauthorizedUser);
    }

    req.logIn(user, (err) => {
      if (err) {
        res.send(err);
      }

      return res.json(req.user);
    });
  })(req, res);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const isUserLoggedIn = async (req, res) => {
  if (!req.isAuthenticated()) return res.send(false);

  res.send(true);
};

const logoutUser = async (req, res) => {
  req.logout((err) => {
    if (err) return res.send(err);

    delete req.session;
    res.send(errMsg.logoutMessage);
  });
};

const getCurrentUser = async (req, res) => {
  if (!req.user) return res.send(undefined);

  res.send(req.user);
};

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  getCurrentUser,
  isUserLoggedIn,
};
