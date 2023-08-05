// Importing required modules and dependencies.
const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");

// Function to fetch all messages for a specific chat.
const allMessages = asyncHandler(async (req, res) => {
  try {
    // Finding all messages in the specified chat and populating sender and chat details.
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Function to send a message to a specific chat.
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!chatId || !content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  // Creating a new message object with sender, content, and chat information.
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    // Creating the new message and populating sender and chat details.
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Updating the latestMessage field of the chat with the new message.
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    // Sending the newly created and populated message as a response.
    res.json(message);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Exporting the sendMessage and allMessages functions to be used in other parts of the application.
module.exports = { sendMessage, allMessages };
