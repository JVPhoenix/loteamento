import ErrorPage from "@/components/utils/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { ClientsDataInterface, FilterSelector, PageSelector, UserRoles } from "@/types";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import AdminSearchSelect from "@/components/admin/AdminSearchSelect";
import { useState } from "react";
import { useClientsData } from "@/context/ClientsDataContext";
import AdminReadjust from "@/components/admin/AdminReadjust";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ReadjustClient() {
  const { user, isLoading } = useUser();
  const checkRoles = (role: string) => {
    if (user) {
      const userRoles: any = user.userRoles;
      return userRoles.includes(role) ? true : false;
    }
  };

  const { clientsData } = useClientsData();

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
        <Header page={PageSelector.AdminReadjustClient} />
      </div>
      {!isLoading && (
        <>
          {(user && checkRoles(UserRoles.Admins)) || checkRoles(UserRoles.Agents) ? (
            <>
              <div className="flex flex-col m-auto py-6 items-center">
                <div className="flex flex-col items-center pb-10">
                  <AdminSearchFilters
                    state={state}
                    handleState={handleState}
                    stage={stage}
                    handleStage={handleStage}
                    page={PageSelector.AdminReadjustClient}
                  />
                  <AdminSearchSelect
                    options={clientsData}
                    placeholder="Digite o Nome do Cliente ou Quadra e Lote"
                    setSelectedClient={setSelectedClient}
                    state={state}
                    stage={stage}
                    page={PageSelector.AdminReadjustClient}
                  />
                </div>
                <AdminReadjust client={selectedClient} page={PageSelector.AdminReadjustClient} />
              </div>
              <Footer />
            </>
          ) : (
            <ErrorPage page={PageSelector.AdminReadjustClient} />
          )}
        </>
      )}
    </div>
  );
}
