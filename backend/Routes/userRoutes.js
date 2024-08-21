import express from "express";
import {
  addUser,
  getUserByNameAndPassword,
  getUserById,
} from "../Controller/userController.js";

const router = express.Router();

router.post("/adduser", addUser);
router.get("/getuser", getUserByNameAndPassword);
router.get("/getuserId", getUserById);

export default router;
