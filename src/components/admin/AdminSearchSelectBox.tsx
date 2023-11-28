import React, { useEffect, useRef, useState } from "react";
import { UpArrow } from "../svg/Icons";
import { twMerge } from "tailwind-merge";
import { ClientsDataInterface, FilterSelector, PageSelector, PlansSelector } from "@/types";

interface SelectClientProps {
  clients: ClientsDataInterface[] | null;
  placeholder?: string;
  selectedClient: ClientsDataInterface | null;
  setSelectedClient: (selection: ClientsDataInterface) => void;
  state: FilterSelector | null;
  special?: boolean;
  stage: FilterSelector | null;
  page: PageSelector;
}

export default function AdminSearchSelectBox(props: SelectClientProps) {
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

  const checkExpired = (lastPaid: string, startDate: string, returnType: FilterSelector) => {
    const start = new Date(startDate.split("-").reverse().join("-"));
    const last = new Date(lastPaid.split("-").reverse().join("-"));
    const today = new Date();
    const expireDate = new Date(startDate.split("-").reverse().join("-"));
    const paidParcels = last.getMonth() - start.getMonth() + 12 * (last.getFullYear() - start.getFullYear());

    expireDate.setMonth(
      expireDate.getMonth() + last.getMonth() - start.getMonth() + 12 * (last.getFullYear() - start.getFullYear()) + 1
    ); // set 1 moth later (30 days)
    expireDate.setDate(expireDate.getDate() + 1); // set +1 day (to set the same day every month)

    if (returnType === FilterSelector.Expired || returnType === FilterSelector.Regular) {
      return today < expireDate ? FilterSelector.Regular : FilterSelector.Expired;
    } else if (returnType === FilterSelector.PaidOff) {
      return paidParcels;
    } else {
      return 0;
    }
  };

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
          "max-h-[25vh] top-8 border-4 px-2",
          "bg-white rounded-lg border-blue-500",
          showOptions && "flex"
        )}
      >
        {props.clients
          ?.filter((option) => {
            if (props.page === PageSelector.AdminReadjustClient) {
              return (
                option.standard &&
                option.plan !== 0 &&
                (
                  option.price -
                  (checkExpired(option.lastPaid, option.startDate, FilterSelector.PaidOff) * option.price) / option.plan
                ).toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) !== "0,00" &&
                option.standard
              );
            } else {
              return option;
            }
          })
          .filter((option) => {
            return (
              // NAME FILTER
              (!searchItem ||
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
                  .indexOf(searchItem.replace(/ - /, " ").toLocaleLowerCase()) >= 0) &&
              // SPECIAL FILTER
              (!props.special || option.standard === false) &&
              // STAGE FILTER
              (!props.stage || option.phase === props.stage) &&
              // REGULAR FILTER
              (props.state !== FilterSelector.Regular ||
                checkExpired(option.lastPaid, option.startDate, FilterSelector.Regular) !== FilterSelector.Expired) &&
              // EXPIRED FILTER
              (props.state !== FilterSelector.Expired ||
                (checkExpired(option.lastPaid, option.startDate, FilterSelector.Expired) !== FilterSelector.Regular &&
                  option.plan !== 0 &&
                  (
                    option.price -
                    (checkExpired(option.lastPaid, option.startDate, FilterSelector.PaidOff) * option.price) /
                      option.plan
                  ).toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) !== "0,00")) &&
              // PAIDOFF FILTER
              (props.state !== FilterSelector.PaidOff ||
                ((
                  option.price -
                  (checkExpired(option.lastPaid, option.startDate, FilterSelector.PaidOff) * option.price) / option.plan
                ).toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) === "0,00" &&
                  option.standard) ||
                option.plan === 0)
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
