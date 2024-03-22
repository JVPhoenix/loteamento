import React, { Dispatch, useState } from "react";
import { LotesDataInterface, LotesStatus } from "@/types";
import Select, { createFilter } from "react-select";
import { Button } from "../utils/Button";

interface SelectReservationsProps {
  options: LotesDataInterface[] | undefined;
  loteStatus: LotesStatus | null;
  placeholder?: string;
  onChange: (selection: LotesDataInterface | null) => void;
  setSelectRef: Dispatch<any>
}

export default function AdminReservationsSelect(props: SelectReservationsProps) {
  return (
    <>
    <Select
      ref={(ref) => {
        props.setSelectRef(ref);
      }}
      options={props.options}
      getOptionLabel={(option) =>
        props.loteStatus === LotesStatus.Blocked ? option.label + " - " + option.reservedFor : option.label
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
      onChange={(option: LotesDataInterface | null) => props.onChange(option)}
    />
    {/* <Button onClick={() => clearValue()}>
      test
    </Button> */}
    </>
  );
}
