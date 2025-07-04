// When we switch from in-memory stock to persistent stock stored in MongoDB, you need a way to insert the initial quantities
require('dotenv').config();
const mongoose = require('mongoose');
const Stock = require('../models/Stock');

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    const existing = await Stock.findOne();
    if (existing) {
      console.log("Stock already exists:", existing);
    } else {
      const stock = new Stock({ count: 200 }); //initial count
      await stock.save();
      console.log("Stock seeded:", stock);
    }

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
