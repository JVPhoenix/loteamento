import About from "@/components/About";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Products from "@/components/Products";
import { HeaderSelector } from "@/types";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={twMerge(
        "flex flex-col w-full min-h-screen bg-black1 text-lg",
        inter.className
      )}
    >
      <Header page={HeaderSelector.HomePage} />
      <About />
      <Products />
      <Contacts />
      <Footer />
    </main>
  );
}
