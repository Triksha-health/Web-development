require('dotenv').config(); // 👈 should be at the very top
const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const preOrderRoutes = require("./routes/preOrderRoutes");

dotenv.config();
console.log("MONGO_URL from .env is:", process.env.MONGO_URL); // 🔍 Add this line

connectDB();

const app = express();
const cors = require('cors');
app.use(cors());



app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/preorder", preOrderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
