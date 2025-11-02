import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Features from "@/components/sections/Features";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Features />
      </main>
      <Footer />
    </div>
  );
}
