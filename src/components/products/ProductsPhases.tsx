import { useState } from "react";
import ProductsSelect from "./ProductsSelect";
import ProductsPrices from "./ProductsPrices";
import { LotesDataInterface, InnerPhotosInterface, PageSelector } from "@/types";
import ProductsShowcase from "./ProductsShowcase";
import { MultiValue } from "react-select";

interface ProductsPhaseInterface {
  data: LotesDataInterface[];
  showcase: { [index: number]: InnerPhotosInterface } | undefined;
  phase: number;
}

export default function ProductsPhases(props: ProductsPhaseInterface) {
  const [selectedItem, setSelectedItem] = useState<MultiValue<LotesDataInterface> | null>(null);

  return (
    <div className="flex flex-col gap-1 text-gray1 font-medium text-center items-center">
      <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">
        LOTES DISPONÍVEIS - {props.phase}ª ETAPA
      </h1>
      {props.showcase && (
        <ProductsShowcase showcasePhotos={props.showcase} phase={props.phase} data={props.data} />
      )}

      {props.data && (
        <ProductsSelect
          options={props.data}
          placeholder={"DIGITE OU SELECIONE UM LOTE"}
          onChange={(selection: MultiValue<LotesDataInterface> | null) => setSelectedItem(selection)}
          page={PageSelector.HomePage}
        />
      )}

      <ProductsPrices selectedItem={selectedItem} phase={props.phase} page={PageSelector.HomePage} />

      <p className="mt-3 px-3">
        *Os valores <strong>parcelados</strong> tem reajuste de
        <strong> 5% ao ano do saldo devedor,</strong> a partir do segundo ano.*
      </p>
    </div>
  );
}
