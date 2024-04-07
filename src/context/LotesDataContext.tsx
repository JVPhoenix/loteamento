import { LotesDataInterface, Methods } from "@/types";
import React, { createContext, useContext, useState, useEffect, Dispatch } from "react";

// INTERFACE FOR SUBMITS
interface LotesInfosSUBMIT {
  id: string;
  value?: number;
  label?: string;
  price?: number;
  size?: string;
  phase?: number;
  situation?: string;
  reservedBy?: string | null;
  reservedFor?: string;
  reservedForContact?: string | null;
  reservedDate?: Date;
}

// contexto criado
type LotesDataContextType = {
  lotesData: LotesDataInterface[] | null;
  handleSubmit: (infos: LotesInfosSUBMIT, methodSelection: Methods) => void;
  responseData: number;
  setResponseData: Dispatch<React.SetStateAction<number>>;
};

export const LotesDataContext = createContext<LotesDataContextType>({
  lotesData: null,
  handleSubmit: () => undefined,
  responseData: 0,
  setResponseData: () => null,
});

// usar o contexto criado
export const useLotesData = () => {
  return useContext(LotesDataContext);
};

// react func do context
export function LotesDataContextProvider(loteInfos: React.PropsWithChildren) {
  const [lotesData, setLotesData] = useState<LotesDataInterface[] | null>(null);
  const [responseData, setResponseData] = useState<number>(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOTES_API_LINK}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: LotesDataInterface[]) => {
        setLotesData(data);
      })
      .catch((error) => console.error(error));
  }, [responseData]);

  const handleSubmit = (loteInfos: LotesInfosSUBMIT, methodSelection: Methods) => {
    fetch(`${process.env.NEXT_PUBLIC_LOTES_API_LINK}`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body:
        methodSelection === Methods.DELETE
          ? JSON.stringify(loteInfos)
          : methodSelection === Methods.PUT
          ? JSON.stringify(loteInfos)
          : null,
    })
      .then((response) => {
        setResponseData(response.status);
      })
      .catch((error) => {
        console.log(error);
        setResponseData(error);
      });
  };

  return (
    <LotesDataContext.Provider value={{ lotesData, handleSubmit, responseData, setResponseData }}>
      {loteInfos.children}
    </LotesDataContext.Provider>
  );
}
