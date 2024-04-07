import ErrorPage from "@/components/utils/ErrorPage";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import AdminSearchSelect from "@/components/admin/AdminSearchSelect";
import ClientPageContent from "@/components/client/ClientPageContent";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useClientsData } from "@/context/ClientsDataContext";
import { ClientsDataInterface, FilterSelector, PageSelector } from "@/types";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Search() {
  const { user, isLoading } = useUser();
  const clientsData = useClientsData();
  const searchClient = clientsData && Object.values(clientsData);

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
        <Header page={PageSelector.AdminSearch} />
      </div>
      {!isLoading && (
        <>
          {user ? (
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
                  <AdminSearchSelect
                    options={searchClient}
                    placeholder="Digite o Nome do Cliente ou Quadra e Lote"
                    setSelectedClient={setSelectedClient}
                    state={state}
                    special={checkSpecial}
                    stage={stage}
                    page={PageSelector.AdminSearch}
                  />
                </div>
                {selectedClient && <ClientPageContent data={selectedClient} page={PageSelector.AdminSearch} />}
              </div>
              <Footer />
            </>
          ) : (
            <ErrorPage page={PageSelector.AdminSearch} />
          )}
        </>
      )}
    </div>
  );
}
