import { LotesDataInterface, lotesData } from "@/data/lotesData1";
import { photosData1 } from "@/data/photosData";
import { useState } from "react";
import ProductsShowcase from "./ProductsShowcase";
import ProductsSelect from "./ProductsSelect";
import ProductsPrices from "./ProductsPrices";

export default function ProductsPhase1() {
  const [selectedItem, setSelectedItem] = useState<LotesDataInterface | null>(null);

  return (
    <div className="flex flex-col gap-1 text-gray1 font-medium text-center items-center">
      {/* <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">LOTES DISPONÍVEIS - 1ª ETAPA</h1> */}

      <ProductsShowcase photos={photosData1} />

      <ProductsSelect
        options={lotesData}
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
