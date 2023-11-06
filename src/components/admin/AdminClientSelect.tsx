import { twMerge } from "tailwind-merge";
import { FilterSelector } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";

interface AdminClientSelectInterface {
  state: FilterSelector | null;
  handleState: (newState: FilterSelector) => void;
  checkSpecial: boolean;
  setCheckSpecial: Dispatch<SetStateAction<boolean>>;
  stage: FilterSelector | null;
  handleStage: (newStage: FilterSelector) => void;
}

export default function AdminClientSelect(props: AdminClientSelectInterface) {
  return (
    <>
      <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold select-none mb-2">
        SELECIONE UM CLIENTE
      </h1>
      <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none mb-2">
        Filtros:
      </h1>
      <div className="flex flex-col gap-1 items-center response:flex-row response:gap-8">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-white text-xl response:text-2xl font-bold select-none">Situação</h1>
          <div className="flex gap-3">
            <Button
              className={twMerge(
                props.state === FilterSelector.Expired &&
                  "border-yellow1 bg-yellow1 text-black1 hover:text-black1 font-bold hover:shadow-white shadow-md"
              )}
              onClick={() => props.handleState(FilterSelector.Expired)}
            >
              <h1> Atrasado </h1>
            </Button>
            <Button
              className={twMerge(
                props.state === FilterSelector.Regular &&
                  "border-yellow1 bg-yellow1 text-black1 hover:text-black1 font-bold hover:shadow-white shadow-md"
              )}
              onClick={() => props.handleState(FilterSelector.Regular)}
            >
              <h1> Regular </h1>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-white text-xl response:text-2xl font-bold select-none">Tipo</h1>
          <div className="flex gap-3">
            <Button
              className={twMerge(
                props.checkSpecial &&
                  "border-yellow1 bg-yellow1 text-black1 hover:text-black1 font-bold hover:shadow-white shadow-md"
              )}
              onClick={() => props.setCheckSpecial((prevstate) => !prevstate)}
            >
              <h1> Especial </h1>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-white text-xl response:text-2xl font-bold select-none mb-2">Etapa</h1>
          <div className="flex gap-3">
            <Button
              className={twMerge(
                props.stage === FilterSelector.Etapa1 &&
                  "border-yellow1 bg-yellow1 text-black1 hover:text-black1 font-bold hover:shadow-white shadow-md"
              )}
              onClick={() => props.handleStage(FilterSelector.Etapa1)}
            >
              <h1> 1ª Etapa </h1>
            </Button>
            <Button
              className={twMerge(
                props.stage === FilterSelector.Etapa2 &&
                  "border-yellow1 bg-yellow1 text-black1 hover:text-black1 font-bold hover:shadow-white shadow-md"
              )}
              onClick={() => props.handleStage(FilterSelector.Etapa2)}
            >
              <h1> 2ª Etapa </h1>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
