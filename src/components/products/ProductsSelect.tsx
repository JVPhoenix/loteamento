import React, { useEffect, useRef, useState } from "react";
import { UpArrow } from "../svg/Icons";
import { twMerge } from "tailwind-merge";
import { InnerLotesInterface, LotesStatus } from "@/types";

interface SelectProps {
  options: InnerLotesInterface[];
  placeholder?: string;
  selectedItem: InnerLotesInterface | null;
  onChange: (selection: InnerLotesInterface) => void;
}

export default function ProductsSelect(props: SelectProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = selectRef.current;
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowOptions(false);
      }
    });
    document.addEventListener("click", ({ target }: MouseEvent): void => {
      if (!ref?.contains(target as Node)) {
        setShowOptions(false);
      }
    });

    return () => {
      document.removeEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setShowOptions(false);
        }
      });
      document.removeEventListener("click", ({ target }: MouseEvent): void => {
        if (!ref?.contains(target as Node)) {
          setShowOptions(false);
        }
      });
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
      ref={selectRef}
    >
      <div
        className={twMerge(
          "border-4 border-white bg-white rounded-lg cursor-pointer duration-200",
          showOptions && "border-blue-500"
        )}
      >
        <input
          className="text-base response:text-lg w-full text-center placeholder:text-black"
          id="searchInput"
          value={searchItem != "" ? searchItem : ""}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder={props.selectedItem ? props.selectedItem.label : props.placeholder}
        />
        <UpArrow className="flex absolute right-5 top-2" width={20} fill="black" />
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
              key={option.value}
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
