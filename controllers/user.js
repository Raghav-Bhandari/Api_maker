import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//   res.status(200).json({
//     success: true,
//     users,
//   });
//   } catch (error) {
//     next(error)
//   }
// };
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return next(new ErrorHandler("Invalid Email Id or Password", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email Id or Password", 404));
    sendCookie(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exists", 404));

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    sendCookie(user, res, "Successfully Registered", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};
// export const updateUser = async (req, res) => {
//     const {id} = req.params;
//   const user = await User.findById(id);
//   res.status(200).json({
//     success: true,
//     message : "User details Updated",
//     user
//   });
// };
// export const deleteUser = async (req, res) => {
//     const {id} = req.params;
//   const user = await User.findById(id);
//   user.deleteOne()
//   res.status(200).json({
//     success: true,
//     message : "Successfully Deleted"
//   });
// };
