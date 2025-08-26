import { LotesDataInterface, LotesStatus } from "@/types";
import { phase1Paths } from "@/types/svg";
import { Tooltip } from "@mui/material";
import { twMerge } from "tailwind-merge";

interface Phase1SVGInterface {
  lotesData: LotesDataInterface[] | undefined;
  selectedItems?: LotesDataInterface[] | null;
  isClickable?: boolean;
  onSelectLot?: (lot: LotesDataInterface) => void;
}

export default function Phase1SVG({ lotesData, selectedItems, isClickable = false, onSelectLot }: Phase1SVGInterface) {
  const checkAvailable = (svgId: string) => {
    const lote = lotesData?.find((lote) => lote.label.replace(/\s+/g, "_") === svgId);
    return lote?.situation === LotesStatus.Free ? lote.label : "";
  };

  const getColor = (svgId: string): string => {
    const lote = lotesData?.find((lote) => lote.label.replace(/\s+/g, "_") === svgId);
    if (!isClickable && (lote?.situation === LotesStatus.Sold || lote?.situation === LotesStatus.Blocked)) {
      return "fill-[#005cdbff] cursor-default";
    } else if (!isClickable && selectedItems?.some((item) => item.label.replace(/\s+/g, "_") === svgId)) {
      return "fill-[#ff5f5f]";
    } else if (
      isClickable &&
      lote?.situation === LotesStatus.Free &&
      !selectedItems?.some((item) => item.label.replace(/\s+/g, "_") === svgId)
    ) {
      return "fill-transparent cursor-pointer hover:fill-emerald-700 opacity-60";
    } else if (
      isClickable &&
      lote?.situation === LotesStatus.Free &&
      selectedItems?.some((item) => item.label.replace(/\s+/g, "_") === svgId)
    ) {
      return "fill-transparent cursor-pointer hover:fill-red-700 opacity-60";
    } else {
      return "fill-transparent cursor-default";
    }
  };

  const handleClick = (svgId: string) => {
    const lote = lotesData?.find((lote) => lote.label.replace(/\s+/g, "_") === svgId);

    if (!isClickable || !onSelectLot || lote?.situation === LotesStatus.Sold || lote?.situation === LotesStatus.Blocked)
      return;

    if (lote) onSelectLot(lote);
  };

  return (
    <svg
      version="1.1"
      id="Phase1SVG"
      viewBox="0 0 3160 1733"
      className={twMerge("z-0 rounded-xl absolute", isClickable && "z-20 select-none")}
    >
      {phase1Paths.map(({ id, d }) => (
        <Tooltip key={id} title={checkAvailable(id)}>
          <path
            id={id}
            d={d}
            className={twMerge("transition-all", getColor(id))}
            onClick={(e) => handleClick(e.currentTarget.id)}
          />
        </Tooltip>
      ))}
    </svg>
  );
}
