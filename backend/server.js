require('dotenv').config(); // Always keep this at the top

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

// DB connection
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const systemRoutes = require('./routes/systemRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const preorderRoutes = require('./routes/preorderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const googleauthRoutes = require('./routes/googleauthRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');

// Passport config
require('./config/passport');

// Connect to MongoDB
console.log("MONGO_URL from .env is:", process.env.MONGO_URL);
connectDB();

const app = express();

// CORS config
app.use(cors({
  origin: [
    "https://trikshahealth.com",
    "http://localhost:5173" // For local dev
  ],
  credentials: true
}));

// Body parser
app.use(express.json());

// Session setup (needed for Google OAuth)
app.use(session({
  secret: process.env.JWT_SECRET || 'trikshaSecret',
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// 📁 Serve uploaded resume files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register routes
app.use("/api/payment", paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use("/api/system", systemRoutes);
app.use('/api/preorder', preorderRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/user', userRoutes);
app.use('/auth', googleauthRoutes);
app.use('/api/jobs', jobApplicationRoutes); // 👈 Job Application Form Route

// Health Check Route
app.get('/', (req, res) => {
  res.send('✅ Triksha Backend is Running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
