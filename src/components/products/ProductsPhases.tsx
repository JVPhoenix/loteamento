import { useState } from "react";
import ProductsSelect from "./ProductsSelect";
import ProductsPrices from "./ProductsPrices";
import { LotesDataInterface, PageSelector, FilterSelector } from "@/types";
import ProductsShowcase from "./ProductsShowcase";
import { usePhotosData } from "@/context/PhotosDataContext";

interface ProductsPhaseInterface {
  data: LotesDataInterface[];
  phase: FilterSelector;
}

export default function ProductsPhases(props: ProductsPhaseInterface) {
  const [selectedItem, setSelectedItem] = useState<LotesDataInterface[] | null>(null);

  const PhotosData = usePhotosData()
    ?.filter((filterBy) => filterBy.phase === props.phase && filterBy)
    .filter((filterBy) => filterBy.type === FilterSelector.Showcase && filterBy);

  return (
    <div className="flex flex-col gap-1 text-gray1 font-medium text-center items-center">
      <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">
        LOTES DISPONÍVEIS - {props.phase}ª ETAPA
      </h1>
      {PhotosData && (
        <ProductsShowcase showcasePhotos={PhotosData.sort((a, b) => a.value - b.value)} phase={props.phase} />
      )}

      {props.data && (
        <ProductsSelect
          allOptions={props.data.sort((a, b) => a.value - b.value)}
          selectedItems={selectedItem}
          placeholder="SELECIONE UM LOTE"
          onChange={setSelectedItem}
          page={PageSelector.HomePage}
        />
      )}

      <ProductsPrices selectedItemsData={selectedItem} phase={props.phase} page={PageSelector.HomePage} />

      <p className="mt-3 px-3">
        *Os valores <strong>parcelados</strong> tem reajuste de
        <strong> 5% ao ano do saldo devedor,</strong> a partir do segundo ano.*
      </p>
    </div>
  );
}
