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
import { protectedAuth } from "../middlewares/auth.middleware.js";

router.post("/", authAdmin);
router.post("/logout", logoutAdmin)
router.route("/users").get(protectedAuth,fetchUsers).post(protectedAuth,createUser);
router
  .route("/users/:id")
  .put(protectedAuth, updateUser)
  .delete(protectedAuth, deleteUser);

export default router;
