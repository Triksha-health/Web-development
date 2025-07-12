import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const controls = useAnimation();

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  interface LoginFunction {
    (email: string, password: string): Promise<void>;
  }

  const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      await (login as LoginFunction)(email, password);
      navigate("/userdashboard");
    } catch (err: unknown) {
      setError("Invalid email or password");
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // First, update the inputVariants to include a container variant
  const inputContainerVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
    focus: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  // Update the input variants to only handle shadow
  const inputVariants = {
    rest: { boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" },
    hover: {
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
    focus: {
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const backgroundVariants = {
    animate: {
      background: ["linear-gradient(45deg, #f7fafc, #edf2f7)", "linear-gradient(45deg, #edf2f7, #f7fafc)"],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
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
          Sign in to your account
        </motion.h2>
        <motion.p className="mt-2 text-center text-sm text-gray-600" variants={itemVariants}>
          Or{" "}
          <Link to="/signup" className="font-medium text-primary-500 hover:text-primary-600">
            create a new account
          </Link>
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" variants={itemVariants}>
          {error && (
            <motion.div
              className="mb-4 bg-red-50 text-red-500 p-3 rounded-md text-sm"
              animate={controls}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <motion.div
                className="mt-1 relative"
                variants={inputContainerVariants}
                initial="rest"
                whileHover="hover"
                whileFocus="focus"
              >
                <motion.div
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
                />
              </motion.div>
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
                  autoComplete="current-password"
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
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.div className="flex items-center justify-between" variants={itemVariants}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          <motion.div className="mt-6" variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <motion.div
                  className="w-full border-t border-gray-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <motion.span
                  className="px-2 bg-white text-gray-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Or continue with
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
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SignInPage;
