import { useState } from "react";
import ProductsSelect from "./ProductsSelect";
import ProductsPrices from "./ProductsPrices";
import { InnerLotesInterface, InnerPhotosInterface } from "@/types";
import ProductsShowcase from "./ProductsShowcase";

interface ProductsPhaseInterface {
  data: InnerLotesInterface[];
  showcase: { [index: number]: InnerPhotosInterface } | undefined;
  phase: number;
}

export default function ProductsPhases(props: ProductsPhaseInterface) {
  const [selectedItem, setSelectedItem] = useState<InnerLotesInterface | null>(null);

  return (
    <div className="flex flex-col gap-1 text-gray1 font-medium text-center items-center">
      <h1 className="text-white drop-shadow-titles text-center text-3xl font-bold">
        LOTES DISPONÍVEIS - {props.phase}ª ETAPA
      </h1>
      {props.showcase && <ProductsShowcase photos={props.showcase} />}

      {props.data && (
        <ProductsSelect
          options={props.data}
          placeholder={"DIGITE OU SELECIONE UM LOTE"}
          selectedItem={selectedItem}
          onChange={(selection: InnerLotesInterface) => setSelectedItem(selection)}
        />
      )}

      <ProductsPrices selectedItem={selectedItem} phase={props.phase} />

      <p className="mt-3 px-3">
        *Os valores <strong>parcelados</strong> tem reajuste de
        <strong> 5% ao ano do saldo devedor,</strong> a partir do segundo ano.*
      </p>
    </div>
  );
}