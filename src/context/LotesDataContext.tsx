import { LotesDataInterface, Methods } from "@/types";
import React, { createContext, useContext, useState, useEffect, Dispatch } from "react";

// contexto criado
type LotesDataContextType = {
  lotesData: LotesDataInterface[] | null;
  handleSubmit: (infos: LotesDataInterface, methodSelection: Methods) => void;
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
export function LotesDataContextProvider(props: React.PropsWithChildren) {
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

  const handleSubmit = (infos: LotesDataInterface, methodSelection: Methods) => {
    fetch(`${process.env.NEXT_PUBLIC_LOTES_API_LINK}`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infos),
    })
      .then((response) => {
        setResponseData(response.status);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);

        setResponseData(error);
      });
  };

  return (
    <LotesDataContext.Provider value={{ lotesData, handleSubmit, responseData, setResponseData }}>
      {props.children}
    </LotesDataContext.Provider>
  );
}
