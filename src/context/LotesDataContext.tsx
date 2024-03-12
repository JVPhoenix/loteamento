import { LotesDataInterface } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";

// contexto criado
export const LotesDataContext = createContext<LotesDataInterface[] | null>(null);

// usar o contexto criado
export const useLotesData = () => {
  return useContext(LotesDataContext);
};

// react func do context
export function LotesDataContextProvider(props: React.PropsWithChildren) {
  const [lotesData, setLotesData] = useState<LotesDataInterface[] | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOTES_API_LINK}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: LotesDataInterface[]) => {
        setLotesData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return <LotesDataContext.Provider value={lotesData}>{props.children}</LotesDataContext.Provider>;
}
