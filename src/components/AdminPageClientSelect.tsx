import React, { useEffect, useRef, useState } from "react";
import { UpArrow } from "./Icons";
import { twMerge } from "tailwind-merge";
import { ClientsDataInterface } from "@/types";

interface SelectClientProps {
  clients: ClientsDataInterface[] | null;
  placeholder?: string;
  selectedClient: ClientsDataInterface | null;
  setSelectedClient: (selection: ClientsDataInterface) => void;
}

export default function AdminPageClientSelect(props: SelectClientProps) {
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
          placeholder={props.selectedClient ? `${props.selectedClient.name}` : props.placeholder}
        />
        <UpArrow className="flex absolute right-5 top-2" width={20} fill="black" />
      </div>

      <div
        className={twMerge(
          "hidden flex-col absolute w-full overflow-y-scroll overflow-overlay",
          "max-h-[30vh] top-8 border-4 px-2",
          "bg-white rounded-lg border-blue-500",
          showOptions && "flex"
        )}
      >
        {props.clients
          ?.filter((option) => {
            return (
              !searchItem ||
              option.name
                .toLocaleLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .indexOf(
                  searchItem
                    .toLocaleLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                ) >= 0 ||
              option.lote
                .replace(/ - /, " ")
                .toLocaleLowerCase()
                .indexOf(searchItem.replace(/ - /, " ").toLocaleLowerCase()) >= 0
            );
          })
          .map((option) => (
            <div
              onClick={() => {
                props.setSelectedClient(option);
                setSearchItem("");
              }}
              key={option.contractNumber}
              className={twMerge(
                "hover:bg-gray1 cursor-pointer px-2 py-1",
                option.cpf === props.selectedClient?.cpf && "bg-blue-500"
              )}
            >
              <p>{option.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
