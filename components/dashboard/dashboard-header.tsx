"use client";

import Link from "next/link";
import { Menu, X, LayoutDashboard, Image, CreditCard, Settings } from "lucide-react";
import { useState } from "react";

type TabType = "overview" | "posts" | "payment" | "settings";

interface DashboardHeaderProps {
  customerId: string;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function DashboardHeader({ 
  customerId, 
  activeTab, 
  setActiveTab 
}: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <span className="ml-4 text-sm text-gray-500 hidden sm:inline-block">Customer ID - {customerId}</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-700 hover:text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-3">
          <NavItem 
            icon={<LayoutDashboard className="h-4 w-4 mr-2" />}
            label="Overview" 
            isActive={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <NavItem 
            icon={<Image className="h-4 w-4 mr-2" />}
            label="Posts" 
            isActive={activeTab === "posts"} 
            onClick={() => setActiveTab("posts")} 
          />
          <NavItem 
            icon={<CreditCard className="h-4 w-4 mr-2" />}
            label="Payment History" 
            isActive={activeTab === "payment"} 
            onClick={() => setActiveTab("payment")} 
          />
          <NavItem 
            icon={<Settings className="h-4 w-4 mr-2" />}
            label="Account Settings" 
            isActive={activeTab === "settings"} 
            onClick={() => setActiveTab("settings")} 
          />
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-gray-500 hover:text-gray-700" 
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="container mx-auto px-6 py-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Dashboard</h2>
              <p className="text-gray-500 mb-6">Customer ID - {customerId}</p>
            </div>

            <nav className="flex flex-col space-y-3">
              <MobileNavItem 
                icon={<LayoutDashboard className="h-5 w-5 mr-3" />}
                label="Overview" 
                isActive={activeTab === "overview"} 
                onClick={() => {
                  setActiveTab("overview");
                  setMobileMenuOpen(false);
                }} 
              />
              <MobileNavItem 
                icon={<Image className="h-5 w-5 mr-3" />}
                label="Posts" 
                isActive={activeTab === "posts"} 
                onClick={() => {
                  setActiveTab("posts");
                  setMobileMenuOpen(false);
                }} 
              />
              <MobileNavItem 
                icon={<CreditCard className="h-5 w-5 mr-3" />}
                label="Payment History" 
                isActive={activeTab === "payment"} 
                onClick={() => {
                  setActiveTab("payment");
                  setMobileMenuOpen(false);
                }} 
              />
              <MobileNavItem 
                icon={<Settings className="h-5 w-5 mr-3" />}
                label="Account Settings" 
                isActive={activeTab === "settings"} 
                onClick={() => {
                  setActiveTab("settings");
                  setMobileMenuOpen(false);
                }} 
              />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
        isActive 
          ? "bg-primary text-white" 
          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

function MobileNavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      className={`px-4 py-3 rounded-md text-lg font-medium w-full text-left flex items-center ${
        isActive 
          ? "bg-primary text-white" 
          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
