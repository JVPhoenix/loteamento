import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { usePhotosData } from "@/context/PhotosDataContext";
import { PageSelector, InnerPhotosInterface, PageInfos, FilterSelector } from "@/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ErrorPage from "@/components/svg/ErrorPage";
import MaintenancePage from "@/components/svg/MaintenencePage";

export default function Images() {
  const { query } = useRouter();
  const photosData = usePhotosData();
  const [pageInfos, setPageInfos] = useState<PageInfos>({
    id: "",
    index: 0,
    title: "",
    queryName: "",
  });

  const photos = photosData?.photos[pageInfos.index] && Object.values(photosData?.photos[pageInfos.index]);

  useEffect(() => {
    if (query.photos === "etapa1") {
      setPageInfos({
        id: PageSelector.Etapa1,
        index: FilterSelector.Etapa1,
        queryName: query.photos,
        title: "1ª ETAPA",
      });
    } else if (query.photos === "etapa2") {
      setPageInfos({
        id: PageSelector.Etapa2,
        index: FilterSelector.Etapa2,
        queryName: query.photos,
        title: "2ª ETAPA",
      });
    } else if (query.photos) {
      setPageInfos({
        id: "",
        index: -1,
        queryName: PageSelector.ErrorPage,
        title: PageSelector.ErrorPage,
      });
    }
  }, [query.photos]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg">
      <div className="w-full h-full">
        <Head>
          <title>{pageInfos.title}</title>
        </Head>
        <Header page={pageInfos.id} />
      </div>
      <>
        {pageInfos.title === PageSelector.ErrorPage ? (
          <ErrorPage />
        ) : (
          <div className="flex flex-col h-full m-auto bg-black1 text-white text-center text-lg py-5">
            <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold mb-4">
              FOTOS - {pageInfos.title}
            </h1>
            <div className="flex flex-wrap gap-2 justify-center items-center p-3 m-auto">
              {photos?.length === 0 ? (
                <MaintenancePage />
              ) : (
                photos?.map((value: InnerPhotosInterface) => (
                  <Image
                    className="rounded-xl max-w-sm response:max-w-md max-h-[340px] object-cover"
                    src={value.url}
                    alt={value.url}
                    width={value.width}
                    height={value.height}
                    key={value.url}
                    unoptimized
                  />
                ))
              )}
            </div>
          </div>
        )}
      </>
      <Footer />
    </div>
  );
}
