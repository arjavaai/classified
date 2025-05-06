import { Metadata } from "next";
import Header from "@/components/header";
import InfoFooter from "@/components/info-footer";
import SiteFooter from "@/components/site-footer";
import DashboardPage from "@/components/dashboard/dashboard-page";
import ProtectedRoute from "@/components/auth/protected-route";

export const metadata: Metadata = {
  title: "Dashboard | Classified Escort",
  description: "Manage your ads and account settings",
};

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      {/* Full-width dashboard with no padding */}
      <div className="flex-grow">
        <ProtectedRoute requireVerified={true}>
          <DashboardPage />
        </ProtectedRoute>
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  );
}
