const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

async function registerController(req, res) {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User Already Exists" });
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const user = await userModel.create({
    email: email,
    fullName: {
      firstName,
      lastName,
    },
    password: hashPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token);

  res.status(201).json({
    message: "User Succussfully Created ",
    user: {
      email: user.email,
      id: user._id,
      fullName: user.fullName,
    },
  });
}
async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });
  if(!user){
    return res.status(400).json({message:"Invailid email"})
  }
  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({message:"Password is Wrong, please Enter right password"})
  }

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
  res.cookie("token",token)

  res.status(200).json({
    message:"User LogIn successfully",
    user,
  })
}
module.exports = {
  registerController,
  loginController
};
