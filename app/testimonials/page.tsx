import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/sections/Testimonials";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
