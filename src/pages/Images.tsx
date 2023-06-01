import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { photosData1 } from "@/data/photosData";
import { HeaderSelector } from "@/types";
import { Inter } from "next/font/google";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
const inter = Inter({ subsets: ["latin"] });

export default function Images() {
  return (
    <div
      className={twMerge("flex flex-col w-full min-h-screen bg-black1 text-white text-center text-lg", inter.className)}
    >
      <Header page={HeaderSelector.Photos} />
      <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">FOTOS - 1ª ETAPA</h1>
      <div className="flex flex-wrap gap-2 justify-center items-center p-3 m-auto">
        {photosData1.map((value) => (
          <Image
            className="rounded-xl max-w-sm response:max-w-md max-h-[340px] object-cover"
            src={value.url}
            alt={value.url}
            width={value.width}
            height={value.height}
            key={value.url}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
