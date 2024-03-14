import ErrorPage from "@/components/svg/ErrorPage";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import AdminSearchSelectBox from "@/components/admin/AdminSearchSelectBox";
import ClientPageContent from "@/components/client/ClientPageContent";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { useClientsData } from "@/context/ClientsDataContext";
import { ClientsDataInterface, FilterSelector, PageSelector } from "@/types";
import Head from "next/head";
import { useState } from "react";

export default function Buscar() {
  const clientsData = useClientsData();
  const searchClient = clientsData && Object.values(clientsData);
  const { searchAdmin } = useAdminsData();

  const [selectedClient, setSelectedClient] = useState<ClientsDataInterface | null>(null);
  const [state, setState] = useState<FilterSelector | null>(null);
  const [checkSpecial, setCheckSpecial] = useState<boolean>(false);
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
          <title>{searchAdmin?.length !== 0 ? "Buscar Cliente" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminSearch} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
          <div className="flex flex-col m-auto py-6 items-center">
            <div className="flex flex-col items-center">
              <AdminSearchFilters
                state={state}
                handleState={handleState}
                checkSpecial={checkSpecial}
                setCheckSpecial={setCheckSpecial}
                stage={stage}
                handleStage={handleStage}
                page={PageSelector.AdminSearch}
              />
              <AdminSearchSelectBox
                options={searchClient}
                placeholder="Digite o Nome do Cliente ou Quadra e Lote"
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                state={state}
                special={checkSpecial}
                stage={stage}
                page={PageSelector.AdminSearch}
              />
            </div>
            {selectedClient && <ClientPageContent data={selectedClient} page={PageSelector.AdminLogin} />}
          </div>
          <Footer />
        </>
      ) : searchAdmin?.length === 0 ? (
        <ErrorPage page={PageSelector.AdminSearch} />
      ) : null}
    </div>
  );
}
