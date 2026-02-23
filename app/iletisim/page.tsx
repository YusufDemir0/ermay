import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "Iletisim | Ermay Mobilya",
  description:
    "Ermay Mobilya ile iletisime gecin. Ofis mobilyasi ihtiyaclariniz icin bize ulasin.",
};

export default function ContactPage() {
  return <ContactContent />;
}
