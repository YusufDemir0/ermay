import type { Metadata } from "next";
import { B2BDashboardContent } from "@/components/b2b/b2b-dashboard-content";

export const metadata: Metadata = {
  title: "B2B Dashboard | Ermay Mobilya",
  description: "Ermay Mobilya B2B bayi paneli.",
};

export default function B2BDashboardPage() {
  return <B2BDashboardContent />;
}
