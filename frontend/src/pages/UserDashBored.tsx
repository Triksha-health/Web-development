import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { User, ShoppingBag, LogOut, Menu, X, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProfileTab from "../dashboard/userdashboard/ProfileTab";
import OrdersTab from "../dashboard/userdashboard/OrderTab";
// import NotFoundPage from './NotFoundPage';

function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Simplified navigation items - only Profile and Orders
  const navItems = [
    { name: "Profile", path: "/userdashboard", icon: <User className="w-5 h-5" /> },
    { name: "Orders", path: "/userdashboard/orders", icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  // Check if a nav item is active
  const isActive = (path: string) => {
    if (path === "/userdashboard" && location.pathname === "/userdashboard") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/userdashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-16 left-4 z-20 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:bg-gray-50 transition-colors duration-200"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop (fixed) and Mobile (slideover) */}
      <aside
        className={fixed lg:bg-transparent max-[770px]:bg-white max-[770px]:top-0 max-[770px]:pt-20 mt-0 top-20 bottom-0 left-0 w-64  border-r border-gray-300 overflow-y-auto transition-transform transform z-10 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}}
      >
        <div className="px-4 py-6 h-full flex flex-col">
          {/* Welcome message */}
          <div className="mb-8 p-4 bg-primary-50 rounded-lg">
            <div className="text-sm text-primary-600 mb-1">Welcome back,</div>
            <div className="font-medium text-primary-800">{user?.name ?? "John Doe"}</div>
            <div className="text-xs text-primary-500 mt-1">Manage your account and orders</div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive(item.path)
                    ? "bg-primary-50 text-primary-600 border-r-2 border-primary-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                }}
                onClick={closeSidebar}
              >
                <span
                  className={mr-3 transition-transform duration-200 ${
                    isActive(item.path) ? "scale-110" : "group-hover:scale-105"
                  }}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
                {isActive(item.path) && <ChevronRight className="ml-auto w-4 h-4" />}
              </Link>
            ))}
          </nav>

          {/* Sign out button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex items-center px-4 py-3 w-full text-left rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:scale-105 transition-transform duration-200" />
              <span className="font-medium">Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden" onClick={closeSidebar}></div>
      )}

      {/* Main content */}
      <main className="md:ml-64 pt-8 pb-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Routes>
            <Route index element={<ProfileTab />} />
            <Route path="orders" element={<OrdersTab />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
