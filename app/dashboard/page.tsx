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
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <ProtectedRoute requireVerified={true}>
          <DashboardPage />
        </ProtectedRoute>
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  );
}
