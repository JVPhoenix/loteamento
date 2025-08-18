import React from "react";
import { LotesDataInterface, PageSelector, FilterSelector } from "@/types";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";

interface SelectProps {
  allOptions: LotesDataInterface[] | undefined;
  stage?: FilterSelector | null;
  page: PageSelector;
  placeholder?: string;
  selectedItems: LotesDataInterface[] | null;
  onChange: (newSelection: LotesDataInterface[]) => void;
}

export default function ProductsSelect(props: SelectProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const ids = event.target.value as string[];
    const newSelectedData = props.allOptions?.filter((item) => ids.includes(item.id)) || [];
    props.onChange(newSelectedData);
  };

  const visibleOptions = props.stage
    ? props.allOptions?.filter((item) => item.phase === props.stage)
    : props.allOptions;

  const ITEM_HEIGHT = 70;
  const ITEM_PADDING_TOP = 50;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl
      className="max-w-[380px] response:max-w-[500px] w-full select-none z-10"
      sx={{
        "&:hover .MuiOutlinedInput-notchedOutline, &:hover .MuiInputLabel-outlined, &:hover .MuiSelect-icon": {
          borderColor: "highlight",
          color: "highlight",
          transition: "all 0.3s",
        },
        "& .MuiInputLabel-outlined, & .MuiSelect-root, & .MuiSelect-icon": {
          color: "white",
          marginX: "8px",
        },
        "& .MuiInputLabel-shrink": {
          paddingY: "0px",
          color: "highlight",
        },
        "& .MuiBox-root": {
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        },
      }}
    >
      <InputLabel sx={{ paddingY: "5px" }}>{props.placeholder}</InputLabel>
      <Select
        multiple
        value={props.selectedItems?.map((item) => item.id) || []}
        onChange={handleChange}
        sx={{
          minHeight: "65px",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "highlight" },
          "&.Mui-focused .MuiSelect-icon": { color: "highlight" },
        }}
        input={<OutlinedInput label={props.placeholder} />}
        renderValue={() => (
          <Box>
            {props.selectedItems?.map((item) => {
              const isVisible = !props.stage || item.phase === props.stage;
              const chip = (
                <Chip
                  key={item.id}
                  label={item.label}
                  color={isVisible ? "primary" : "default"}
                  variant={isVisible ? "filled" : "outlined"}
                  sx={{ opacity: isVisible ? 1 : 0.5 }}
                />
              );
              return isVisible ? (
                chip
              ) : (
                <Tooltip key={item.id} title="Selecionado, mas não está na fase atual">
                  {chip}
                </Tooltip>
              );
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {visibleOptions?.sort((a, b) => a.value - b.value).map((value) => (
          <MenuItem
            key={value.id}
            value={value.id}
            sx={{
              "&:hover": { backgroundColor: "highlight", color: "white" },
              "&.Mui-selected": { backgroundColor: "green", color: "white" },
              "&.Mui-selected:hover": { backgroundColor: "#b4b4b4", color: "black" },
            }}
          >
            {props.page === PageSelector.AdminShowReservations
              ? value.label + " - " + value.reservedFor
              : props.page === PageSelector.AdminReadjustSimulate || props.page === PageSelector.AdminPersonalizedQuote
              ? value.label + " - Fase " + value.phase
              : value.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
