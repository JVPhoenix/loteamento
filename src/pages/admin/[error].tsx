import ErrorPage from "@/components/utils/ErrorPage";
import Header from "@/components/home/Header";
import { PageSelector } from "@/types";
import Head from "next/head";

export default function AdminErrorPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Head>
          <title>ERRO</title>
        </Head>
        <Header page={PageSelector.ErrorPage} />
      </div>
      <ErrorPage />
    </div>
  );
}
