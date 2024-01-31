import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import AuthRoles from "../utils/AuthRoles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name should not exceed 50 chars"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requierd: true,
      minLength: [8, "Password should contain atleast 8 chars"],
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
  },
  { timestamps: true }
);

//encrypt password before saving || hooks
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  //compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
  //create jwt token
  getJWTtoken: function () {
    return JWT.sign({ _id: this._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  },
};

export default mongoose.model("User", userSchema);
