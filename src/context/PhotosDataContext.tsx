import { PhotosDataInterface } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";

// contexto criado
export const PhotosDataContext = createContext<PhotosDataInterface[] | null>(null);

// usar o contexto criado
export const usePhotosData = () => {
  return useContext(PhotosDataContext);
};

// react func do context
export function PhotosDataContextProvider(props: React.PropsWithChildren) {
  const [photosData, setPhotosData] = useState<PhotosDataInterface[] | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PHOTOS_API_LINK}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: PhotosDataInterface[]) => {
        setPhotosData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return <PhotosDataContext.Provider value={photosData}>{props.children}</PhotosDataContext.Provider>;
}
