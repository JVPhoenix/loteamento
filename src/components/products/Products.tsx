import { useLotesData } from "@/context/LotesDataContext";
import ProductsPhases from "./ProductsPhases";
import { FilterSelector, LotesStatus } from "@/types";
import { Box } from "@mui/material";

interface ProductsInterface {
  maps1Ref: React.RefObject<HTMLDivElement>;
  maps2Ref: React.RefObject<HTMLDivElement>;
}

export default function Products(props: ProductsInterface) {
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Free && value);

  return (
    <div className="flex flex-col gap-4 text-gray1 font-medium text-center items-center mb-8">
      <Box ref={props.maps1Ref}>
        {lotesData && (
          <ProductsPhases
            data={lotesData.filter((lote) => lote.phase === FilterSelector.Etapa2 && lote)}
            phase={FilterSelector.Etapa2}
          />
        )}
      </Box>
      <Box ref={props.maps2Ref}>
        {lotesData && (
          <ProductsPhases
            data={lotesData.filter((lote) => lote.phase === FilterSelector.Etapa1 && lote)}
            phase={FilterSelector.Etapa1}
          />
        )}
      </Box>
    </div>
  );
}
