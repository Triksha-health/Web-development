import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { User, Calendar, Shield, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

const ProfileContent: React.FC = () => {
  const userProfile = useAppSelector((state) => state.adminData.userProfile);
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-green-400 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        <div className="relative flex items-start space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
            <p className="text-white/80 mb-4">{userProfile.role}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{userProfile.memberSince}</span>
              </div>
              {userProfile.isSuperAdmin && (
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Super Admin</span>
                </div>
              )}
              {userProfile.isVerified && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified Account</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information & Additional Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900">{userProfile.contactInformation.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900">{userProfile.contactInformation.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-900">{userProfile.contactInformation.dateOfBirth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Details</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">{userProfile.additionalDetails.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Emergency Contact</p>
                <p className="font-medium text-gray-900">{userProfile.additionalDetails.emergencyContact}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-medium text-green-600">{userProfile.additionalDetails.accountStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
