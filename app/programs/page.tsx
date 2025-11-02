import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Programs from "@/components/sections/Programs";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Programs />
      </main>
      <Footer />
    </div>
  );
}
