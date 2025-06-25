import React from "react";
import { ShoppingBag, Users, Globe, CreditCard } from "lucide-react";
import { getPaymentStatusColor, getPaymentStatusIcon, getShippingStatusColor, getShippingStatusIcon } from "./data";
import { useAppSelector } from "../../../store/hooks";

interface DashboardContentProps {
  setActiveSection: (section: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ setActiveSection }) => {
  //const { dashboardStats, recentPreOrders } = getDashboardData();
  const dashboardStats = useAppSelector((state) => state.adminData.dashboardStats);
  const allPreOrders = useAppSelector((state) => state.adminData.allPreOrders);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Pre-orders</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalPreOrders.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Sign-ups Today</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.newSignUpsToday}</p>
              <p className="text-xs text-gray-500 mt-1">{dashboardStats.newSignUpsWeek} this week</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Website Traffic</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.websiteTraffic.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+8% from yesterday</p>
            </div>
            <Globe className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(dashboardStats.totalRevenue / 100000).toFixed(1)}L</p>
              <p className="text-xs text-green-600 mt-1">+15% from last month</p>
            </div>
            <CreditCard className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Pre-orders</h3>
            <button
              onClick={() => setActiveSection("preorders")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[...allPreOrders]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 4)
              .map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">
                      {order.product} • {order.amount}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getShippingStatusColor(
                        order.shippingStatus
                      )}`}
                    >
                      {getShippingStatusIcon(order.shippingStatus)}
                      <span className="ml-1">{order.shippingStatus}</span>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-700">Pending Orders</span>
              </div>
              <span className="font-semibold text-gray-900">{dashboardStats.pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-700">Confirmed Orders</span>
              </div>
              <span className="font-semibold text-gray-900">{dashboardStats.confirmedOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-gray-700">Shipped Orders</span>
              </div>
              <span className="font-semibold text-gray-900">45</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-gray-700">Refunded Orders</span>
              </div>
              <span className="font-semibold text-gray-900">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
