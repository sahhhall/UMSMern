import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controller/user.controller.js";
import { protectedAuth } from "../middlewares/auth.middleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logoutUser", logoutUser);
router.route("/profile").get(protectedAuth,getUserProfile).put(protectedAuth,updateUserProfile);

export default router;
