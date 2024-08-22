import express from "express";
import {
  addUser,
  getUserByNameAndPassword,
  getUserByName,
} from "../Controller/userController.js";

const router = express.Router();

router.post("/adduser", addUser);
router.get("/getuser", getUserByNameAndPassword);
router.get("/getuserName", getUserByName);

export default router;
