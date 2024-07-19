import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controller/user.controller.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logoutUser", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
