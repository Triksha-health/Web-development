import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { motion, easeOut } from "framer-motion";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  interface AdminLoginResponse {
    token: string;
    // Add other fields if needed
  }

  interface AdminLoginPayload {
    email: string;
    password: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post<AdminLoginResponse, { data: AdminLoginResponse }, AdminLoginPayload>(
        "https://triksha-backend-f5f0cth4f9c0b8g9.southindia-01.azurewebsites.net/api/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  // Animation variants for container
  // Use "easeOut" for the ease property
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  // Animation variants for form elements
  const formElementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  // Animation variants for button
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.h2 className="text-center text-3xl font-bold text-gray-900" variants={formElementVariants}>
          Admin Login
        </motion.h2>
        <motion.p className="text-center text-sm text-gray-600 mt-2" variants={formElementVariants}>
          Not an admin?{" "}
          <Link to="/signin" className="text-primary-600 hover:text-primary-700 font-medium">
            Go to User Login
          </Link>
        </motion.p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" variants={formElementVariants}>
          {error && (
            <motion.div className="mb-4 bg-red-100 text-red-600 p-3 rounded" variants={formElementVariants}>
              {error}
            </motion.div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={formElementVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="admin@example.com"
                />
              </div>
            </motion.div>

            <motion.div variants={formElementVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover">
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Login as Admin
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AdminLoginPage;
