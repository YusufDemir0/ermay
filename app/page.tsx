import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/home/hero-section"
import StatsBar from "@/components/home/stats-bar"
import CategoryGrid from "@/components/home/category-grid"
import FeaturedProducts from "@/components/home/featured-products"
import WhyErmay from "@/components/home/why-ermay"
import Testimonials from "@/components/home/testimonials"
import BlogPreview from "@/components/home/blog-preview"
import DealerCTA from "@/components/home/dealer-cta"
import Collaborations from "@/components/home/collaborations"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <CategoryGrid />
        <FeaturedProducts />
        <WhyErmay />
        <Testimonials />
        <Collaborations />
        <BlogPreview />
        <DealerCTA />
      </main>
      <Footer />
    </>
  )
}
