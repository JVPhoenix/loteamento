import AdminPageClientSelect from "@/components/AdminPageClientSelect";
import AdminPageLogin from "@/components/AdminPageLogin";
import ClientPageContent from "@/components/ClientPageContent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { useClientsData } from "@/context/ClientsDataContext";
import { AdminsDataInterface, ClientsDataInterface, PageSelector } from "@/types";
import Head from "next/head";
import { useState } from "react";

export default function Admin() {
  const { adminsData, adminLogin } = useAdminsData();
  const clientsData = useClientsData();
  const [searchError, setSearchError] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<ClientsDataInterface | null>(null);
  const [checkRemember, setCheckRemember] = useState<boolean>(false);
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
          <>
            <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold select-none mb-2">
              SELECIONE UM CLIENTE
            </h1>
            <AdminPageClientSelect
              clients={searchClient}
              placeholder="Digite o Nome do Cliente ou Quadra e Lote"
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
          </>
        ) : null}
        {selectedClient && <ClientPageContent data={selectedClient} page={PageSelector.Admin} />}
      </div>
      <Footer />
    </div>
  );
}
