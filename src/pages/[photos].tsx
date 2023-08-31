import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { photosData1, photosData2, } from "@/data/photosData";
import { HeaderSelector, PageInfos } from "@/types";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
const inter = Inter({ subsets: ["latin"] });

export default function Images() {
  const { query } = useRouter();
  const [pageInfos, setPageInfos] = useState<PageInfos>({
    id: 0,
    queryName: "",
    title: "",
    photosDataBase: [],
  });

  useEffect(() => {
    if (query.photos === "etapa1") {
      setPageInfos({
        id: HeaderSelector.Etapa1,
        queryName: query.photos,
        title: "1ª ETAPA",
        photosDataBase: photosData1,
      });
    } else if (query.photos === "etapa2") {
      setPageInfos({
        id: HeaderSelector.Etapa2,
        queryName: query.photos,
        title: "2ª ETAPA",
        photosDataBase: photosData2,
      });
    }
  }, [query]);

  return (
    <div
      className={twMerge("flex flex-col w-full min-h-screen bg-black1 text-white text-center text-lg", inter.className)}
    >
      <Head>
        <title>{pageInfos.title}</title>
      </Head>
      <Header />
      <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">FOTOS - {pageInfos.title}</h1>
      <div className="flex flex-wrap gap-2 justify-center items-center p-3 m-auto">
        {pageInfos.photosDataBase.map((value) => (
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
