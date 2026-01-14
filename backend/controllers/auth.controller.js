import bcrypt from "bcryptjs";
import User from "../models/Users.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try{
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields Required" });
  }

  const UserExists = await User.findOne({ email });
  if (UserExists) {
    return res.status(400).json({ message: "User already Exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  generateToken(res, user._id);

  return res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
}catch(err){
    console.log("REGISTER ERROR:", err);
    return res.status(500).json({ message:"server error"});
}
};

export const loginUser = async (req, res) => {
try{
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  generateToken(res, user._id);

  return res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
}
catch(err){
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({ message:"server error"});
}
};

export const getMe = async (req, res) => {
  try{
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
  }catch(err){
    console.log("ERROR:", err);
    return res.status(500).json({ message:"server error"});
  }
};

export const logoutUser = async (req, res) => {
    try{
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.json({ message: " Logged Out " });
}catch(err){
    console.log("LOGOUT ERROR:", err);
    return res.status(500).json({ message:"server error"});
}
};
