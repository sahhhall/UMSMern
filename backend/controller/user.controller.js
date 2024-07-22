import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";
// @desc Auth user/set token
// route POST api/users/auth
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "No user found with the provided email" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  generateToken(res, user._id);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImg: user.profileImg
  });
});

// @desc Register new user
// route POST api/users/register
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(409);
    throw new Error("user already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user
// route POST api/users/logout
// @access PRIVATE
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("JWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " user logged out" });
});

// @desc Get user profile
// route GET api/users/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({
    _id,
    name,
    email,
  });
});

// @desc Update profile
// route PUT /api/users/profile
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.profileImg) {
      const uploadResponse = await cloudinary.uploader.upload(req.body.profileImg, {
        upload_preset: "ums",
      });
      user.profileImg = uploadResponse.secure_url; 
      console.log(uploadResponse,"updsfd")
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImg: updatedUser.profileImg,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
