const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
const errMsg = require("./commons/errorMessages");

const initialize = (passport) => {
  const authenticateUser = async (emailAddress, password, done) => {
    const user = await User.findOne({ emailAddress: emailAddress });

    if (!user) {
      return done(null, false, {
        message: errMsg.noAccountFound,
      });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: errMsg.incorrectPassword,
        });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "emailAddress" }, authenticateUser)
  );

  // Store User to cookie
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Assign User to req.user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = initialize;
