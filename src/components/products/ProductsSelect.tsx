import React from "react";
import { LotesDataInterface, PageSelector } from "@/types";
import Select, { createFilter } from "react-select";

interface SelectProps {
  options: LotesDataInterface[] | undefined;
  page: PageSelector;
  placeholder?: string;
  onChange: (selection: LotesDataInterface | null) => void;
}

export default function ProductsSelect(props: SelectProps) {
  return (
    <Select
      options={props.options}
      getOptionLabel={(option) =>
        props.page === PageSelector.AdminReservations
          ? option.label + " - " + option.status.client
          : props.page === PageSelector.AdminReadjustSimulate || props.page === PageSelector.AdminPersonalizedQuote
          ? option.label + " - Fase " + option.phase
          : option.label
      }
      filterOption={createFilter({ ignoreCase: true, ignoreAccents: true, trim: true })}
      className={"w-[380px] response:w-[500px] select-none z-10"}
      styles={{
        control: (controlStyles, state) => ({
          ...controlStyles,
          color: "black",
          textAlign: "center",
          display: "flex",
          ":hover": {
            scale: "110%",
          },
          scale: state.isFocused ? "110%" : "100%",
        }),
        option: (optionStyles) => ({
          ...optionStyles,
          color: "black",
          textAlign: "center",
        }),
        placeholder: (placeholderStyles) => {
          return {
            ...placeholderStyles,
            color: "#00000",
          };
        },
      }}
      placeholder={props.placeholder}
      onChange={(option: LotesDataInterface | null) => props.onChange(option)}
    />
  );
}
