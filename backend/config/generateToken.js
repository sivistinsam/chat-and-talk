// Importing the JSON Web Token (JWT) library.
const jwt = require("jsonwebtoken");

// Defining a function named "generateToken" to create a JWT token.
const generateToken = (id) => {
  // Using the "jwt.sign" method to create a token.
  // The token contains a payload with the provided "id" and is signed using the JWT_SECRET from the environment.
  // The token expires after 3 days (specified by the "expiresIn" option).
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// Exporting the "generateToken" function to be used in other parts of the application.
module.exports = generateToken;

