import React from "react";
import { Plus, Edit, Eye } from "lucide-react";

const ContentManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Content Management Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Content Management</h3>
            <p className="text-gray-500 mt-1">Manage website content, images, and static pages</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Website Sections</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">FAQ Section</p>
                <p className="text-sm text-gray-500">Frequently asked questions</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Product Descriptions</p>
                <p className="text-sm text-gray-500">Product tier information</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Team Bios</p>
                <p className="text-sm text-gray-500">Co-founder information</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Media Management</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Image Gallery</p>
                <p className="text-sm text-gray-500">Product and team images</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Upload New Images</p>
                <p className="text-sm text-gray-500">Add media files</p>
              </div>
              <button className="text-green-600 hover:text-green-700">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
