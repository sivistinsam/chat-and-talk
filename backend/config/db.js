const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error connecting to database: ${err}`.red.bold);
    process.exit(); //to exit the node app if error occurs while connection with db
  }
};
module.exports = connectDB;
