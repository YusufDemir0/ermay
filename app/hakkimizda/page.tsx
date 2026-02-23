import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutContent from "@/components/about/about-content"

export const metadata = {
  title: "Hakkimizda | Ermay Mobilya",
  description: "1999'dan beri Kocaeli'den Turkiye'ye kaliteli mobilya ureten Ermay Mobilya'nin hikayesi.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream">
        <AboutContent />
      </main>
      <Footer />
    </>
  )
}
