const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name"],
      minLength: [2, "First name can't be shorter than 2 characters"],
      maxLength: 26,
    },
    lastName: {
      type: String,
      required: [true, "last name"],
      minLength: [2, "Last name can't be shorter than 2 characters"],
      maxLength: 26,
    },
    emailAddress: {
      type: String,
      required: [true, "email address"],
      validate: [validator.default.isEmail, "Enter a valid email address"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be atleast 6 charaters"],
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://laymanns.s3.us-east-2.amazonaws.com/default-avatar/ed7sK1XT7372sZ7zbkzXuh.png",
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.plugin(passportLocalMongoose, { usernameField: "emailAddress" });

const User = mongoose.model("User", userSchema);

module.exports = User;
