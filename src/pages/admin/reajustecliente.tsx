import ErrorPage from "@/components/svg/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { ClientsDataInterface, FilterSelector, PageSelector } from "@/types";
import Head from "next/head";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import AdminSearchSelectBox from "@/components/admin/AdminSearchSelectBox";
import { useState } from "react";
import { useClientsData } from "@/context/ClientsDataContext";
import AdminReajustClient from "@/components/admin/AdminReajust";

export default function ReajustClient() {
  const { searchAdmin } = useAdminsData();
  const clientsData = useClientsData();
  const searchClient = clientsData && Object.values(clientsData);

  const [selectedClient, setSelectedClient] = useState<ClientsDataInterface | null>(null);
  const [state, setState] = useState<FilterSelector | null>(null);
  const [stage, setStage] = useState<FilterSelector | null>(null);

  const handleState = (newState: FilterSelector) => {
    setState((state) => (state === newState ? null : newState));
  };
  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Head>
          <title>{searchAdmin?.length !== 0 ? "Simular Reajuste - Cliente" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminReajustClient} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
          <div className="flex flex-col m-auto py-6 items-center">
            <div className="flex flex-col items-center pb-10">
              <AdminSearchFilters
                state={state}
                handleState={handleState}
                stage={stage}
                handleStage={handleStage}
                page={PageSelector.AdminReajustClient}
              />
              <AdminSearchSelectBox
                clients={searchClient}
                placeholder="Digite o Nome do Cliente ou Quadra e Lote"
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                state={state}
                stage={stage}
                page={PageSelector.AdminReajustClient}
              />
            </div>
            <AdminReajustClient client={selectedClient} page={PageSelector.AdminReajustClient} />
          </div>
          <Footer />
        </>
      ) : searchAdmin?.length === 0 ? (
        <ErrorPage page={PageSelector.AdminReajustClient} />
      ) : null}
    </div>
  );
}
