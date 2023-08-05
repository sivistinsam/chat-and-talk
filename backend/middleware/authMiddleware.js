// Importing required modules and dependencies.
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel"); // Assuming this is the User model.
const asyncHandler = require("express-async-handler");

// Middleware function to protect routes by verifying JWT token.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Checking if the request has an "Authorization" header with a "Bearer" token.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extracting the token from the header.
      token = req.headers.authorization.split(" ")[1];

      // Verifying the token and decoding its payload.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetching the user associated with the decoded token's ID and excluding the password.
      req.user = await User.findById(decoded.id).select("-password");

      // Moving to the next middleware or route handler.
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // Handling the case when no token is present in the header.
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Exporting the "protect" middleware to be used in other parts of the application.
module.exports = { protect };
