import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CatalogContent from "@/components/catalog/catalog-content"

export const metadata = {
  title: "Tum Urunler | Ermay Mobilya",
  description: "Ermay Mobilya urun katalogu. Ofis ve ev mobilyalarini filtreleyin ve kesfedin.",
}

export default function CatalogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <CatalogContent />
      </main>
      <Footer />
    </>
  )
}
