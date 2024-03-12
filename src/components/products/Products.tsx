import { useLotesData } from "@/context/LotesDataContext";
import ProductsPhases from "./ProductsPhases";
import { usePhotosData } from "@/context/PhotosDataContext";
import { FilterSelector, LotesStatus } from "@/types";

export default function Products() {
  const lotesData = useLotesData()?.filter((value) => value.status.situation === LotesStatus.Free && value);
  const photosData = usePhotosData();

  return (
    <div className="flex flex-col gap-4 text-gray1 font-medium text-center items-center mb-8">
      {lotesData && (
        <ProductsPhases
          data={lotesData.filter((lote) => lote.phase === FilterSelector.Etapa2 && lote)}
          showcase={photosData?.showcase[FilterSelector.Etapa2]}
          phase={FilterSelector.Etapa2}
        />
      )}
      {lotesData && (
        <ProductsPhases
          data={lotesData.filter((lote) => lote.phase === FilterSelector.Etapa1 && lote)}
          showcase={photosData?.showcase[FilterSelector.Etapa1]}
          phase={FilterSelector.Etapa1}
        />
      )}
    </div>
  );
}
