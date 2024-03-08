import { useLotesData } from "@/context/LotesDataContext";
import ProductsPhases from "./ProductsPhases";
import { usePhotosData } from "@/context/PhotosDataContext";
import { FilterSelector, LotesStatus } from "@/types";

export default function Products() {
  const lotesDataRaw = useLotesData();
  const lotesData =
    lotesDataRaw &&
    lotesDataRaw[1].concat(lotesDataRaw[2]).filter((value) => value.status.situation === LotesStatus.Free && value);
  const photosData = usePhotosData();

  return (
    <div className="flex flex-col gap-4 text-gray1 font-medium text-center items-center mb-8">
      {lotesData && (
        <ProductsPhases
          data={lotesData.filter((lote) => {
            if (lote.phase === FilterSelector.Etapa2) {
              return lote;
            }
          })}
          showcase={photosData?.showcase[FilterSelector.Etapa2]}
          phase={FilterSelector.Etapa2}
        />
      )}
      {lotesData && (
        <ProductsPhases
          data={lotesData.filter((lote) => {
            if (lote.phase === FilterSelector.Etapa1) {
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
