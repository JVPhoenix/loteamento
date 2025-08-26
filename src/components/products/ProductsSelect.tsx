import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { FilterSelector, LotesDataInterface, PageSelector } from "@/types";

interface SelectProps {
  allOptions: LotesDataInterface[] | undefined;
  stage?: FilterSelector | null;
  page: PageSelector;
  placeholder?: string;
  selectedItems: LotesDataInterface[] | null;
  onChange: (newSelection: LotesDataInterface[]) => void;
}

export default function ProductsSelect(props: SelectProps) {
  const visibleOptions = props.stage
    ? props.allOptions?.filter((item) => item.phase === props.stage)
    : props.allOptions;

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      clearOnBlur={false}
      clearText="Limpar"
      closeText="Fechar"
      noOptionsText="Nenhum resultado encontrado"
      loadingText="Carregando..."
      options={visibleOptions?.sort((a, b) => a.value - b.value) || []}
      value={props.selectedItems || []}
      onChange={(_, newValue) => props.onChange(newValue)}
      getOptionLabel={(option) =>
        props.page === PageSelector.AdminShowReservations
          ? option.label + " - " + option.reservedFor
          : props.page === PageSelector.AdminReadjustSimulate || props.page === PageSelector.AdminPersonalizedQuote
          ? option.label + " - Fase " + option.phase
          : option.label
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.placeholder}
          sx={{
            "& .MuiInputLabel-root, & .MuiOutlinedInput-root fieldset, & .MuiSvgIcon-root": {
              color: "white",
              transition: "all 0.3s ease",
            },
            "& .MuiIconButton-root": {
              "&:hover": { bgcolor: "white" },
            },
            "&:hover .MuiInputLabel-root, &:hover .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
              color: "highlight",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiAutocomplete-endAdornment .MuiSvgIcon-root, & .MuiInputLabel-root.Mui-focused":
              {
                color: "highlight",
              },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "highlight" },
              "&.Mui-focused fieldset": { borderColor: "highlight" },
              "& input": { color: "white" },
            },
          }}
        />
      )}
      slotProps={{
        chip: {
          sx: {
            backgroundColor: "highlight",
            color: "white",
            "& .MuiChip-deleteIcon": {
              color: "#adcced",
              "&:hover": { color: "white" },
            },
          },
        },
        popper: {
          sx: {
            "& .MuiAutocomplete-noOptions": {
              color: "white",
            },
          },
        },
        listbox: {
          sx: {
            "& .MuiAutocomplete-option": {
              transition: "all 0.2s ease",
            },
            "& .MuiAutocomplete-option:hover, & .MuiAutocomplete-option.Mui-focused": {
              backgroundColor: "highlight",
              color: "white",
            },
            "& .MuiAutocomplete-option.Mui-selected, & .MuiAutocomplete-option[aria-selected='true']": {
              backgroundColor: "#ff5f5f",
              color: "white",
            },
            "& .MuiAutocomplete-option.Mui-selected:hover, & .MuiAutocomplete-option[aria-selected='true']:hover": {
              backgroundColor: "#e94a4a",
            },
          },
        },
        paper: {
          sx: {
            backgroundColor: "#2b2b2b",
            border: "2px solid highlight",
            color: "white",
          },
        },
      }}
      className="max-w-[380px] response:max-w-[500px] w-full select-none z-10 px-2"
    />
  );
}
