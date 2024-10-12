import { User } from "../models/userModel.js";

export const addUser = async (request, response) => {
  try {
    const { name, email, phone, password, confirm_password } = request.body;

    if (!name || !email || !phone || !password || !confirm_password) {
      return response
        .status(400)
        .send({ message: "Please fill all required fields!" });
    }
    if (password !== confirm_password) {
      return response.status(400).send({ message: "Passwords do not match!" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return response
        .status(400)
        .send({ message: "User already exists with this email or phone!" });
    }

    const newUser = {
      name,
      email,
      phone,
      password,
    };
    const user = await User.create(newUser);

    return response
      .status(201)
      .send({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export const getUserByNameAndPassword = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both name and password!" });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).send({
        message:
          "Name is incorrect. Please enter the correct name you used in registration!",
      });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(404).send({
        message:
          "Password is incorrect. Please enter the correct password you used in registration!",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
