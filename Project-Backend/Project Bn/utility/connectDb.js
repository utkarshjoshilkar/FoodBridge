const mongoose = require("mongoose");

const connectdb = async (url) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/mydb")
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
    // console.log("MongoDB connected successfully!");
  } catch (error) {
    // console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectdb };
