import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogList from "@/components/blog/blog-list"

export const metadata = {
  title: "Blog | Ermay Mobilya",
  description: "Mobilya ve tasarim dunyasindan haberler, rehberler ve ilham verici icerikler.",
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream">
        <BlogList />
      </main>
      <Footer />
    </>
  )
}
