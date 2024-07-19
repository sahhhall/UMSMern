import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth admin/set token
// route POST api/admin/
// @access PUBLIC

const authAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "admin logged in" });
});

// @desc Fetch users
// @route GET api/admin/users
// @access PRIVATE/ADMIN
const fetchUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "search result" });
});

// @desc Create user
// @route POST api/admin/users
// @access PRIVATE/ADMIN
const createUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " created user by admin " });
});

// @desc Update user
// @route PUT api/admin/users/:id
// @access PRIVATE/ADMIN
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: " updated user " });
});

// @desc Delete user
// @route DELETE api/admin/users/:id
// @access PRIVATE/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: " deleted user " });
});

export { authAdmin, createUser, fetchUsers, updateUser, deleteUser };
