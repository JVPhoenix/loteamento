import { Dispatch, SetStateAction } from "react";

export enum PageSelector {
  HomePage = "/",
  ErrorPage = "Error",
  Etapa1 = "/etapa1",
  Etapa2 = "/etapa2",
  Etapa3 = "/etapa3",
  Etapa4 = "/etapa4",
  ClientSearch = "/cliente",
  AdminLogin = "/login",
  AdminSearch = "/admin/buscar",
  AdminReadjustClient = "/admin/reajustecliente",
  AdminReadjustSimulate = "/admin/reajustesimular",
  AdminPersonalizedQuote = "/admin/orcamentos-personalizados",
  AdminShowReservations = "/admin/reservas/ver-reservas",
  AdminEditReservations = "/admin/reservas/editar-reservas",
}

export enum PlansSelector {
  ContractPrice = 1,
  Debt = 2,
  IsLate = 3,
  MonthsExpired = 4,
  Entrance = 10,
}

export enum FilterSelector {
  Etapa1 = 1,
  Etapa2 = 2,
  Etapa3 = 3,
  Etapa4 = 4,
  Special = 5,
  Expired = 6,
  Regular = 7,
  PaidOff = 8,
}

export enum PlanMonths {
  FirstYear = 12,
  SecondYear = 24,
  ThirdYear = 36,
  FourthYear = 48,
  FifthYear = 60,
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

export interface LotesDataInterface {
  id: string;
  value: number;
  label: string;
  price: number;
  size: string;
  phase: number;
  situation: string;
  reservedBy: string;
  reservedFor: string;
  reservedForContact: string;
  reservedDate: Date;
}

export enum LotesStatus {
  Free = "livre",
  Blocked = "bloqueado",
}

export interface InnerPhotosInterface {
  url: string;
  width?: number;
  height?: number;
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
  paymentList: string[];
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

export enum Methods {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  DeleteSucess = "Deletado com sucesso",
}

export enum StatusResponses {
  Sucess = 200,
  Failure = 400,
}
