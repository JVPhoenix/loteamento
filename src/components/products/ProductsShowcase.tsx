import React, { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight, Visibility, VisibilityOff } from "@mui/icons-material";
import { useLotesData } from "@/context/LotesDataContext";
import { FilterSelector, LotesDataInterface, PhotosDataInterface } from "@/types";
import Image from "next/image";
import Phase1SVG from "../utils/Phase1_Reserves";
import Phase2SVG from "../utils/Phase2_Reserves";
import { twMerge } from "tailwind-merge";

interface ProductsShowcaseInterface {
  showcasePhotos: PhotosDataInterface[] | undefined;
  selectedItems: LotesDataInterface[] | null;
  phase: FilterSelector;
  onSelectLot?: (lot: LotesDataInterface) => void;
}

export default function ProductsShowcase({
  showcasePhotos,
  phase,
  selectedItems,
  onSelectLot,
}: ProductsShowcaseInterface) {
  const lotesData = useLotesData().lotesData?.filter((status) => status.phase === phase && status);
  const images = showcasePhotos ? showcasePhotos : [];

  const [visibility, setVisibility] = useState<boolean>(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative max-w-3xl mx-2 overflow-hidden">
      {/* IMAGES COMPONENT */}
      <div
        className={twMerge(
          "flex transition-transform duration-500 ease-in-out bg-green-500 rounded-xl",
          phase === FilterSelector.Etapa1 && "aspect-[3160/1733]"
        )}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((data, index) => (
          <Image
            className="z-10 rounded-xl flex-shrink-0 w-full object-cover"
            key={index}
            src={data.url}
            width={3200}
            height={1980}
            alt={`Slide ${index}`}
            priority
            unoptimized
          />
        ))}
        {/* RESERVED IMAGES */}
        <div
          className={twMerge(
            "absolute flex items-center justify-center inset-0",
            phase === FilterSelector.Etapa1 && "aspect-[3160/1733]"
          )}
        >
          {phase === FilterSelector.Etapa1 ? (
            <>
              <Phase1SVG lotesData={lotesData} selectedItems={selectedItems} />
              <Phase1SVG
                lotesData={lotesData}
                selectedItems={selectedItems}
                isClickable={true}
                onSelectLot={onSelectLot}
              />
            </>
          ) : FilterSelector.Etapa2 ? (
            <>
              <Phase2SVG lotesData={lotesData} selectedItems={selectedItems} />
              <Phase2SVG
                lotesData={lotesData}
                selectedItems={selectedItems}
                isClickable={true}
                onSelectLot={onSelectLot}
              />
            </>
          ) : null}
        </div>
      </div>

      {/* Next/Prev Buttons - Hide Button */}
      <Tooltip title={visibility ? "Ocultar setas de navegação" : "Exibir setas de navegação"}>
        <Button
          onClick={() => setVisibility(!visibility)}
          disabled={images.length <= 1}
          className={twMerge(
            "!absolute !top-7 !right-2 !transform !-translate-y-1/2 !z-10 !rounded-full",
            "!bg-black/30 hover:!bg-black/60 !transition-colors !duration-200",
            "!text-white md:!text-3xl !text-lg !min-w-1"
          )}
        >
          {visibility ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
        </Button>
      </Tooltip>

      <Button
        onClick={prevSlide}
        disabled={images.length <= 1}
        className={twMerge(
          "!absolute !top-1/2 !left-2 !transform !-translate-y-1/2 !z-10 !rounded-full",
          "!bg-black/30 hover:!bg-black/60 !transition-colors !duration-200",
          "!text-white md:!text-3xl !text-lg !min-w-1",
          visibility ? "" : "!hidden"
        )}
      >
        <KeyboardArrowLeft fontSize="inherit" />
      </Button>

      <Button
        onClick={nextSlide}
        disabled={images.length <= 1}
        className={twMerge(
          "!absolute !top-1/2 !right-2 !transform !-translate-y-1/2 !z-10 !rounded-full",
          "!bg-black/30 hover:!bg-black/60 !transition-colors !duration-200",
          "!text-white md:!text-3xl !text-lg !min-w-1",
          visibility ? "" : "!hidden"
        )}
      >
        <KeyboardArrowRight fontSize="inherit" />
      </Button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2 mb-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={twMerge(
              "w-5 h-5 rounded-full cursor-pointer transition-all",
              index === currentIndex
                ? "bg-blue-600 hover:brightness-125 scale-125"
                : "bg-gray-400 hover:bg-blue-600 active:scale-90 hover:scale-110 "
            )}
          />
        ))}
      </div>
    </div>
  );
}
