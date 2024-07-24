import JWT from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

const adminAuth = asyncHandler(async (req, res, next) => {
  let adminToken = req.cookies.adminJWT;
  if (!adminToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No admin token found" });
  }

  try {
    const decoded = JWT.verify(adminToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res
      .status(401)
      .json({ message: "Not authorized - Invalid admin token" });
  }
});


export { adminAuth }