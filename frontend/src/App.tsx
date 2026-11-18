import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Layout from "./components/layout/Layout";

// The public marketing pages are imported directly so they can be
// prerendered to static HTML and load without a second request.
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsPage from "./pages/TermsPage";

import PrivateAdminRoute from "./pages/PrivateAdminRoute";
import { initAnalytics } from "./lib/analytics";

// Everything else is no longer linked from the site, and is loaded only
// when someone opens its URL. This keeps the homepage bundle small.
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const PreOrderPage = lazy(() => import("./pages/PreOrderPage"));
const TeamsPage = lazy(() => import("./pages/TeamsPage"));
const UserDashBored = lazy(() => import("./pages/UserDashBored"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ApplyPage = lazy(() => import("./pages/ApplyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Suspense fallback={null}>
    <Routes>
      {/* Public + User Routes inside main layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="pre-order" element={<PreOrderPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="applyjob" element={<ApplyPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="careers" element={<CareersPage />} />
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
    </Suspense>
  );
}

export default App;
