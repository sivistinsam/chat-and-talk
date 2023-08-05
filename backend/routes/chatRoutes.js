// Importing the Express framework.
const express = require("express");

// Importing the necessary controller functions and middleware.
const {
  accessChat,
  fetchChats,
  createGrouptChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers"); // Assuming these are your controller functions.
const { protect } = require("../middleware/authMiddleware"); // Assuming this is your authentication middleware.

// Creating an instance of the Express Router.
const router = express.Router();

// Defining routes and associating them with controller functions and middleware.

// Route to access a chat (POST request).
router.route("/").post(protect, accessChat);

// Route to fetch chats for the user (GET request).
router.route("/").get(protect, fetchChats);

// Route to create a group chat (POST request).
router.route("/group").post(protect, createGrouptChat);

// Route to rename a group (PUT request).
router.route("/rename").put(protect, renameGroup);

// Route to remove a user from a group (PUT request).
router.route("/groupremove").put(protect, removeFromGroup);

// Route to add a user to a group (PUT request).
router.route("/groupadd").put(protect, addToGroup);

// Exporting the router to be used in the main application file.
module.exports = router;
