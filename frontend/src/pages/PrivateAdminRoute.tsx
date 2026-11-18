import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("triksha_admin_token");
  return token ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateAdminRoute;
