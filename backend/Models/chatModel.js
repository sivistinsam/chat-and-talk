// Importing the Mongoose library for working with MongoDB.
const mongoose = require("mongoose");

// Defining a Mongoose Schema for the 'Chat' model.
const chatModel = mongoose.Schema(
  {
    // Defining a field for the name of the chat.
    chatName: { type: String, trim: true },

    // Defining a field to indicate if the chat is a group chat or not.
    isGroupChat: { type: Boolean, default: false },

    // Defining a field for an array of user references participating in the chat.
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to the "User" model.
      },
    ],

    // Defining a field to store the reference to the latest message in the chat.
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // Refers to the "Message" model.
    },

    // Defining a field for the reference to the group admin user.
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the "User" model.
    },
  },
  {
    // Adding timestamps to the document to automatically track creation and update times.
    timestamps: true,
  }
);

// Creating the Mongoose model "Chat" based on the defined schema.
const Chat = mongoose.model("Chat", chatModel);

// Exporting the "Chat" model to be used in other parts of the application.
module.exports = Chat;
