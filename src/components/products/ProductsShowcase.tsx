import Image from "next/image";
import React, { useRef, useState } from "react";
import { LeftArrow, RightArrow, SelectDot } from "../utils/Icons";
import { twMerge } from "tailwind-merge";
import { FilterSelector, LotesDataInterface, LotesStatus, PhotosDataInterface } from "@/types";
import { useLotesData } from "@/context/LotesDataContext";

interface ProductsShowcaseInterface {
  data: LotesDataInterface[];
  showcasePhotos: PhotosDataInterface[] | undefined;
  phase: FilterSelector;
}

export default function ProductsShowcase(props: ProductsShowcaseInterface) {
  const lotesData = useLotesData()
    .lotesData?.filter(
      (value) => value.situation === LotesStatus.Blocked || (value.situation === LotesStatus.Sold && value)
    )
    .filter((status) => status.phase === props.phase && status);

  // DOTS - SELECT SHOWCASE PHOTO
  const photos = props.showcasePhotos ? props.showcasePhotos : [];
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const prevPhoto = () => {
    const isFirstPhoto = photoIndex === 0;
    const newIndex = isFirstPhoto ? photos.length - 1 : photoIndex - 1;
    setPhotoIndex(newIndex);
  };

  const nextPhoto = () => {
    const isLastPhoto = photoIndex === photos.length - 1;
    const newIndex = isLastPhoto ? 0 : photoIndex + 1;
    setPhotoIndex(newIndex);
  };

  const photoSelectDots = (dotIndex: number) => {
    setPhotoIndex(dotIndex);
  };

  // FEATURE - HOVER ZOOM
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (imgRef.current) {
      const target = imgRef.current;
      const x = (100 * e.nativeEvent.offsetX) / target.offsetWidth;
      const y = (100 * e.nativeEvent.offsetY) / target.offsetHeight;

      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(event.target.value));
  };

  return (
    <div className="relative group select-none overflow-hidden" onMouseLeave={handleMouseLeave}>
      <div
        className="flex relative response:max-w-[800px] max-w-[400px] bg-green-500 rounded-xl"
        ref={imgRef}
        onMouseMove={handleMouseMove}
        style={
          {
            "--zoom": zoom,
            "--x": `${position.x}%`,
            "--y": `${position.y}%`,
            transform: `scale(var(--zoom))`,
            transformOrigin: `var(--x) var(--y)`,
            clipPath: `inset(calc((1 - 1/var(--zoom)) * (var(--y))) calc((1 - 1/var(--zoom)) * (100% - var(--x))) 
              calc((1 - 1/var(--zoom)) * (100% - var(--y))) calc((1 - 1/var(--zoom)) * (var(--x))))`,
            cursor: "crosshair",
          } as React.CSSProperties
        }
      >
        {/* MAP IMAGE */}
        <Image
          className="z-10 rounded-xl"
          width={3200}
          height={1980}
          style={{ objectFit: "cover" }}
          src={photos[photoIndex]?.url}
          alt="Fotos e mapa dos lotes disponíveis"
          priority
          unoptimized
        />
        {/* RESERVED IMAGES */}
        {photos[photoIndex] === photos[0] &&
          lotesData?.map((value) => (
            <Image
              className="z-0 rounded-xl absolute"
              width={3200}
              height={1980}
              style={{ objectFit: "cover" }}
              src={`./${value.phase}/${value.label}.png`}
              alt="Fotos e mapa dos lotes disponíveis"
              unoptimized
              key={value.id}
            />
          ))}
      </div>
      {/* NEXT/PREVIUS DOTS && ZOOM RANGE  */}

      <div
        className={twMerge(
          "flex flex-col items-center justify-between h-28 response:h-40 w-14 z-10",
          "text-white cursor-pointer bg-black/60",
          "hover:scale-110 ease-in-out duration-200 rounded-2xl",
          "absolute top-[2%] response:top-[5%] right-[2%]"
        )}
      >
        <p>Zoom</p>
        <input
          type="range"
          step={0.5}
          className="appearance-none w-16 response:w-24 bg-gray-200 -rotate-90 rounded-lg overflow-hidden outline-none"
          min={1}
          max={3}
          value={zoom}
          onChange={handleRangeChange}
        />
        <p>{zoom}x</p>
      </div>

      <div onClick={prevPhoto}>
        <LeftArrow
          className={twMerge(
            "hidden group-hover:block z-10",
            "rounded-full p-2 bg-black/50 cursor-pointer",
            "absolute top-[45%] left-[5%]",
            "hover:scale-125 active:scale-90 ease-in-out duration-200"
          )}
          width={40}
          fill="white"
        />
      </div>
      <div onClick={nextPhoto}>
        <RightArrow
          className={twMerge(
            "hidden group-hover:block z-10",
            "rounded-full p-2 bg-black/50 cursor-pointer",
            "absolute top-[45%] right-[5%]",
            "hover:scale-125 active:scale-90 ease-in-out duration-200"
          )}
          width={40}
          fill="white"
        />
      </div>
      <div className="flex my-2 justify-center">
        {photos.map((photo, dotIndex) => (
          <div key={dotIndex} onClick={() => photoSelectDots(dotIndex)}>
            <SelectDot
              className="m-[4px] hover:scale-110 active:scale-90 ease-in-out duration-200 cursor-pointer"
              width={30}
              fill={"white"}
              stroke={dotIndex === photoIndex ? "black" : "white"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
