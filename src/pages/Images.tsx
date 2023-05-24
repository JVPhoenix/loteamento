import Header from "@/components/Header";
import { HeaderSelector } from "@/types";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
const inter = Inter({ subsets: ["latin"] });

export default function Images() {
  return (
    <div
      className={twMerge(
        "flex flex-col w-full min-h-screen bg-black1 text-white text-center text-lg",
        inter.className
      )}
    >
      <Header page={HeaderSelector.Photos} />
      <h1>PAGE UNDER CONSTRUCTION</h1>
    </div>
  );
}
