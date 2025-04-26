"use client";

import { LayoutDashboard, Image, CreditCard, Settings } from "lucide-react";

// Define TabType locally instead of importing it
type TabType = "overview" | "posts" | "payment" | "settings";

interface DashboardTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function DashboardTabs({ activeTab, setActiveTab }: DashboardTabsProps) {
  return (
    <div className="flex overflow-x-auto pb-2 -mx-1">
      <TabButton 
        icon={<LayoutDashboard className="h-4 w-4 mr-2" />}
        label="Overview" 
        isActive={activeTab === "overview"} 
        onClick={() => setActiveTab("overview")} 
        dataTab="overview"
      />
      <TabButton 
        icon={<Image className="h-4 w-4 mr-2" />}
        label="Posts" 
        isActive={activeTab === "posts"} 
        onClick={() => setActiveTab("posts")} 
        dataTab="posts"
      />
      <TabButton 
        icon={<CreditCard className="h-4 w-4 mr-2" />}
        label="Payment History" 
        isActive={activeTab === "payment"} 
        onClick={() => setActiveTab("payment")} 
        dataTab="payment"
      />
      <TabButton 
        icon={<Settings className="h-4 w-4 mr-2" />}
        label="Account Settings" 
        isActive={activeTab === "settings"} 
        onClick={() => setActiveTab("settings")} 
        dataTab="settings"
      />
    </div>
  );
}

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  dataTab: string;
}

function TabButton({ icon, label, isActive, onClick, dataTab }: TabButtonProps) {
  return (
    <button
      data-tab={dataTab}
      className={`px-4 py-2 rounded-md text-sm font-medium flex items-center whitespace-nowrap mx-1 ${
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
