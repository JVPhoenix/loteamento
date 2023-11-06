import AdminClientSelect from "@/components/admin/AdminClientSelect";
import AdminClientSelectBox from "@/components/admin/AdminClientSelectBox";
import AdminPageLogin from "@/components/admin/AdminPageLogin";
import ClientPageContent from "@/components/client/ClientPageContent";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { useClientsData } from "@/context/ClientsDataContext";
import { AdminsDataInterface, ClientsDataInterface, FilterSelector, PageSelector } from "@/types";
import Head from "next/head";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Admin() {
  const { adminsData, adminLogin } = useAdminsData();
  const clientsData = useClientsData();

  const [searchError, setSearchError] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<ClientsDataInterface | null>(null);
  const [checkRemember, setCheckRemember] = useState<boolean>(false);
  const [state, setState] = useState<FilterSelector | null>(null);
  const [checkSpecial, setCheckSpecial] = useState<boolean>(false);
  const [stage, setStage] = useState<FilterSelector | null>(null);

  const searchClient = clientsData && Object.values(clientsData);

  const searchAdmin =
    adminsData &&
    Object.values(adminsData).filter((admin: AdminsDataInterface) => {
      if (adminLogin.cpf.indexOf(admin.cpf) >= 0) {
        if (adminLogin.password === admin.password) {
          if (checkRemember) {
            window.localStorage.setItem(
              "USER_CREDENTIALS",
              JSON.stringify({ cpf: admin.cpf, password: admin.password, checkRemember: checkRemember })
            );
          }
          return admin.name;
        }
      }
    });

  const handleError = () => {
    if (searchAdmin?.length === 0) {
      setSearchError(true);
    } else {
      setSearchError(false);
    }
  };

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
          <title>Administração</title>
        </Head>
        <Header
          page={PageSelector.Admin}
          searchAdmin={searchAdmin}
          handleError={handleError}
          setSelectedClient={setSelectedClient}
        />
      </div>
      <div className="flex flex-col m-auto py-6 items-center">
        {searchAdmin?.length === 0 ? (
          <AdminPageLogin
            checkRemember={checkRemember}
            setCheckRemember={setCheckRemember}
            searchError={searchError}
            handleError={handleError}
          />
        ) : searchAdmin?.length === 1 ? (
          <div className="flex flex-col items-center pb-10">
            <AdminClientSelect
              state={state}
              handleState={handleState}
              checkSpecial={checkSpecial}
              setCheckSpecial={setCheckSpecial}
              stage={stage}
              handleStage={handleStage}
            />
            <AdminClientSelectBox
              clients={searchClient}
              placeholder="Digite o Nome do Cliente ou Quadra e Lote"
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              state={state}
              special={checkSpecial}
              stage={stage}
            />
          </div>
        ) : null}
        {selectedClient && <ClientPageContent data={selectedClient} page={PageSelector.Admin} />}
      </div>
      <Footer />
    </div>
  );
}
