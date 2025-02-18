import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

// @desc Auth admin/set token
// route POST api/admin/
// @access PUBLIC

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });
  if (!admin || !admin?.isAdmin) {
    return res
      .status(401)
      .json({ message: "No admin found with the provided email" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, admin.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  generateToken(res, admin._id, "adminJWT");
  res.status(200).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
  });
});

// @desc Logout user
// route POST api/admin/logout
// @access PRIVATE
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("adminJWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " admin logged out" });
});

// @desc Fetch users
// @route GET api/admin/users
// @access PRIVATE/ADMIN
const fetchUsers = asyncHandler(async (req, res) => {
  const usersData = await User.find({ isAdmin: { $ne: true } })
    .select("-password")
    .sort({ updatedAt: -1 });
  res.status(200).json({ usersData });
});

// @desc Create user
// @route POST api/admin/users
// @access PRIVATE/ADMIN
const createUser = asyncHandler(async (req, res) => {
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
  if (req.body.image) {
    var uploadResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: "ums",
    });
  }
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profileImg:uploadResponse && uploadResponse?.secure_url 
  });
  if (user) {
    res.status(201).json({
     message: "user successfully created"
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Update user
// @route PUT api/admin/users/:id
// @access PRIVATE/ADMIN
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  console.log("fuck")
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const userNameExists = await User.findOne({ name, _id: { $ne: user._id } });
    const userEmailExists = await User.findOne({
      email,
      _id: { $ne: user._id },
    });
    if (req.body.profileImg) {
      const uploadResponse = await cloudinary.uploader.upload(req.body.profileImg, {
        upload_preset: "ums",
      });
      user.profileImg = uploadResponse.secure_url; 
    }

    if (userNameExists) {
      res.status(409);
      throw new Error("Username already exists");
    }

    if (userEmailExists) {
      res.status(409);
      throw new Error("Email already exists");
    }
    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user profile", error: error.message });
  }
});

// @desc Delete user
// @route DELETE api/admin/users/:id
// @access PRIVATE/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("something went wrong");
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: " user deleted successfully " });
});

export {
  authAdmin,
  createUser,
  fetchUsers,
  updateUser,
  deleteUser,
  logoutAdmin,
};
