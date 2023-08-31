import { PhotosDataInterface } from "@/data/photosData";
import { Dispatch, SetStateAction } from "react";

export enum HeaderSelector {
  HomePage = 0,
  Etapa1 = 1,
  Etapa2 = 2,
  Etapa3 = 3,
  Etapa4 = 4,
}

export type PageType = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export interface PageInfos {
  id: number;
  queryName: string | string[] | undefined;
  title: string;
  photosDataBase: PhotosDataInterface[],
};