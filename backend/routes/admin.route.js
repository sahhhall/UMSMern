import express from "express";
const router = express.Router();
import {
  authAdmin,
  createUser,
  updateUser,
  deleteUser,
  fetchUsers,
  logoutAdmin,
} from "../controller/admin.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

router.post("/", authAdmin);
router.post("/logout", logoutAdmin);
router.route("/users").get(adminAuth, fetchUsers).post(adminAuth, createUser);
router
  .route("/users/:id")
  .put(adminAuth, updateUser)
  .delete(adminAuth, deleteUser);

export default router;
