import { Dispatch, SetStateAction } from "react";

export enum PageSelector {
  HomePage = 0,
  Etapa1 = 1,
  Etapa2 = 2,
  Etapa3 = 3,
  Etapa4 = 4,
  Client = 5,
}

export enum PlansSelector {
  ContractPrice = 1,
  Debt = 2,
  Entrance = 10,
}

export type PageType = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export type ClientsDataContextType = {
  clientsData: ClientsDataInterface[] | null;
};

export interface PageInfos {
  id: number;
  index: number;
  queryName: string | undefined;
  title: string;
}

export interface InnerLotesInterface {
  value: number;
  label: string;
  price: number;
  size: string;
}
export interface InnerPhotosInterface {
  url: string;
  width?: number;
  height?: number;
}

export interface LotesDataInterface {
  [index: number]: InnerLotesInterface[];
}

export interface PhotosDataInterface {
  showcase: {
    [index: number]: {
      [index: number]: InnerPhotosInterface;
    };
  };
  photos: {
    [index: number]: {
      [index: number]: InnerPhotosInterface;
    };
  };
}

export interface ClientsDataInterface {
  name: string;
  cpf: string;
  birth: string;
  adress: string;
  phone: string;
  contractNumber: string;
  phase: number;
  lote: string;
  dimension: string;
  price: number;
  entrance?: number;
  plan: number;
  startDate: string;
  lastPaid: string;
  obs?: string;
  standard: boolean;
}
