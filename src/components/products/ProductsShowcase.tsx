import Image from "next/image";
import { useState } from "react";
import { LeftArrow, RightArrow, SelectDot } from "../utils/Icons";
import { twMerge } from "tailwind-merge";
import { InnerPhotosInterface, LotesDataInterface, LotesStatus } from "@/types";
import { useLotesData } from "@/context/LotesDataContext";

interface ProductsShowcaseInterface {
  data: LotesDataInterface[];
  showcasePhotos: { [index: number]: InnerPhotosInterface };
  phase: number;
}

export default function ProductsShowcase(props: ProductsShowcaseInterface) {
  const lotesData = useLotesData()
    .lotesData?.filter(
      (value) => value.situation === LotesStatus.Blocked || (value.situation === LotesStatus.Sold && value)
    )
    .filter((status) => status.phase === props.phase && status);

  const photosData = Object.values(props.showcasePhotos);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const prevPhoto = () => {
    const isFirstPhoto = photoIndex === 0;
    const newIndex = isFirstPhoto ? photosData.length - 1 : photoIndex - 1;
    setPhotoIndex(newIndex);
  };

  const nextPhoto = () => {
    const isLastPhoto = photoIndex === photosData.length - 1;
    const newIndex = isLastPhoto ? 0 : photoIndex + 1;
    setPhotoIndex(newIndex);
  };

  const photoSelectDots = (dotIndex: number) => {
    setPhotoIndex(dotIndex);
  };

  return (
    <div className="relative group select-none">
      <div className="flex relative response:max-w-[800px] max-w-[400px] bg-green-500 rounded-xl">
        <Image
          className="z-10 rounded-xl"
          width={3200}
          height={1980}
          style={{ objectFit: "cover" }}
          src={photosData[photoIndex].url}
          alt="Fotos e mapa dos lotes disponíveis"
          priority
          unoptimized
        />
        {photosData[photoIndex] === photosData[0] &&
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
      <div onClick={prevPhoto}>
        <LeftArrow
          className={twMerge(
            "hidden group-hover:block z-10",
            "rounded-full p-2 bg-black/50 cursor-pointer",
            "absolute top-[45%] -translate-x-0 translate-y-[-50%] left-5",
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
            "absolute top-[45%] -translate-x-0 translate-y-[-50%] right-5",
            "hover:scale-125 active:scale-90 ease-in-out duration-200"
          )}
          width={40}
          fill="white"
        />
      </div>
      <div className="flex my-2 justify-center">
        {photosData.map((photo, dotIndex) => (
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
