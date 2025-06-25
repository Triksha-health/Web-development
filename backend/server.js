require('dotenv').config(); // 👈 should be at the very top
const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const faqRoutes = require('./routes/faqRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const systemRoutes = require("./routes/systemRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
console.log("MONGO_URL from .env is:", process.env.MONGO_URL); // 🔍 Add this line

connectDB();

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use("/api/payment", paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', faqRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use("/api/system", systemRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
