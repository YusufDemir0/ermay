import type { Metadata } from "next";
import { B2BLoginContent } from "@/components/b2b/b2b-login-content";

export const metadata: Metadata = {
  title: "B2B Bayi Portali | Ermay Mobilya",
  description:
    "Ermay Mobilya B2B bayi portali. Ozel fiyatlar, toplu siparisler ve bayi destegi.",
};

export default function B2BPage() {
  return <B2BLoginContent />;
}
