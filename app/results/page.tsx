import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Results from "@/components/sections/Results";

export default function ResultsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Results />
      </main>
      <Footer />
    </div>
  );
}
