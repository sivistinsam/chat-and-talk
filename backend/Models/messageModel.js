// Importing the Mongoose library for working with MongoDB.
const mongoose = require("mongoose");

// Defining a Mongoose Schema for the 'Message' model.
const messageModel = mongoose.Schema(
  {
    // Defining a field for the reference to the user who sent the message.
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Refers to the "User" model.

    // Defining a field for the content of the message.
    content: { type: String, trim: true },

    // Defining a field for the reference to the chat in which the message was sent.
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }, // Refers to the "Chat" model.

    // Defining a field for an array of user references who have read the message.
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Refers to the "User" model.
  },
  {
    // Adding timestamps to the document to automatically track creation and update times.
    timestamps: true,
  }
);

// Creating the Mongoose model "Message" based on the defined schema.
const Message = mongoose.model("Message", messageModel);

// Exporting the "Message" model to be used in other parts of the application.
module.exports = Message;
