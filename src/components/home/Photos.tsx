import { usePhotosData } from "@/context/PhotosDataContext";
import { FilterSelector } from "@/types";
import Image from "next/image";
import React from "react";
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function Photos() {
  const photosData = usePhotosData()
    ?.filter((item) => item.type === FilterSelector.Photos && (item.phase === 1 || item.phase === 2))
    .sort((a, b) => a.phase - b.phase);

  return (
    <React.Fragment>
      <h1 className="text-center text-white drop-shadow-titles text-2xl response:text-3xl font-bold pt-4">FOTOS</h1>
      {photosData && (
        <ImageList sx={{ p: 2 }} variant="masonry" cols={3} gap={8}>
          {photosData.map((item) => (
            <ImageListItem key={item.id}>
              <Image
                className="rounded"
                src={item.url}
                alt={item.type}
                width={item.width}
                height={item.width}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.phase + "ª Fase"}
                actionIcon={
                  <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }} aria-label={`info about ${item.phase}ª Fase`}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </React.Fragment>
  );
}
