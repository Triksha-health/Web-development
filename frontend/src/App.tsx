import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PreOrderPage from "./pages/PreOrderPage";
import TeamsPage from "./pages/TeamsPage";
import UserDashBored from "./pages/UserDashBored";
import ForgotPassword from "./pages/ForgotPassword";

import AdminDashboard from "./dashboard/admindashboard/AdminDashboard";

function App() {
  useEffect(() => {
    document.title = "Triksha - AI-Powered Health Wearable";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="pre-order" element={<PreOrderPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="userdashboard/*" element={<UserDashBored />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
