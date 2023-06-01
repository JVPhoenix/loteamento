import Image from "next/image";
import { useState } from "react";
import { LeftArrow, RightArrow, SelectDot } from "./Icons";
import { twMerge } from "tailwind-merge";
import { PhotosDataInterface } from "@/data/photosData";

interface ProductsShowcaseInterface {
  photos: PhotosDataInterface[],
}

export default function ProductsShowcase(props: ProductsShowcaseInterface) {
  const photosData: PhotosDataInterface[] = props.photos
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
      <div className="flex response:max-w-[800px] response:max-h-[439px] max-w-[400px] max-h-[219px]">
        <Image
          width={800}
          height={440}
          style={{ borderRadius: "8px", objectFit: "cover" }}
          src={photosData[photoIndex].url}
          alt="Fotos do mapa e lotes disponíveis"
          priority
        />
      </div>
      <div onClick={prevPhoto}>
        <LeftArrow
          className={twMerge(
            "hidden group-hover:block",
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
            "hidden group-hover:block",
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
