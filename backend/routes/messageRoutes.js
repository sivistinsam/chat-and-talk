// Importing the Express framework.
const express = require("express");

// Importing the authentication middleware and necessary controller functions.
const { protect } = require("../middleware/authMiddleware"); // Assuming this is your authentication middleware.
const { sendMessage, allMessages } = require("../controllers/messageControllers"); // Assuming these are your controller functions.

// Creating an instance of the Express Router.
const router = express.Router();

// Defining routes and associating them with controller functions and middleware.

// Route to fetch all messages for a specific chat (GET request).
// Uses the "allMessages" controller function and requires authentication.
router.route("/:chatId").get(protect, allMessages);

// Route to send a message to a specific chat (POST request).
// Uses the "sendMessage" controller function and requires authentication.
router.route("/").post(protect, sendMessage);

// Exporting the router to be used in the main application file.
module.exports = router;

