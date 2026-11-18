require('dotenv').config(); // Always keep this at the top

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// DB connection
const connectDB = require('./config/db');

// Passport config
require('./config/passport');

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
const notificationRoutes = require('./routes/notificationRoutes');
const stockRoutes = require("./routes/stockRoutes");

// Fail fast if the session secret is missing — never fall back to a hardcoded value.
if (!process.env.SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is not set. Add it to the environment (Azure app settings / backend/.env) before starting the server."
  );
}

// Connect to MongoDB
connectDB();

const app = express();
const isProd = process.env.NODE_ENV === 'production';

// Behind Azure's proxy — needed for secure cookies + correct client IPs (rate limiting).
app.set('trust proxy', 1);

// Security headers. CSP is disabled because this is a JSON API (the SPA is served
// by Netlify), and uploads must remain fetchable cross-origin by the frontend.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS config — localhost origins only outside production.
const allowedOrigins = [
  "https://trikshahealth.com",
  ...(isProd ? [] : ["http://localhost:5173", "http://localhost:5174"]),
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.options("*", cors());

// Body parser
app.use(express.json());

// Strip MongoDB operator injection ($, .) from request payloads.
app.use(mongoSanitize());

// Rate limiting: a generous global cap, plus a strict cap on auth endpoints.
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." },
});
app.use('/api', globalLimiter);

// Session setup (needed for Google OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
  },
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// 📁 Serve uploaded resume files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register routes
app.use("/api/payment", paymentRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use("/api/system", systemRoutes);
app.use('/api/preorder', preorderRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/user', userRoutes);
app.use('/auth', googleauthRoutes);
app.use('/api/jobs', jobApplicationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/stock", stockRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('✅ Triksha Backend is Running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
