import ClientPageContent from "@/components/client/ClientPageContent";
import ClientPageSearch from "@/components/client/ClientPageSearch";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useClientsData } from "@/context/ClientsDataContext";
import { ClientsDataInterface, PageSelector } from "@/types";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Client() {
  const { clientsData } = useClientsData();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [cpf, setCpf] = useState<string>("");

  const searchClient = clientsData
    ?.filter((client: ClientsDataInterface) => {
      if (cpf.indexOf(client.cpf) >= 0) {
        return client.cpf;
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

  const handleResetOptions = () => {
    setCpf("");
    setSelectedOption("");
    setSearchError(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Header page={PageSelector.ClientSearch} />
      </div>
      <div className="w-auto m-auto">
        {searchClient?.length && searchClient?.length === 1 ? (
          <ClientPageContent
            data={searchClient[0]}
            page={PageSelector.ClientSearch}
            handleResetOptions={handleResetOptions}
          />
        ) : (
          searchClient?.length === 0 && (
            <ClientPageSearch searchError={searchError} handleError={handleError} cpf={cpf} setCpf={setCpf} />
          )
        )}

        {searchClient?.length && searchClient?.length >= 2 ? (
          <>
            <h1 className="text-white text-center drop-shadow-titles text-xl response:text-2xl font-bold select-none mb-2">
              SELECIONE UM CONTRATO
            </h1>
            {searchClient
              ?.filter((option) => option.status)
              .map((clientContracts) => {
                return (
                  <div
                    className={twMerge(
                      "ease-in-out duration-200 m-auto w-auto p-4 select-none active:duration-100 cursor-not-allowed",
                      "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl m-2 text-center",
                      "hover:text-yellow1 hover:scale-110 active:scale-90 hover:border-yellow1 border-white text-white cursor-pointer"
                    )}
                    key={clientContracts.lote}
                    onClick={() => setSelectedOption(clientContracts.contractNumber)}
                  >
                    <h1>Contrato Nº {clientContracts.contractNumber}</h1>
                    <h1>{clientContracts.lote}</h1>
                  </div>
                );
              })}
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
