import User from "../schema/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { username, password, name } = await req.body;
    const exist = await User.findOne({
      username: username,
    });
    if (exist) {
      return res.json({
        port: "try different Username",
      });
    }
    if (!username || !name || !password) {
      return res.json({
        port: "Missing username or password",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    const user = await User.create({
      name,
      username,
      password: hash,
    });
    user.save();
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    }).select("-password");
    if (!user) {
      return res.json({
        chat: "not found",
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user.username) {
      return res.json({ user: "user not found" });
    }
    if (!isMatch) {
      return res.json("password mismatch");
    }
    const tokenData = {
      user: user.username,
      password: password,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN);
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.json({
      user: user.username,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, name } = await req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        username,
        name,
      },
      { new: true }
    );

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.clearCookie("token");
    return res.json({
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.send("User not found");
    }
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  const user = await User.find();
  return res.json(user);
};
