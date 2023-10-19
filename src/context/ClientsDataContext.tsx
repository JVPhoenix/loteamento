import { ClientsDataInterface } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";

// contexto criado
export const ClientsDataContext = createContext<ClientsDataInterface[] | null>(null);

// usar o contexto criado
export const useClientsData = () => {
  return useContext(ClientsDataContext);
};

// react func do context
export function ClientsDataContextProvider(props: React.PropsWithChildren) {
  const [clientsData, setClientsData] = useState<ClientsDataInterface[] | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_LINK}`)
      .then((res) => res.json())
      .then((data: ClientsDataInterface[]) => {
        setClientsData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return <ClientsDataContext.Provider value={clientsData}>{props.children}</ClientsDataContext.Provider>;
}
