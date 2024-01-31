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
