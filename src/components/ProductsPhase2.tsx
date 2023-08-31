import { LotesDataInterface, lotesData2 } from "@/data/lotesData";
import { photosShowcase2 } from "@/data/photosData";
import { useState } from "react";
import ProductsShowcase from "./ProductsShowcase";
import ProductsSelect from "./ProductsSelect";
import ProductsPrices from "./ProductsPrices";

export default function ProductsPhase2() {
  const [selectedItem, setSelectedItem] = useState<LotesDataInterface | null>(null);

  return (
    <div className="flex flex-col gap-1 text-gray1 font-medium text-center items-center">
      <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">LOTES DISPONÍVEIS - 2ª ETAPA</h1>

      <ProductsShowcase photos={photosShowcase2} />

      <ProductsSelect
        options={lotesData2}
        placeholder={"DIGITE OU SELECIONE UM LOTE"}
        selectedItem={selectedItem}
        onChange={(selection: LotesDataInterface) => setSelectedItem(selection)}
      />

      <ProductsPrices selectedItem={selectedItem} />

      <p className="mt-3 px-3">
        *Os valores <strong>parcelados</strong> tem reajuste de
        <strong> 5% ao ano do saldo devedor,</strong> a partir do segundo ano.*
      </p>
    </div>
  );
}
