import { useState, ChangeEvent, FormEvent } from "react";
import { User, Mail, Phone, Edit2, MapPin, Calendar, Award, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: string;
}

const ProfileTab: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    dateOfBirth: "",
    emergencyContact: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Call API or context to update profile
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and account details</p>
        </div>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`mt-4 sm:mt-0 inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
            isEditing
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md"
              : "bg-gradient-to-r btn-primary text-white   shadow-lg hover:shadow-xl"
          }`}
        >
          <Edit2 className="w-5 h-5 mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit Profile Information</h2>
              <p className="text-gray-600">Update your personal details below</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all duration-300 text-lg"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all duration-300 text-lg"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all duration-300 text-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-3">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all duration-300 text-lg"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-3">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all duration-300 text-lg resize-none"
                  />
                </div>

                {/* Emergency Contact */}
                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-semibold text-gray-700 mb-3">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all duration-300 text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r btn-primary  text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            {/* Display mode */}
            <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 px-8 py-12 relative overflow-hidden">
              {/* Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12"></div>
              </div>

              {/* Profile header */}
              <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="relative group">
                  <div className="w-28 h-28 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-105 transition-transform duration-300">
                    <User className="w-14 h-14 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1 text-white">
                  <h2 className="text-4xl font-bold mb-3">{user?.name}</h2>

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Member since June 2025</span>
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <Award className="w-4 h-4 mr-2" />
                      <span>Early Bird Customer</span>
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <Shield className="w-4 h-4 mr-2" />
                      <span>Verified Account</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile info */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  {/* Email */}
                  <div className="group">
                    <div className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-200">
                        <Mail className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Email Address</div>
                        <div className="text-lg font-semibold text-gray-900">{user?.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <div className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                        <Phone className="w-6 h-6 text-secondary-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Phone Number</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.phone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="group">
                    <div className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                        <Calendar className="w-6 h-6 text-accent-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Date of Birth</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {new Date(formData.dateOfBirth).toLocaleDateString(undefined, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Details</h3>
                  {/* Address */}
                  <div className="group">
                    <div className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Address</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.address}</div>
                      </div>
                    </div>
                  </div>
                  {/* Emergency Contact */}
                  <div className="group">
                    <div className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                        <Phone className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Emergency Contact</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.emergencyContact}</div>
                      </div>
                    </div>
                  </div>
                  {/* Account Status */}
                  <div className="group">
                    <div className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Account Status</div>
                        <div className="text-lg font-semibold text-green-600">Verified & Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account Statistics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <Star className="w-6 h-6 text-primary-400" />
          </div>
          <div className="text-3xl font-bold text-primary-700 mb-2">1</div>
          <div className="text-primary-600 font-medium">Active Orders</div>
        </div>
        
        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <Star className="w-6 h-6 text-secondary-400" />
          </div>
          <div className="text-3xl font-bold text-secondary-700 mb-2">June 2025</div>
          <div className="text-secondary-600 font-medium">Member Since</div>
        </div>
        
        <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <Star className="w-6 h-6 text-accent-400" />
          </div>
          <div className="text-3xl font-bold text-accent-700 mb-2">Early Bird</div>
          <div className="text-accent-600 font-medium">Customer Tier</div>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileTab;
