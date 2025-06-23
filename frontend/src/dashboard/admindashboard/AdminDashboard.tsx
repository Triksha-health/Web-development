import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";
import PreOrdersContent from "./components/PreOrdersContent";
import UsersContent from "./components/UsersContent";
import AnalyticsContent from "./components/AnalyticsContent";
import ContentManagement from "./components/ContentManagement";
import ProfileContent from "./components/ProfileContent";
import { getDashboardData } from "./components/data";

interface DashboardData {
  dashboardStats: {
    totalPreOrders: number;
    newSignUpsToday: number;
    newSignUpsWeek: number;
    websiteTraffic: number;
    pendingOrders: number;
    confirmedOrders: number;
    totalRevenue: number;
  };
  recentPreOrders: Array<{
    id: string;
    customer: string;
    email: string;
    product: string;
    date: string;
    amount: string;
    status: string;
    payment: string;
  }>;
  allPreOrders: Array<{
    id: string;
    customer: string;
    email: string;
    product: string;
    date: string;
    amount: string;
    status: string;
    payment: string;
  }>;
  users: Array<{
    id: string;
    name: string;
    email: string;
    registrationDate: string;
    preOrderStatus: string;
    orderId: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const renderContent = (): JSX.Element => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent setActiveSection={setActiveSection} />;
      case "preorders":
        return <PreOrdersContent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
      case "users":
        return <UsersContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "content":
        return <ContentManagement />;
      case "profile":
        return <ProfileContent />;
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h3>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex mt-16">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {activeSection === "dashboard"
                  ? "Dashboard Overview"
                  : activeSection === "preorders"
                  ? "Pre-order Management"
                  : activeSection === "users"
                  ? "User Management"
                  : activeSection === "analytics"
                  ? "Analytics & Reporting"
                  : activeSection === "content"
                  ? "Content Management"
                  : activeSection === "profile"
                  ? "My Profile"
                  : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h1>
              <p className="text-gray-600">
                {activeSection === "dashboard"
                  ? "Monitor key metrics and recent activity"
                  : activeSection === "preorders"
                  ? "Manage all pre-orders, payments, and shipping status"
                  : activeSection === "users"
                  ? "View and manage user registrations and profiles"
                  : activeSection === "analytics"
                  ? "View trends, reports, and geographic data"
                  : activeSection === "content"
                  ? "Update website content and manage media files"
                  : activeSection === "profile"
                  ? "Manage your personal information and account details"
                  : `Manage your ${activeSection} settings and data`}
              </p>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
