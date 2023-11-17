import { Dispatch, SetStateAction } from "react";

export enum PageSelector {
  HomePage = "",
  ErrorPage = "Error",
  Etapa1 = "/etapa1",
  Etapa2 = "/etapa2",
  Etapa3 = "/etapa3",
  Etapa4 = "/etapa4",
  ClientSearch = "/cliente",
  AdminLogin = "/login",
  AdminSearch = "/admin/buscar",
  AdminSimulate = "/admin/simular",
}

export enum PlansSelector {
  ContractPrice = 1,
  Debt = 2,
  IsLate = 3,
  MonthsExpired = 4,
  MonthsDebtBalance = 5,
  Entrance = 10,
}

export enum FilterSelector {
  Special = 0,
  Etapa1 = 1,
  Etapa2 = 2,
  Etapa3 = 3,
  Etapa4 = 4,
  Expired = 5,
  Regular = 6,
  PaidOff = 7,
}

export type PageType = {
  page: string;
  setPage: Dispatch<SetStateAction<number>>;
};

export interface PageInfos {
  id: string;
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
  datePaid: string;
  obs?: string;
  standard: boolean;
}

export interface AdminsDataInterface {
  name: string;
  cpf: string;
  password: string;
}

export type AdminsDataContextType = {
  adminsData: AdminsDataInterface[] | null;
  searchAdmin: AdminsDataInterface[] | null;
  adminLogin: { cpf: string; password: string };
  setAdminLogin: Dispatch<SetStateAction<{ cpf: string; password: string }>>;
};
