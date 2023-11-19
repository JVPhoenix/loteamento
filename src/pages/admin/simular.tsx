import ErrorPage from "@/components/svg/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { PageSelector } from "@/types";
import Head from "next/head";
import MaintenancePage from "@/components/svg/MaintenencePage";

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
            <MaintenancePage />
          </div>
          <Footer />
        </>
      ) : searchAdmin?.length === 0 ? (
        <ErrorPage page={PageSelector.AdminSimulate} />
      ) : null}
    </div>
  );
}
