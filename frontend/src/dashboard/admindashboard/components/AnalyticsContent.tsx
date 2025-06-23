import React from "react";
import { TrendingUp } from "lucide-react";

const AnalyticsContent: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pre-orders & Sign-ups Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would be integrated here</p>
              <p className="text-sm text-gray-400">Daily/Weekly/Monthly trends</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Karnataka</span>
              <span className="text-sm font-semibold text-gray-900">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Maharashtra</span>
              <span className="text-sm font-semibold text-gray-900">22%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tamil Nadu</span>
              <span className="text-sm font-semibold text-gray-900">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Delhi</span>
              <span className="text-sm font-semibold text-gray-900">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Others</span>
              <span className="text-sm font-semibold text-gray-900">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <h4 className="font-medium text-gray-900">Daily Report</h4>
            <p className="text-sm text-gray-500 mt-1">Today's activity summary</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <h4 className="font-medium text-gray-900">Weekly Report</h4>
            <p className="text-sm text-gray-500 mt-1">Past 7 days overview</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <h4 className="font-medium text-gray-900">Monthly Report</h4>
            <p className="text-sm text-gray-500 mt-1">Current month analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent;
