import { ClientsDataInterface, Methods } from "@/types";
import React, { createContext, useContext, useState, useEffect, Dispatch } from "react";

interface ClientsSUBMIT {
  id?: string | undefined;
  name?: string;
  cpf?: string;
  birth?: string;
  address?: string;
  phone?: string;
  digitalContract?: string;
  contractNumber?: string;
  phase?: number;
  lote?: string;
  dimension?: string;
  price?: number;
  plan?: number;
  startDate?: string;
  paymentList?: string[];
  standard?: boolean;
  entrance?: number | null;
  obs?: string | null;
  status?: boolean;
}

type ClientsDataContextType = {
  clientsData: ClientsDataInterface[] | null;
  handleSubmit: (infos: ClientsSUBMIT, methodSelection: Methods) => void;
  clientsResponseData: number;
  setClientsResponseData: Dispatch<React.SetStateAction<number>>;
};

// contexto criado
export const ClientsDataContext = createContext<ClientsDataContextType>({
  clientsData: null,
  handleSubmit: () => undefined,
  clientsResponseData: 0,
  setClientsResponseData: () => null,
});

// usar o contexto criado
export const useClientsData = () => {
  return useContext(ClientsDataContext);
};

// react func do context
export function ClientsDataContextProvider(props: React.PropsWithChildren) {
  const [clientsData, setClientsData] = useState<ClientsDataInterface[] | null>(null);
  const [clientsResponseData, setClientsResponseData] = useState<number>(0);

  useEffect(() => {
    const fetchClients = () => {
      fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_LINK}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data: ClientsDataInterface[]) => {
          setClientsData(data);
        })
        .catch((error) => console.error(error));
    };

    fetchClients();
    const interval = setInterval(fetchClients, 5000);

    return () => clearInterval(interval);
  }, [clientsResponseData]);

  const handleSubmit = (clientInfos: ClientsSUBMIT, methodSelection: Methods) => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_LINK}`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientInfos),
    })
      .then((response) => {
        setClientsResponseData(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ClientsDataContext.Provider value={{ clientsData, handleSubmit, clientsResponseData, setClientsResponseData }}>
      {props.children}
    </ClientsDataContext.Provider>
  );
}
