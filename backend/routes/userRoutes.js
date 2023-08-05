// Importing the Express framework.
const express = require("express");

// Importing the necessary controller functions and middleware.
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers"); // Assuming these are your controller functions.
const { protect } = require("../middleware/authMiddleware"); // Assuming this is your authentication middleware.

// Creating an instance of the Express Router.
const router = express.Router();

// Defining routes and associating them with controller functions and middleware.

// Route to fetch all users (GET request).
// Requires authentication using the "protect" middleware.
router.route("/").get(protect, allUsers);

// Route to register a new user (POST request).
router.route("/").post(registerUser);

// Route to authenticate a user (POST request).
// This route is specifically for user login and does not require authentication middleware.
router.post("/login", authUser);

// Exporting the router to be used in the main application file.
module.exports = router;

