import express from "express";
import {
  addUser,
  getUserByNameAndPassword,
  getUserById,
} from "../Controller/userController.js";

const router = express.Router();

router.post("/adduser", addUser);
router.post("/getuser", getUserByNameAndPassword);
router.get("/getuserbyid", getUserById);

export default router;
