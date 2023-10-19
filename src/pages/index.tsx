import About from "@/components/About";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Products from "@/components/Products";
import { PageSelector } from "@/types";
import { Inter } from "next/font/google";
import Head from "next/head";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={twMerge("flex w-full min-h-screen bg-black1 text-lg", inter.className)}>
      <div className="w-full h-full">
        <Head>
          <title> Loteamento R. Martins </title>
        </Head>
        <Header page={PageSelector.HomePage} />
        <About />
        <Products />
        <Contacts page={PageSelector.HomePage} />
        <Footer />
      </div>
    </main>
  );
}
