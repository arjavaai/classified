"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, User, Mail, MapPin, Lock, AlertTriangle } from "lucide-react";

export default function DashboardAccountSettings() {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Jr",
    email: "jrebecca405@yahoo.com",
    location: "",
    profileImage: null as string | null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
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
                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
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
                      className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Id
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="location"
                      id="location"
                      className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
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
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition"
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
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-primary" />
            Security
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium">Change Password</h4>
              <p className="text-gray-500 text-sm mt-1">
                Ensure your account is using a long, random password to stay secure.
              </p>
            </div>
            
            <button
              type="button"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6 text-red-600 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Danger Zone
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium">Delete Account</h4>
              <p className="text-gray-500 text-sm mt-1">
                Once you delete your account, there is no going back. Please be certain.
              </p>
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
  );
}
