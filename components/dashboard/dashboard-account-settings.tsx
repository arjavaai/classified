"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, User, Mail, MapPin, Lock, AlertTriangle, Phone, Globe } from "lucide-react";

export default function DashboardAccountSettings() {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Jr",
    email: "jrebecca405@yahoo.com",
    phone: "+1 (555) 123-4567",
    location: "",
    website: "",
    bio: "I am a professional escort based in New York City.",
    profileImage: null as string | null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [activeTab, setActiveTab] = useState("profile");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Tabs */}
      <div className="flex mb-4 border-b overflow-x-auto md:hidden">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "profile" 
              ? "text-blue-600 border-b-2 border-blue-600" 
              : "text-gray-500"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "security" 
              ? "text-blue-600 border-b-2 border-blue-600" 
              : "text-gray-500"
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab("danger")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "danger" 
              ? "text-red-600 border-b-2 border-red-600" 
              : "text-gray-500"
          }`}
        >
          Danger Zone
        </button>
      </div>
      
      {/* Profile Section */}
      <div className={`${activeTab !== "profile" && "hidden md:block"}`}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-[#0066ff]" />
              Your Profile
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {userData.profileImage ? (
                        <img 
                          src={userData.profileImage} 
                          alt="Profile" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <button 
                      type="button"
                      className="absolute bottom-0 right-0 bg-[#0066ff] text-white p-2 rounded-full hover:bg-blue-700 transition"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Upload a profile picture</p>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="focus:ring-[#0066ff] focus:border-[#0066ff] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="focus:ring-[#0066ff] focus:border-[#0066ff] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          className="focus:ring-[#0066ff] focus:border-[#0066ff] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          name="location"
                          id="location"
                          className="focus:ring-[#0066ff] focus:border-[#0066ff] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={formData.location}
                          onChange={handleChange}
                          disabled={!isEditing}
                        >
                          <option value="">Select Location</option>
                          <option value="new-york">New York</option>
                          <option value="los-angeles">Los Angeles</option>
                          <option value="chicago">Chicago</option>
                          <option value="miami">Miami</option>
                          <option value="las-vegas">Las Vegas</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="website"
                          id="website"
                          className="focus:ring-[#0066ff] focus:border-[#0066ff] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={formData.website}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="bio"
                        id="bio"
                        rows={4}
                        className="focus:ring-[#0066ff] focus:border-[#0066ff] block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3 pt-4">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0066ff] hover:bg-blue-700 transition"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0066ff] hover:bg-blue-700 transition"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Security Section */}
      <div className={`${activeTab !== "security" && "hidden md:block"}`}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-[#0066ff]" />
              Security
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium">Change Password</h4>
                <p className="text-gray-500 text-sm mt-1">
                  Ensure your account is using a long, random password to stay secure.
                </p>
                
                <form className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      className="mt-1 focus:ring-[#0066ff] focus:border-[#0066ff] block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      className="mt-1 focus:ring-[#0066ff] focus:border-[#0066ff] block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      className="mt-1 focus:ring-[#0066ff] focus:border-[#0066ff] block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0066ff] hover:bg-blue-700 transition"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-lg font-medium">Two-Factor Authentication</h4>
                <p className="text-gray-500 text-sm mt-1">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                
                <button
                  type="button"
                  className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0066ff] hover:bg-blue-700 transition"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Danger Zone Section */}
      <div className={`${activeTab !== "danger" && "hidden md:block"}`}>
        <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
          <div className="p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-6 text-red-600 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Danger Zone
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium">Delete Account</h4>
                <p className="text-gray-500 text-sm mt-1">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-lg font-medium">Export Data</h4>
                <p className="text-gray-500 text-sm mt-1">
                  Download a copy of your data before deleting your account.
                </p>
                
                <button
                  type="button"
                  className="mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  Export Data
                </button>
              </div>
              
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
