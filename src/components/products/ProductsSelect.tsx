import React from "react";
import { LotesDataInterface, PageSelector } from "@/types";
import Select, { MultiValue, createFilter } from "react-select";

interface SelectProps {
  options: LotesDataInterface[] | undefined;
  page: PageSelector;
  placeholder?: string;
  onChange: (selection: MultiValue<LotesDataInterface> | null) => void;
}

export default function ProductsSelect(props: SelectProps) {
  return (
    <Select
      options={props.options}
      getOptionLabel={(option) =>
        props.page === PageSelector.AdminReservations
          ? option.label + " - " + option.reservedFor
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
            scale: window.innerWidth <= 1080 ? "105%" : "110%",
          },
          scale: window.innerWidth <= 1080 ? (state.isFocused ? "105%" : "100%") : state.isFocused ? "110%" : "100%",
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
            marginLeft: window.innerWidth <= 1080 ? 0 : 2,
            marginRight: window.innerWidth <= 1080 ? 0 : 2,
            fontSize: window.innerWidth <= 1080 ? 16 : 18,
          };
        },
      }}
      placeholder={props.placeholder}
      onChange={(option: MultiValue<LotesDataInterface> | null) => props.onChange(option)}
      isMulti
    />
  );
}
