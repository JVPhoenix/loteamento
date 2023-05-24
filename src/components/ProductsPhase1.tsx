import { lotesData } from "@/data/lotesData1";
import { photosData } from "@/data/photosData";
import Image from "next/image";
import { useState } from "react";
import Select from "react-select";
import { LeftArrow, RightArrow, SelectDot } from "./Icons";
import { twMerge } from "tailwind-merge";

export default function ProductsPhase1() {
  const [chosen, setChosen] = useState(lotesData[0]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const pickPrice = (price: number, installment = 1) => {
    return (price / installment).toLocaleString("pt-br", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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
    <div className="flex flex-col gap-1 text-gray1 font-medium text-center items-center">
      <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">
        LOTES DISPONIVEIS - 1ª ETAPA
      </h1>
      <div className="relative group select-none">
        <div className="flex max-w-[800px] max-h-[439px]">
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
              "absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5",
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
              "absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5",
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

      <div className="flex flex-col w-[500px] gap-2">
        {/* <Select
          className="text-black"
          options={lotesData}
          defaultValue={lotesData[0]}
          onChange={(e) => {
            setChosen(e);
          }}
        /> */}
        <p>Dimensões: {chosen.tamanho}</p>
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-slate-200 text-xl">Valor A VISTA</h3>
          <span> R$ {pickPrice(chosen.valor)} </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-slate-200 text-xl">Valor A PRAZO</h3>
          <p>Entrada de R$ {pickPrice(chosen.valor, 10)} </p>
          <p>12x de R$ {pickPrice(chosen.valor, 12)} </p>
          <p>24x de R$ {pickPrice(chosen.valor, 24)} </p>
          <p>36x de R$ {pickPrice(chosen.valor, 36)} </p>
          <p>48x de R$ {pickPrice(chosen.valor, 48)}</p>
        </div>
      </div>
      <p className="mt-3">
        *Os valores <strong>parcelados</strong> tem reajuste de
        <strong> 5% ao ano do saldo devedor,</strong> a partir do segundo ano.
      </p>
    </div>
  );
}
