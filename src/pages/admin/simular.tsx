import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { PageSelector } from "@/types";
import Head from "next/head";

export default function Simular() {
  const { searchAdmin } = useAdminsData();
  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Head>
          <title>{searchAdmin?.length !== 0 ? "Simular Reajuste" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminSimulate} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
          <div className="flex flex-col m-auto py-6 items-center">
            <div className="flex flex-col items-center pb-10">RENDERIZADO</div>
          </div>
          <Footer />
        </>
      ) : (
        <ErrorPage page={PageSelector.AdminSimulate} />
      )}
    </div>
  );
}
