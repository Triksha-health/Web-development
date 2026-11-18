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
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateAdminRoute from "./pages/PrivateAdminRoute";

import { initAnalytics } from "./lib/analytics";

function App() {
  useEffect(() => {
    document.title = "Triksha — Predict cardiac risk, before symptoms.";
    initAnalytics();
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
        <Route path="about" element={<AboutPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="userdashboard/*" element={<UserDashBored />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route
        path="/admin/dashboard"
        element={
          <PrivateAdminRoute>
            <AdminDashboard />
          </PrivateAdminRoute>
        }
      />

      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
