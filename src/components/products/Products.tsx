import { useLotesData } from "@/context/LotesDataContext";
import ProductsPhases from "./ProductsPhases";
import { FilterSelector, LotesStatus } from "@/types";

export default function Products() {
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Free && value);

  return (
    <div className="flex flex-col gap-4 text-gray1 font-medium text-center items-center mb-8">
      {lotesData && (
        <ProductsPhases
          data={lotesData.filter((lote) => lote.phase === FilterSelector.Etapa2 && lote)}
          phase={FilterSelector.Etapa2}
        />
      )}
      {lotesData && (
        <ProductsPhases
          data={lotesData.filter((lote) => lote.phase === FilterSelector.Etapa1 && lote)}
          phase={FilterSelector.Etapa1}
        />
      )}
    </div>
  );
}
