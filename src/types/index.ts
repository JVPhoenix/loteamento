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
