import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);

  const { signup, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const controls = useAnimation();

  interface SendOtpResponse {
    message?: string;
    [key: string]: any;
  }

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
      });
      return;
    }

    try {

      localStorage.setItem("signup_email", email);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });


      let data = {};
    try {
      data = await response.json();
    } catch (err) {
      console.warn("JSON parse error:", err);

    }

    if (!response.ok) {
      setError((data as any)?.message || "Failed to send OTP");
      return;
    }

    setShowOtpForm(true);
  } catch (err) {
    console.error(err);
    setError("Something went wrong while sending OTP");
  }
};

  const handleVerifyOtp = async () => {

    setError("");
    const email = localStorage.getItem("signup_email");
    if (!email) {
  setError("Email not found. Please restart signup.");
  return;
}
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });


  try {
    // Step 1: Verify OTP
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();


     // ✅ OTP verified → proceed with signup
    try {
      await signup(name, email, password);
      navigate("/userdashboard");
    } catch (signupErr) {
      const msg = (signupErr as Error).message;

      // User already exists → try login
      if (msg.includes("already") || msg.includes("exists")) {
        try {
          await login(email, password);
          navigate("/userdashboard");
        } catch (loginErr) {
          setError("Account exists but login failed: " + (loginErr as Error).message);
        }
      } else {
        setError(msg);
      }
    }

  } catch (err) {
    console.error(err);
    setError("Failed to verify OTP");
  }
};


  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8"
      variants={backgroundVariants}
      animate="animate"
    >
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="mt-6 text-center text-3xl font-bold text-gray-900" variants={itemVariants}>
          Create a new account
        </motion.h2>
        <motion.p className="mt-2 text-center text-sm text-gray-600" variants={itemVariants}>
          Or{" "}
          <Link
            to="/signin"
            className="font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200"
          >
            sign in to your existing account
          </Link>
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10" variants={itemVariants}>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                className="mb-4 bg-red-50 text-red-500 p-3 rounded-md text-sm"
                animate={controls}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showOtpForm ? (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100, damping: 12 }}
                variants={containerVariants}
              >
                <motion.h2 className="text-xl font-bold mb-4 text-center" variants={itemVariants}>
                  Verify your email
                </motion.h2>
                <motion.input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  variants={inputVariants}
                  initial="rest"
                  whileHover="hover"
                  whileFocus="focus"
                />
                <motion.button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Verify OTP
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="signup-form"
                className="space-y-6"
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="mt-1 relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <User className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    <motion.input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Triksha"
                      variants={inputVariants}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="focus"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <motion.di
                      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Mail className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    <motion.input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="you@gmail.com"
                      variants={inputVariants}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="focus"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Lock className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    <motion.input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="••••••••"
                      variants={inputVariants}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="focus"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm password
                  </label>
                  <div className="mt-1 relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Lock className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    <motion.input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="••••••••"
                      variants={inputVariants}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="focus"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div className="flex items-center" variants={itemVariants}>
                  <motion.input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded transition-colors duration-200"
                    variants={inputVariants}
                    initial="rest"
                    whileHover="hover"
                    whileFocus="focus"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover={!isLoading ? "hover" : {}}
                    whileTap={!isLoading ? "tap" : {}}
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      "Sign up"
                    )}
                  </motion.button>
                </motion.div>

                <motion.div className="mt-6" variants={itemVariants}>
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 flex items-center"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="w-full border-t border-gray-300" />
                    </motion.div>
                    <div className="relative flex justify-center text-sm">
                      <motion.span
                        className="px-2 bg-white text-gray-500"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        Or register with
                      </motion.span>
                    </div>
                  </div>

                  <motion.div className="mt-6" variants={itemVariants}>
                    <motion.button
                      type="button"
                      onClick={() =>
                        (window.location.href =
                          "https://triksha-backend-f5f0cth4f9c0b8g9.southindia-01.azurewebsites.net/auth/google")
                      }
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </motion.svg>
                      Sign in with Google
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SignUpPage;
