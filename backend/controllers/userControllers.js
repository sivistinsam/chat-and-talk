// Importing required modules and dependencies.
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

// Function to fetch all users with optional search query.
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // Finding and sending all users except the current user.
  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password");
  res.send(users);
});

// Function to register a new user.
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  // Checking if the user already exists.
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  // Creating a new user and generating a token.
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

// Function to authenticate a user.
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Finding the user by email.
  const user = await User.findOne({ email });

  // Verifying the password.
  if (user && (await user.matchPassword(password))) {
    // If the password matches, sending user information along with a token.
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// Exporting the registerUser, authUser, and allUsers functions to be used in other parts of the application.
module.exports = { registerUser, authUser, allUsers };
