import React, { useEffect, useRef, useState } from "react";
import { DownArrow, UpArrow } from "../svg/Icons";
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

  const checkExpired = (paymentList: Array<string>, startDate: string, returnType: FilterSelector) => {
    const today = new Date();
    const start = new Date(startDate.split("-").reverse().join("-"));

    const last = new Date(
      new Date(startDate.split("-").reverse().join("-")).setMonth(
        new Date(startDate.split("-").reverse().join("-")).getMonth() + paymentList.length
      )
    );

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
    >
      <div
        className={twMerge(
          "border-4 border-white bg-white rounded-lg cursor-pointer duration-200",
          showOptions && "border-blue-500"
        )}
      >
        <input
          className="text-base response:text-lg w-full text-center placeholder:text-black"
          value={searchItem != "" ? searchItem : ""}
          placeholder={props.selectedClient ? `${props.selectedClient.name}` : props.placeholder}
          onChange={(e) => setSearchItem(e.target.value)}
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
                  (checkExpired(option.paymentList, option.startDate, FilterSelector.PaidOff) * option.price) /
                    option.plan
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
                checkExpired(option.paymentList, option.startDate, FilterSelector.Regular) !==
                  FilterSelector.Expired) &&
              // EXPIRED FILTER
              (props.state !== FilterSelector.Expired ||
                (checkExpired(option.paymentList, option.startDate, FilterSelector.Expired) !==
                  FilterSelector.Regular &&
                  option.plan !== 0 &&
                  (
                    option.price -
                    (checkExpired(option.paymentList, option.startDate, FilterSelector.PaidOff) * option.price) /
                      option.plan
                  ).toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) !== "0,00")) &&
              // PAIDOFF FILTER
              (props.state !== FilterSelector.PaidOff ||
                ((
                  option.price -
                  (checkExpired(option.paymentList, option.startDate, FilterSelector.PaidOff) * option.price) /
                    option.plan
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
