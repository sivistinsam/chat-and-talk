// Importing the Mongoose library for working with MongoDB.
const mongoose = require("mongoose");
// Importing the bcrypt library for password hashing.
const bcrypt = require("bcryptjs");

// Defining a Mongoose Schema for the 'User' model.
const userSchema = mongoose.Schema(
  {
    // Defining a field for the user's name.
    name: { type: "String", required: true },

    // Defining a field for the user's email, which must be unique and required.
    email: { type: "String", required: true, unique: true },

    // Defining a field for the user's hashed password, which is required.
    password: { type: "String", required: true },

    // Defining a field for the user's profile picture URL with a default placeholder.
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    // Defining a field to indicate whether the user is an admin, with a default value of 'false'.
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  // Adding timestamps to the document to automatically track creation and update times.
  { timestamps: true }
);

// Adding a method to the userSchema for comparing entered password with the stored hashed password.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Adding a pre-save hook to the userSchema for hashing the password before saving.
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new).
  if (!this.isModified("password")) {
    next();
  }
  // Generate a salt and hash the password.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Creating the Mongoose model "User" based on the defined schema.
const User = mongoose.model("User", userSchema);

// Exporting the "User" model to be used in other parts of the application.
module.exports = User;

