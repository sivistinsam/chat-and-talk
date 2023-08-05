// Importing the Mongoose library for working with MongoDB.
const mongoose = require("mongoose");

// Defining an asynchronous function named "connectDB" to establish a connection to the MongoDB database.
const connectDB = async () => {
  try {
    // Using Mongoose's "connect" method to establish a connection to the MongoDB database.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,          // Use the new URL parser.
      useUnifiedTopology: true,      // Use the new unified topology engine.
    });

    // Logging a success message with the connected host.
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    // If an error occurs while connecting, log the error message and exit the Node.js process.
    console.log(`Error connecting to database: ${err}`.red.bold);
    process.exit(); // Exit the Node.js app if an error occurs during database connection.
  }
};

// Exporting the "connectDB" function to be used in other parts of the application.
module.exports = connectDB;

