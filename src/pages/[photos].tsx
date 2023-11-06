import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { LoadingIcon } from "@/components/Icons";
import { usePhotosData } from "@/context/PhotosDataContext";
import { PageSelector, InnerPhotosInterface, PageInfos } from "@/types";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
const inter = Inter({ subsets: ["latin"] });

export default function Images() {
  const { query } = useRouter();
  const photosData = usePhotosData();
  const [pageInfos, setPageInfos] = useState<PageInfos>({
    id: 0,
    index: 0,
    title: "",
    queryName: "",
  });

  useEffect(() => {
    if (query.photos === "etapa1") {
      setPageInfos({
        id: PageSelector.Etapa1,
        index: 0,
        queryName: query.photos,
        title: "1ª ETAPA",
      });
    } else if (query.photos === "etapa2") {
      setPageInfos({
        id: PageSelector.Etapa2,
        index: 1,
        queryName: query.photos,
        title: "2ª ETAPA",
      });
    } else {
      setPageInfos({
        id: 0,
        index: 0,
        queryName: "ERROR",
        title: "ERRO",
      });
    }
  }, [query.photos]);

  return (
    <div className={twMerge("flex flex-col min-h-screen bg-black1 text-lg", inter.className)}>
      <div>
        <Head>
          <title>{pageInfos.title}</title>
        </Head>
        <Header page={pageInfos.id} />
      </div>

      {pageInfos.title === "Carregando" ? (
        <div className="text-white gap-2 text-3xl flex m-auto items-center">
          <LoadingIcon width={16} className="h-16 text-gray-200 animate-spin fill-yellow1" />
          <h1>Carregando página...</h1>
        </div>
      ) : pageInfos.title === "ERRO" ? (
        <div className="flex flex-col m-auto items-center text-white gap-2 text-3xl select-none font-bold">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-9xl text-white tracking-widest">404</h1>
            <div className="bg-gray1  text-black1 px-2 text-sm rounded rotate-12 absolute">PAGE NOT FOUND</div>
          </div>
          <Link
            className={twMerge(
              "ease-in-out duration-200 w-auto text-xl p-4",
              "hover:text-yellow1 hover:scale-110 active:scale-90 active:duration-100 hover:border-yellow1",
              "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl"
            )}
            href="/"
          >
            <h1> PAGINA INICIAL </h1>
          </Link>
        </div>
      ) : (
        <div className={twMerge("flex flex-col m-auto bg-black1 text-white text-center text-lg my-8", inter.className)}>
          <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold mb-4">
            FOTOS - {pageInfos.title}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center items-center p-3 m-auto">
            {photosData?.photos[pageInfos.index] &&
              Object.values(photosData?.photos[pageInfos.index]).map((value: InnerPhotosInterface) => (
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
        </div>
      )}
      <Footer />
    </div>
  );
}
