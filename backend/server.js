require('dotenv').config(); // 👈 should be at the very top
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const preOrderRoutes = require("./routes/preOrderRoutes");
const contactRoutes = require('./routes/contactRoutes');
const faqRoutes = require('./routes/faqRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const systemRoutes = require("./routes/systemRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/preorder", preOrderRoutes);
app.use('/api', contactRoutes);
app.use('/api', faqRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use("/api/system", systemRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
