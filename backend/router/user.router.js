import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  updateUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/create", createUser);

router.post("/user", login);

router.delete("/user/:id", deleteUser);

router.get("/user/:id", getUserById);

router.get("/users", getAllUsers);

router.put("/api/user/:id", updateUser);

router.delete("/api/user/:id", deleteUser);

export default router;
