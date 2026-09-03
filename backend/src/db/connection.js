const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

let cachedConnection = null;

const connection = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MongoDB Connection Error: MONGO_URI environment variable is missing.");
    return null;
  }

  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    return cachedConnection;
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    throw err;
  }
};

module.exports = connection;

