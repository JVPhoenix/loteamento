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
  lotesResponseData: number;
  setLotesResponseData: Dispatch<React.SetStateAction<number>>;
};

export const LotesDataContext = createContext<LotesDataContextType>({
  lotesData: null,
  handleSubmit: () => undefined,
  lotesResponseData: 0,
  setLotesResponseData: () => null,
});

// usar o contexto criado
export const useLotesData = () => {
  return useContext(LotesDataContext);
};

// react func do context
export function LotesDataContextProvider(loteInfos: React.PropsWithChildren) {
  const [lotesData, setLotesData] = useState<LotesDataInterface[] | null>(null);
  const [lotesResponseData, setLotesResponseData] = useState<number>(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOTES_API_LINK}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: LotesDataInterface[]) => {
        setLotesData(data);
      })
      .catch((error) => console.error(error));
  }, [lotesResponseData]);

  const handleSubmit = (loteInfos: LotesInfosSUBMIT, methodSelection: Methods) => {
    fetch(`${process.env.NEXT_PUBLIC_LOTES_API_LINK}`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loteInfos),
    })
      .then((response) => {
        setLotesResponseData(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LotesDataContext.Provider value={{ lotesData, handleSubmit, lotesResponseData, setLotesResponseData }}>
      {loteInfos.children}
    </LotesDataContext.Provider>
  );
}
