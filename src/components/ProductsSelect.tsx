import { LotesDataInterface } from "@/data/lotesData1";
import { useEffect, useRef, useState } from "react";
import { UpArrow } from "./Icons";
import { twMerge } from "tailwind-merge";

interface SelectProps {
  options: LotesDataInterface[];
  placeholder?: string;
  selectedItem: LotesDataInterface | null;
  onChange: (selection: LotesDataInterface) => void;
}

export default function ProductsSelect(props: SelectProps) {
  const [showOptions, setShowOptions] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const escFunction = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowOptions(false);
    }
  };
  const clickOutside = (event: any) => {
    if (showOptions && !divRef.current?.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("click", clickOutside);
    };
  }, [showOptions]);

  return (
    <div
      className={twMerge(
        "flex flex-col relative text-black w-[380px] response:w-[500px] select-none z-10",
        "ease-in-out duration-200 hover:scale-105",
        showOptions && "scale-105"
      )}
      onClick={() => setShowOptions((prevShowOptions) => !prevShowOptions)}
      ref={divRef}
    >
      <div
        className={twMerge(
          "border-4 border-white bg-white rounded-lg cursor-pointer duration-200",
          showOptions && "border-blue-500"
        )}
      >
        <h3 className="text-base response:text-lg">
          {props.selectedItem ? props.selectedItem.label : props.placeholder}
        </h3>
        <UpArrow className="flex absolute right-5 top-2" width={20} fill="black" />
      </div>

      <div
        className={twMerge(
          "hidden flex-col absolute w-full max-h-[260px] overflow-y-scroll overflow-overlay top-8 border-4",
          "bg-white rounded-lg border-blue-500",
          showOptions && "flex"
        )}
      >
        {props.options.map((option) => (
          <div
            onClick={() => {
              props.onChange(option);
            }}
            key={option.value}
            className={twMerge(
              "hover:bg-gray1 cursor-pointer py-1",
              option.value === props.selectedItem?.value && "bg-blue-500"
            )}
          >
            <p>{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
