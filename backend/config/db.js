const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection FAILED ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
