import { config } from "dotenv";
import User from "../models/userSchema.js";

//cookie options
export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

//signUp || method:post || route: /api/v1/auth/sighup
export const signUp = async (req, res) => {
  try {
    //destructure
    const { name, email, password, phone, address } = req.body;
    //validateion
    if (!name || !email || !password || !phone || !address) {
      res.status(400).json({
        success: false,
        message: "All the fields are required",
      });
    }
    //check if the user is already exists
    const existingUser = await User.findOne({ email });
    //if the user is existing send message
    if (existingUser) {
      res.status(200).json({
        success: false,
        message: "User already exists, please login",
      });
    }
    //if the user doesn't exists, create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });
    //token
    const token = user.getJWTtoken();
    //safety
    user.password = undefined;
    //store this token in user's cookie
    res.cookie("token", token, cookieOptions);
    //send back response to user
    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in signing up",
      error,
    });
  }
};

//login || method:post || /api/v1/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found, please sign up",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = user.getJWTtoken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in logging in",
      error,
    });
  }
};

//logout || method:post || /api/v1/auth/logout
export const logOut = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User has been loggedOut successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Logging out",
      error,
    });
  }
};
