import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PreOrderPage from "./pages/PreOrderPage";
import TeamsPage from "./pages/TeamsPage";
import UserDashBored from "./pages/UserDashBored";
import ForgotPassword from "./pages/ForgotPassword";
import ApplyPage from "./pages/ApplyPage";

import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateAdminRoute from "./pages/PrivateAdminRoute";

function App() {
  useEffect(() => {
    document.title = "Triksha - AI powered predictive health monitoring system";
  }, []);

  return (
    <Routes>
      {/* Public + User Routes inside main layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="pre-order" element={<PreOrderPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="applyjob" element={<ApplyPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="userdashboard/*" element={<UserDashBored />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateAdminRoute>
            <AdminDashboard />
          </PrivateAdminRoute>
        }
      />

      {/* Optional: redirect /admin to /admin/dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
