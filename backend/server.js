require('dotenv').config(); // 👈 Keep at the very top
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const systemRoutes = require("./routes/systemRoutes");
const paymentRoutes = require('./routes/paymentRoutes');
const preorderRoutes = require('./routes/preorderRoutes');
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require('./routes/userRoutes');
const googleauthRoutes = require('./routes/googleauthRoutes'); // ✅ Google Auth Route
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');

// 🛠 Passport config (Google strategy)
require('./config/passport');

console.log("MONGO_URL from .env is:", process.env.MONGO_URL); // 🔍 Helpful for debugging

connectDB();

const app = express();
const cors = require('cors');

// ✅ Proper CORS setup: allow requests from your live frontend and optional local dev
app.use(cors({
  origin: [
    "https://trikshahealth.com",
    "http://localhost:5173" // optional: for local development
  ],
  credentials: true, // 🔑 if you use cookies / sessions with frontend
}));

app.use(express.json());

// 🧠 Session middleware (required for Google OAuth)
app.use(session({
  secret: process.env.JWT_SECRET || 'trikshaSecret',
  resave: false,
  saveUninitialized: false,
}));

// 🔐 Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Register routes
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
app.use('/api/jobs', jobApplicationRoutes);

app.get('/', (req, res) => {
  res.send('✅ Triksha Backend is Running!');
});
console.log("JWT_SECRET:", process.env.JWT_SECRET); // ❗️TEMP debug line
console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
