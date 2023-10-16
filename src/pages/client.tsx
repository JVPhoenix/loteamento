import ClientPageInfo from "@/components/ClientPageInfo";
import ClientPageLogin from "@/components/ClientPageLogin";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useClientsData } from "@/context/ClientsDataContext";
import { ClientsDataInterface, PageSelector } from "@/types";
import Head from "next/head";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Client() {
  const { clientsData, clientSearch, setClientSearch } = useClientsData();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [searchError, setSearchError] = useState<boolean>(false);

  const searchClient =
    clientsData &&
    // clientSearch.cpf &&
    Object.values(clientsData)
      .filter((client: ClientsDataInterface) => {
        const clientNameMask = client.name
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "");

        if (clientNameMask === clientSearch.name) {
          if (client.cpf.indexOf(clientSearch.cpf) >= 0) {
            return client.cpf;
          }
        }
      })
      .filter((client) => {
        return !selectedOption || client.contractNumber === selectedOption;
      });

  const handleError = () => {
    if (searchClient?.length === 0) {
      setSearchError(true);
    } else {
      setSearchError(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col min-h-screen w-auto bg-black1 text-white text-lg">
        <Header page={PageSelector.Client} />

        <div className="flex w-auto flex-col m-auto gap-5">
          {searchClient?.length && searchClient?.length === 1 ? (
            <ClientPageInfo
              setSelectedOption={setSelectedOption}
              data={searchClient[0]}
              setSearchError={setSearchError}
            />
          ) : (
            searchClient?.length === 0 && <ClientPageLogin searchError={searchError} handleError={handleError} />
          )}

          {searchClient?.length && searchClient?.length >= 2
            ? searchClient?.map((clientContracts) => {
                return (
                  <div
                    className={twMerge(
                      "ease-in-out duration-200 m-auto w-auto p-4 select-none active:duration-100 cursor-not-allowed",
                      "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl",
                      "hover:text-yellow1 hover:scale-110 active:scale-90 hover:border-yellow1 border-white text-white cursor-pointer"
                    )}
                    key={clientContracts.contractNumber}
                    onClick={() => setSelectedOption(clientContracts.contractNumber)}
                  >
                    <h1>{clientContracts.lote}</h1>
                  </div>
                );
              })
            : null}
        </div>
        <div className="flex justify-center">
          <Footer />
        </div>
      </div>
    </>
  );
}
