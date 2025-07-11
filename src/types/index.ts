import { Dispatch, SetStateAction } from "react";

export enum PageSelector {
  HomePage = "/",
  ErrorPage = "Error",
  Etapa1 = "/etapa1",
  Etapa2 = "/etapa2",
  Etapa3 = "/etapa3",
  Etapa4 = "/etapa4",
  Photos = "/fotos",
  ClientSearch = "/cliente", // Remove later
  MyProfile = "/meu-perfil", // New Client Area
  Login = "/api/auth/login",
  Logout = "/api/auth/logout",
  AdminSearch = "/admin/buscar",
  AdminReadjustClient = "/admin/reajuste/reajuste-de-cliente",
  AdminReadjustSimulate = "/admin/reajuste/simular-reajuste",
  AdminShowReservations = "/admin/reservas/ver-reservas",
  AdminEditReservations = "/admin/reservas/editar-reservas",
  AdminPersonalizedQuote = "/admin/orcamentos-personalizados",
  AdminNewClient = "/admin/novo-cliente",
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
  Disabled = 9,
  Showcase = "showcase",
  Photos = "photos",
}

export enum PlanMonths {
  FirstYear = 12,
  SecondYear = 24,
  ThirdYear = 36,
  FourthYear = 48,
  FifthYear = 60,
}

export const ordinalPlansNames = ["Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto"];

export type PageType = {
  page: string;
  setPage: Dispatch<SetStateAction<number>>;
};

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
  reservedDate: string;
}

export enum LotesStatus {
  Free = "livre",
  Blocked = "bloqueado",
  Sold = "vendido",
}

export interface ClientsDataInterface {
  id: string;
  name: string;
  cpf: string;
  birth: string;
  address: string;
  phone: string;
  digitalContract: string;
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
  status: boolean;
}

export interface PhotosDataInterface {
  id: string;
  value: number;
  url: string;
  type: string;
  phase: number;
  width?: number;
  height?: number;
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
  Observation_NEW = "Obs_POST",
  Observation_EDIT = "Obs_PUT",
  Observation_DELETE = "Obs_DELETE",
  Payment_NEW = "Pay_POST",
  Payment_EDIT = "Pay_PUT",
  Payment_DELETE = "Pay_DELETE",
  Client_DELETE = "Client_DELETE",
  Client_ACTIVATE = "Client_ACTIVATE",
}

export enum StatusResponses {
  Loading = 0,
  Success = 200,
  Failure = 400,
}

export enum UserRoles {
  Admins = "Administrador",
  Employee = "Funcionário",
  Sales = "Vendas",
  Users = "Usuário",
}
