import { LotesDataInterface, lotesData1 } from "@/data/lotesData";
import { PhotosDataInterface, photosShowcase1 } from "@/data/photosData";
import { useState } from "react";
import ProductsShowcase from "./ProductsShowcase";
import ProductsSelect from "./ProductsSelect";
import ProductsPrices from "./ProductsPrices";

interface ProductsPhaseInterface {
  data: LotesDataInterface[];
  showcase: PhotosDataInterface[];
  phase: number;
}

export default function ProductsPhases(props: ProductsPhaseInterface) {
  const [selectedItem, setSelectedItem] = useState<LotesDataInterface | null>(null);

  return (
    <div className="flex flex-col gap-1 text-gray1 font-medium text-center items-center">
      <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">
        LOTES DISPONÍVEIS - {props.phase}ª ETAPA
      </h1>

      <ProductsShowcase photos={props.showcase} />

      <ProductsSelect
        options={props.data}
        placeholder={"DIGITE OU SELECIONE UM LOTE"}
        selectedItem={selectedItem}
        onChange={(selection: LotesDataInterface) => setSelectedItem(selection)}
      />

      <ProductsPrices selectedItem={selectedItem} phase={props.phase} />

      <p className="mt-3 px-3">
        *Os valores <strong>parcelados</strong> tem reajuste de
        <strong> 5% ao ano do saldo devedor,</strong> a partir do segundo ano.*
      </p>
    </div>
  );
}
