import { ClientsDataContextType, ClientsDataInterface } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";

const clientsDataFirstInfo = [{
  name: "",
  cpf: "",
  birth: "",
  adress: "",
  phone: "",
  contractNumber: "",
  phase: 0,
  lote: "",
  dimension: "",
  price: 0,
  plan: 0,
  startDate: "",
  lastPaid: "",
  standard: true,
}];

// contexto criado
export const ClientsDataContext = createContext<ClientsDataContextType>({
  clientsData: clientsDataFirstInfo,
});

// usar o contexto criado
export const useClientsData = () => {
  return useContext(ClientsDataContext);
};

// react func do context
export function ClientsDataContextProvider(props: React.PropsWithChildren) {
  const [clientsData, setClientsData] = useState<ClientsDataInterface[] | null>(null);
  const [clientSearch, setClientSearch] = useState<string>("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_LINK}`)
      .then((res) => res.json())
      .then((data: ClientsDataInterface[]) => {
        setClientsData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ClientsDataContext.Provider value={{ clientsData }}>
      {props.children}
    </ClientsDataContext.Provider>
  );
}