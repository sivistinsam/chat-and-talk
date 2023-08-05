// Importing required modules and dependencies.
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const chatRoutes = require("./routes/chatRoutes");
const socketIO = require("socket.io");

dotenv.config();

// Connecting to the MongoDB database.
connectDB();

// Creating an instance of the Express application.
const app = express();

app.use(express.json()); // To parse JSON data in requests.

// Using routes for different parts of the application.
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Deployment code -------------------------------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  // Serving the static files from the frontend build folder.
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  // Handling any unmatched routes by serving the main index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  // For development environment, a simple response is sent.
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}

// Deployment code end here -----------------------------------------

// Middleware for handling not found routes and errors.
app.use(notFound);
app.use(errorHandler);

// Getting the port number from environment variables or using a default.
const PORT = process.env.PORT || 5000;

// Starting the server and listening on the specified port.
const server = app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`.yellow.bold)
);

// Creating a socket.io instance and setting up socket communication.
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", // Change this to your frontend's origin.
  },
});

// Socket.io connection event handling.
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  // Handling the "setup" event to join user-specific rooms.
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // Handling the "join chat" event to join chat-specific rooms.
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room: " + room);
  });

  // Handling "typing" and "stop typing" events for chat.
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Handling the "new message" event and broadcasting the message to relevant users.
  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // Handling the "setup" event when the user disconnects.
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
