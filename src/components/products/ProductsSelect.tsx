import React, { useEffect, useRef, useState } from "react";
import { DownArrow, UpArrow } from "../svg/Icons";
import { twMerge } from "tailwind-merge";
import { LotesDataInterface, LotesStatus } from "@/types";

interface SelectProps {
  options: LotesDataInterface[] | undefined | null;
  placeholder?: string;
  selectedItem: LotesDataInterface | null;
  onChange: (selection: LotesDataInterface) => void;
}

export default function ProductsSelect(props: SelectProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const selectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkClickOutside = (event: MouseEvent) => {
      if (showOptions && selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      } else {
        return;
      }
    };

    const checkEscOption = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", checkClickOutside);
    document.addEventListener("keydown", checkEscOption);

    return () => {
      document.removeEventListener("click", checkClickOutside);
      document.removeEventListener("keydown", checkEscOption);
    };
  }, [showOptions]);

  return (
    <div
      className={twMerge(
        "flex flex-col relative text-black w-[380px] response:w-[500px] select-none",
        "ease-in-out duration-200 hover:scale-105 z-10",
        showOptions && "scale-105"
      )}
    >
      <div
        className={twMerge(
          "border-4 border-white bg-white rounded-lg cursor-pointer duration-200",
          showOptions && "border-blue-500"
        )}
      >
        <input
          className="text-base response:text-lg w-full text-center placeholder:text-black z-0"
          value={searchItem != "" ? searchItem : ""}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder={props.selectedItem ? props.selectedItem.label : props.placeholder}
          onSelect={() => setShowOptions(true)}
          ref={selectRef}
        />
        {showOptions ? (
          <UpArrow className="flex absolute right-5 top-2" width={20} />
        ) : (
          <DownArrow className="flex absolute right-5 top-2" width={20} />
        )}
      </div>

      <div
        className={twMerge(
          "hidden flex-col absolute w-full max-h-[260px] overflow-y-scroll overflow-overlay top-8 border-4",
          "bg-white rounded-lg border-blue-500",
          showOptions && "flex"
        )}
      >
        {props.options
          ?.filter((option) => {
            if (option.label.toLocaleLowerCase().indexOf(searchItem.toLocaleLowerCase()) >= 0) {
              return option;
            } else if (searchItem === "") {
              return option;
            }
          })
          .map((option) => (
            <div
              onClick={() => {
                props.onChange(option);
                setSearchItem("");
              }}
              key={option.value + option.price}
              className={twMerge(
                "hover:bg-gray1 cursor-pointer py-1 text-center",
                option.value === props.selectedItem?.value && "bg-blue-500"
              )}
            >
              <p>
                {option.status.situation === LotesStatus.Free
                  ? option.label
                  : option.label +
                    " - " +
                    (option.status.client === undefined ? "Não Informado" : option.status.client)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
