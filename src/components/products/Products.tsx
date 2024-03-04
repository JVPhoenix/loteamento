import { useLotesData } from "@/context/LotesDataContext";
import ProductsPhases from "./ProductsPhases";
import { usePhotosData } from "@/context/PhotosDataContext";
import { FilterSelector, LotesStatus } from "@/types";

export default function Products() {
  const lotesData = useLotesData();
  const photosData = usePhotosData();

  return (
    <div className="flex flex-col gap-4 text-gray1 font-medium text-center items-center mb-8">
      {lotesData && (
        <ProductsPhases
          data={lotesData[FilterSelector.Etapa2].filter((lote) => {
            if (lote.status.situation === LotesStatus.Free) {
              return lote;
            }
          })}
          showcase={photosData?.showcase[FilterSelector.Etapa2]}
          phase={FilterSelector.Etapa2}
        />
      )}
      {lotesData && (
        <ProductsPhases
          data={lotesData[FilterSelector.Etapa1].filter((lote) => {
            if (lote.status.situation === LotesStatus.Free) {
              return lote;
            }
          })}
          showcase={photosData?.showcase[FilterSelector.Etapa1]}
          phase={FilterSelector.Etapa1}
        />
      )}
    </div>
  );
}
