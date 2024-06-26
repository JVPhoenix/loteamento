import About from "@/components/home/About";
import Contacts from "@/components/home/Contacts";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Products from "@/components/products/Products";
import { PageSelector } from "@/types";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen bg-black1 text-lg">
      <div className="w-full h-full">
        <Header page={PageSelector.HomePage} />
        <About />
        <Products />
        <Contacts page={PageSelector.HomePage} />
        <Footer />
      </div>
    </main>
  );
}
