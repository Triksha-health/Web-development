require('dotenv').config(); // ✅ Load env variables at the very top
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const connectDB = require('./config/db');
connectDB();

// 🛠 Load route files
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const faqRoutes = require('./routes/faqRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const systemRoutes = require('./routes/systemRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const preorderRoutes = require('./routes/preorderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const googleauthRoutes = require('./routes/googleauthRoutes'); // ✅ Google Auth Route

// 🛠 Passport config (Google strategy)
require('./config/passport');

console.log("MONGO_URL from .env is:", process.env.MONGO_URL);
const app = express();

// 🌐 Middleware
app.use(cors());
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

// 🔗 API Routes
app.use("/api/payment", paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', faqRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use("/api/system", systemRoutes);
app.use('/api/preorder', preorderRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/user', userRoutes); // ✅ User dashboard routes
app.use('/auth', googleauthRoutes); // ✅ Google Auth

// 🧪 Test Route
app.get('/', (req, res) => {
  res.send('✅ Triksha Backend is Running!');
});

// 🚀 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));